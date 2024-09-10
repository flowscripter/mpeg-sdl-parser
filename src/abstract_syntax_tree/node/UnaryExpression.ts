import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";
import PostfixOperatorKind from "./enum/postfix_operator_kind.ts";
import UnaryOperatorKind from "./enum/unary_operator_kind.ts";
import OperatorTarget from "./OperatorTarget.ts";

// TODO: enable below
//     ClassMemberAccessExpression |
//     ArrayElementAccessExpression |
class UnaryExpression extends Node {
  readonly unaryOperatorKind?: UnaryOperatorKind;
  readonly openParenthesisLocation?: Location;
  readonly operatorTarget: OperatorTarget;
  readonly closeParenthesisLocation?: Location;
  readonly postfixOperatorKind?: PostfixOperatorKind;
  readonly postfixOperatorLocation?: Location;

  constructor(
    location: Location,
    unaryOperatorKind: UnaryOperatorKind | undefined,
    openParenthesisLocation: Location | undefined,
    operatorTarget: OperatorTarget,
    closeParenthesisLocation: Location | undefined,
    postfixOperatorKind?: PostfixOperatorKind,
    postfixOperatorLocation?: Location,
  ) {
    super(NodeKind.UNARY_EXPRESSION, location);
    this.unaryOperatorKind = unaryOperatorKind;
    this.openParenthesisLocation = openParenthesisLocation;
    this.operatorTarget = operatorTarget;
    this.closeParenthesisLocation = closeParenthesisLocation;
    this.postfixOperatorKind = postfixOperatorKind;
    this.postfixOperatorLocation = postfixOperatorLocation;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitUnaryExpression(this);
  }
}

export default UnaryExpression;
