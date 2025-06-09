import { Text } from "@codemirror/state";
import type { TreeCursor } from "@lezer/common";
import { InternalParseError } from "../../ParseError";
import {
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import type { AbstractExpression } from "../node/AbstractExpression";
import { NodeKind } from "../node/enum/node_kind";
import type { Identifier } from "../node/Identifier";
import type { Token } from "../token/Token";
import { LengthAttribute } from "../node/LengthAttribute";
import type { NumberLiteral } from "../node/NumberLiteral";

export function getLengthAttribute(
  cursor: TreeCursor,
  text: Text,
): LengthAttribute {
  const childNodesAndTokens = getChildNodesAndTokens(cursor, text);

  let length: AbstractExpression | Identifier | NumberLiteral | undefined;
  let openParenthesisPunctuator: Token | undefined;
  let closedParenthesisPunctuator: Token | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.NUMBER_LITERAL:
          length = childNodeOrToken as NumberLiteral;
          break;
        case NodeKind.EXPRESSION:
          length = childNodeOrToken as AbstractExpression;
          break;
        case NodeKind.IDENTIFIER:
          length = childNodeOrToken as Identifier;
          break;
        default:
          throw new InternalParseError(
            `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
          );
      }
    } else {
      switch (childNodeOrToken.text) {
        case "(":
          openParenthesisPunctuator = childNodeOrToken;
          break;
        case ")":
          closedParenthesisPunctuator = childNodeOrToken;
          break;
        default:
          throw new InternalParseError(
            `Unexpected token: ${childNodeOrToken.text}`,
          );
      }
    }
  }

  if (length === undefined) {
    throw new InternalParseError("Expected length to be defined");
  }
  if (openParenthesisPunctuator === undefined) {
    throw new InternalParseError(
      "Expected openParenthesisPunctuator to be defined",
    );
  }
  if (closedParenthesisPunctuator === undefined) {
    throw new InternalParseError(
      "Expected closedParenthesisPunctuator to be defined",
    );
  }
  return new LengthAttribute(
    length,
    openParenthesisPunctuator,
    closedParenthesisPunctuator,
  );
}
