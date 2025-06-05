import { Text } from "@codemirror/state";
import type { TreeCursor } from "@lezer/common";
import { InternalParseError } from "../../ParseError";
import {
  assertSyntaxNodeType,
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import type AbstractExpression from "../node/AbstractExpression";
import { NodeKind } from "../node/enum/node_kind";
import type Identifier from "../node/Identifier";
import type Token from "../token/Token";
import type NumberLiteral from "../node/NumberLiteral";
import { BinaryOperatorKind } from "../node/enum/binary_operator_kind";
import BinaryExpression from "../node/BinaryExpression";

export function getAssignmentExpression(
  cursor: TreeCursor,
  text: Text,
): BinaryExpression {
  assertSyntaxNodeType(cursor, "AssignmentExpression");

  const childNodesAndTokens = getChildNodesAndTokens(cursor, text);

  let leftOperand: AbstractExpression | Identifier | NumberLiteral | undefined;
  let binaryOperatorKind: BinaryOperatorKind | undefined;
  let rightOperand: AbstractExpression | Identifier | NumberLiteral | undefined;
  let binaryOperator: Token | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.NUMBER_LITERAL:
          if (leftOperand) {
            rightOperand = childNodeOrToken as NumberLiteral;
          } else {
            leftOperand = childNodeOrToken as NumberLiteral;
          }
          break;
        case NodeKind.EXPRESSION:
          if (leftOperand) {
            rightOperand = childNodeOrToken as AbstractExpression;
          } else {
            leftOperand = childNodeOrToken as AbstractExpression;
          }
          break;
        case NodeKind.IDENTIFIER:
          if (leftOperand) {
            rightOperand = childNodeOrToken as Identifier;
          } else {
            leftOperand = childNodeOrToken as Identifier;
          }
          break;
        default:
          throw new InternalParseError(
            `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
          );
      }
    } else {
      if (childNodeOrToken.text === "=") {
        binaryOperator = childNodeOrToken as Token;
        binaryOperatorKind = BinaryOperatorKind.ASSIGNMENT;
      } else {
        throw new InternalParseError(
          `Unexpected token: ${childNodeOrToken.text}`,
        );
      }
    }
  }
  if (leftOperand === undefined) {
    throw new InternalParseError("Expected argument leftOperand to be defined");
  }
  if (binaryOperatorKind == undefined) {
    throw new InternalParseError(
      "Expected argument binaryOperatorKind to be defined",
    );
  }
  if (rightOperand === undefined) {
    throw new InternalParseError(
      "Expected argument rightOperand to be defined",
    );
  }
  if (binaryOperator === undefined) {
    throw new InternalParseError(
      "Expected argument binaryOperator to be defined",
    );
  }

  return new BinaryExpression(
    leftOperand,
    binaryOperatorKind,
    rightOperand,
    binaryOperator,
  );
}
