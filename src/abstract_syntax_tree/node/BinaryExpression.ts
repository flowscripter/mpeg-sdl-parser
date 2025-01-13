import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import AbstractExpression from "./AbstractExpression.ts";
import BinaryOperatorKind from "./enum/binary_operator_kind.ts";
import NodeKind from "./enum/node_kind.ts";

class BinaryExpression extends AbstractExpression {
  constructor(
    public readonly leftOperand: AbstractExpression,
    public readonly binaryOperatorKind: BinaryOperatorKind,
    public readonly rightOperand: AbstractExpression,
    public readonly binaryOperandToken: SyntaxToken,
  ) {
    super(NodeKind.BINARY_EXPRESSION, leftOperand.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitBinaryExpression(this);
  }
}

export default BinaryExpression;
