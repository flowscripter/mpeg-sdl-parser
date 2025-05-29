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
import ImplicitArrayDimension from "../node/ImplicitArrayDimension";
import type AbstractExpression from "../node/AbstractExpression";
import type NumberLiteral from "../node/NumberLiteral";

export function getImplicitArrayDimension(
  syntaxNode: SyntaxNode,
  text: Text,
): ImplicitArrayDimension {
  assertSyntaxNodeType(syntaxNode, "ImplicitArrayDimension");

  let rangeStart: AbstractExpression | Identifier | NumberLiteral | undefined;
  let rangeEnd: AbstractExpression | Identifier | NumberLiteral | undefined;
  let openBracketPunctuator: Token | undefined;
  let rangeOperator: Token | undefined;
  let closeBracketPunctuator: Token | undefined;

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);
  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.IDENTIFIER:
          if (rangeStart === undefined) {
            rangeStart = childNodeOrToken as Identifier;
          } else {
            rangeEnd = childNodeOrToken as Identifier;
          }
          break;
        case NodeKind.NUMBER_LITERAL:
          if (rangeStart === undefined) {
            rangeStart = childNodeOrToken as NumberLiteral;
          } else {
            rangeEnd = childNodeOrToken as NumberLiteral;
          }
          break;
        case NodeKind.EXPRESSION:
          if (rangeStart === undefined) {
            rangeStart = childNodeOrToken as AbstractExpression;
          } else {
            rangeEnd = childNodeOrToken as AbstractExpression;
          }
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
        case "..":
          rangeOperator = childNodeOrToken;
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

  return new ImplicitArrayDimension(
    rangeStart,
    rangeEnd,
    openBracketPunctuator!,
    rangeOperator,
    closeBracketPunctuator!,
  );
}
