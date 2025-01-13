import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import AbstractExpression from "./AbstractExpression.ts";
import NodeKind from "./enum/node_kind.ts";
import UnaryOperatorKind from "./enum/unary_operator_kind.ts";

class UnaryExpression extends AbstractExpression {
  constructor(
    public readonly unaryOperatorKind: UnaryOperatorKind,
    public readonly operand: AbstractExpression,
    public readonly unaryOperatorToken: SyntaxToken,
  ) {
    super(
      NodeKind.UNARY_EXPRESSION,
      unaryOperatorToken.location,
    );
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitUnaryExpression(this);
  }
}

export default UnaryExpression;
