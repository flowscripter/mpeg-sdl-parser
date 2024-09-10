import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";
import ValueTarget from "./ValueTarget.ts";
import Expression from "./Expression.ts";

class AssignmentExpression extends Node {
  readonly valueTarget: ValueTarget;
  readonly equalOperatorLocation: Location;
  readonly expression: Expression;

  constructor(
    valueTarget: ValueTarget,
    equalOperatorLocation: Location,
    expression: Expression,
  ) {
    super(NodeKind.ASSIGNMENT_EXPRESSION, valueTarget.location);
    this.valueTarget = valueTarget;
    this.equalOperatorLocation = equalOperatorLocation;
    this.expression = expression;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitAssignmentExpression(this);
  }
}

export default AssignmentExpression;
