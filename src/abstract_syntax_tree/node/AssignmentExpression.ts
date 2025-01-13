import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractExpression from "./AbstractExpression.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";

class AssignmentExpression extends AbstractExpression {
  constructor(
    public readonly valueTarget: AbstractExpression,
    public readonly valueSource: AbstractExpression,
    public readonly equalOperatorToken: SyntaxToken,
  ) {
    super(NodeKind.ASSIGNMENT_EXPRESSION, valueTarget.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitAssignmentExpression(this);
  }
}

export default AssignmentExpression;
