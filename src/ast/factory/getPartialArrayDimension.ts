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
import PartialArrayDimension from "../node/PartialArrayDimension";

export function getPartialArrayDimension(
  syntaxNode: SyntaxNode,
  text: Text,
): PartialArrayDimension {
  assertSyntaxNodeType(syntaxNode, "PartialArrayDimension");

  let index: AbstractExpression | Identifier | NumberLiteral | undefined;
  let openBracketPunctuator: Token | undefined;
  let innerOpenBracketPunctuator: Token | undefined;
  let innerCloseBracketPunctuator: Token | undefined;
  let closeBracketPunctuator: Token | undefined;

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);
  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.IDENTIFIER:
          index = childNodeOrToken as Identifier;
          break;
        case NodeKind.NUMBER_LITERAL:
          index = childNodeOrToken as NumberLiteral;
          break;
        case NodeKind.EXPRESSION:
          index = childNodeOrToken as AbstractExpression;
          break;
        default:
          throw new InternalParseError(
            `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
          );
      }
    } else {
      switch (childNodeOrToken.text) {
        case "[":
          if (openBracketPunctuator === undefined) {
            openBracketPunctuator = childNodeOrToken;
          } else {
            innerOpenBracketPunctuator = childNodeOrToken;
          }
          break;
        case "]":
          if (closeBracketPunctuator === undefined) {
            closeBracketPunctuator = childNodeOrToken;
          } else {
            innerCloseBracketPunctuator = childNodeOrToken;
          }
          break;
        default:
          throw new InternalParseError(
            `Unexpected token: ${childNodeOrToken.text}`,
          );
      }
    }
  }

  return new PartialArrayDimension(
    index!,
    openBracketPunctuator!,
    innerOpenBracketPunctuator!,
    innerCloseBracketPunctuator!,
    closeBracketPunctuator!,
  );
}
