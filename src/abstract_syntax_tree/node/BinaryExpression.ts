import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";
import BinaryOperatorKind from "./enum/binary_operator_kind.ts";
import Expression from "./Expression.ts";

class BinaryExpression extends Node {
  readonly leftOperand: Expression;
  readonly binaryOperatorKind: BinaryOperatorKind;
  readonly binaryOperatorLocation: Location;
  readonly rightOperand: Expression;

  constructor(
    leftOperand: Expression,
    binaryOperatorKind: BinaryOperatorKind,
    binaryOperatorLocation: Location,
    rightOperand: Expression,
  ) {
    super(NodeKind.BINARY_EXPRESSION, leftOperand.location);
    this.leftOperand = leftOperand;
    this.binaryOperatorKind = binaryOperatorKind;
    this.binaryOperatorLocation = binaryOperatorLocation;
    this.rightOperand = rightOperand;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitBinaryExpression(this);
  }
}

export default BinaryExpression;
