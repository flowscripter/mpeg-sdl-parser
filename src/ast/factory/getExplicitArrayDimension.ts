import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import { InternalParseError } from "../../ParseError";
import {
  assertSyntaxNodeType,
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import { NodeKind } from "../node/enum/node_kind";
import type Identifier from "../node/Identifier";
import type Token from "../token/Token";
import type AbstractExpression from "../node/AbstractExpression";
import type NumberLiteral from "../node/NumberLiteral";
import ExplicitArrayDimension from "../node/ExplicitArrayDimension";

export function getExplicitArrayDimension(
  syntaxNode: SyntaxNode,
  text: Text,
): ExplicitArrayDimension {
  assertSyntaxNodeType(syntaxNode, "ExplicitArrayDimension");

  let size: AbstractExpression | Identifier | NumberLiteral | undefined;
  let openBracketPunctuator: Token | undefined;
  let closeBracketPunctuator: Token | undefined;

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);
  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.IDENTIFIER:
          size = childNodeOrToken as Identifier;
          break;
        case NodeKind.NUMBER_LITERAL:
          size = childNodeOrToken as NumberLiteral;
          break;
        case NodeKind.EXPRESSION:
          size = childNodeOrToken as AbstractExpression;
          break;
        default:
          throw new InternalParseError(
            `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
          );
      }
    } else {
      switch (childNodeOrToken.text) {
        case "[":
          openBracketPunctuator = childNodeOrToken;
          break;
        case "]":
          closeBracketPunctuator = childNodeOrToken;
          break;
        default:
          throw new InternalParseError(
            `Unexpected token: ${childNodeOrToken.text}`,
          );
      }
    }
  }

  return new ExplicitArrayDimension(
    size!,
    openBracketPunctuator!,
    closeBracketPunctuator!,
  );
}
