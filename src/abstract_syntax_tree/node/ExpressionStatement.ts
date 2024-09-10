import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";
import AssignmentExpression from "./AssignmentExpression.ts";
import Expression from "./Expression.ts";

class ExpressionStatement extends Node {
  readonly expression: Expression | AssignmentExpression;
  readonly semicolonPunctuatorLocation: Location;

  constructor(
    expression: Expression | AssignmentExpression,
    semicolonPunctuatorLocation: Location,
  ) {
    super(NodeKind.EXPRESSION_STATEMENT, expression.location);
    this.expression = expression;
    this.semicolonPunctuatorLocation = semicolonPunctuatorLocation;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitExpressionStatement(this);
  }
}

export default ExpressionStatement;
