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
import type { NumberLiteral } from "../node/NumberLiteral";
import { UnaryExpression } from "../node/UnaryExpression";
import { UnaryOperatorKind } from "../node/enum/unary_operator_kind";
import { PostfixOperatorKind } from "../node/enum/postfix_operator_kind";
import { ArrayElementAccess } from "../node/ArrayElementAccess";
import type { ClassMemberAccess } from "../node/ClassMemberAccess";

export function getUnaryExpression(
  cursor: TreeCursor,
  text: Text,
): AbstractExpression | Identifier | NumberLiteral {
  const childNodesAndTokens = getChildNodesAndTokens(cursor, text);

  let unaryOperatorKind: UnaryOperatorKind | undefined;
  let operand: AbstractExpression | Identifier | NumberLiteral | undefined;
  let arrayElementAccess: ArrayElementAccess | undefined;
  let classMemberAccess: ClassMemberAccess | undefined;
  let postfixOperatorKind: PostfixOperatorKind | undefined;
  let unaryOperator: Token | undefined;
  let openParenthesisPunctuator: Token | undefined;
  let closeParenthesisPunctuator: Token | undefined;
  let postfixOperator: Token | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.NUMBER_LITERAL:
          operand = childNodeOrToken as NumberLiteral;
          break;
        case NodeKind.EXPRESSION:
          operand = childNodeOrToken as AbstractExpression;
          break;
        case NodeKind.IDENTIFIER:
          operand = childNodeOrToken as Identifier;
          break;
        case NodeKind.ARRAY_ELEMENT_ACCESS:
          arrayElementAccess = childNodeOrToken as ArrayElementAccess;
          break;
        case NodeKind.CLASS_MEMBER_ACCESS:
          classMemberAccess = childNodeOrToken as ClassMemberAccess;
          break;
        default:
          throw new InternalParseError(
            `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
          );
      }
    } else {
      switch (childNodeOrToken.text) {
        case "+":
          unaryOperator = childNodeOrToken;
          unaryOperatorKind = UnaryOperatorKind.UNARY_PLUS;
          break;
        case "-":
          unaryOperator = childNodeOrToken;
          unaryOperatorKind = UnaryOperatorKind.UNARY_NEGATION;
          break;
        case "(":
          openParenthesisPunctuator = childNodeOrToken;
          break;
        case ")":
          closeParenthesisPunctuator = childNodeOrToken;
          break;
        case "++":
          postfixOperator = childNodeOrToken;
          postfixOperatorKind = PostfixOperatorKind.POSTFIX_INCREMENT;
          break;
        case "--":
          postfixOperator = childNodeOrToken;
          postfixOperatorKind = PostfixOperatorKind.POSTFIX_DECREMENT;
          break;
        default:
          throw new InternalParseError(
            `Unexpected token: ${childNodeOrToken.text}`,
          );
      }
    }
  }

  if (
    !unaryOperator && !openParenthesisPunctuator && !postfixOperator &&
    !arrayElementAccess && !classMemberAccess
  ) {
    if (!operand) {
      throw new InternalParseError("Expected argument operand to be defined");
    }
    return operand;
  }

  if (!operand) {
    throw new InternalParseError("Expected argument operand to be defined");
  }

  return new UnaryExpression(
    unaryOperatorKind,
    operand,
    arrayElementAccess,
    classMemberAccess,
    postfixOperatorKind,
    unaryOperator,
    openParenthesisPunctuator,
    closeParenthesisPunctuator,
    postfixOperator,
  );
}
