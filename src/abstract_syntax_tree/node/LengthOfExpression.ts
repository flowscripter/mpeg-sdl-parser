import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";
import ValueTarget from "./ValueTarget.ts";

class LengthOfExpression extends Node {
  readonly openParenthesisPunctuatorLocation: Location;
  readonly valueTarget: ValueTarget;
  readonly closeParenthesisPunctuatorLocation: Location;

  constructor(
    location: Location,
    openParenthesisPunctuatorLocation: Location,
    valueTarget: ValueTarget,
    closeParenthesisPunctuatorLocation: Location,
  ) {
    super(NodeKind.LENGTH_OF_EXPRESSION, location);
    this.openParenthesisPunctuatorLocation = openParenthesisPunctuatorLocation;
    this.valueTarget = valueTarget;
    this.closeParenthesisPunctuatorLocation =
      closeParenthesisPunctuatorLocation;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitLengthOfExpression(this);
  }
}

export default LengthOfExpression;
