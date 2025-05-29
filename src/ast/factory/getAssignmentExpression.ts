import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
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
  syntaxNode: SyntaxNode,
  text: Text,
): BinaryExpression {
  assertSyntaxNodeType(syntaxNode, "AssignmentExpression");

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);

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
        binaryOperatorKind = BinaryOperatorKind.ASSIGNMENT;
      } else {
        throw new InternalParseError(
          `Unexpected token: ${childNodeOrToken.text}`,
        );
      }
    }
  }

  return new BinaryExpression(
    leftOperand!,
    binaryOperatorKind!,
    rightOperand!,
    binaryOperator!,
  );
}
