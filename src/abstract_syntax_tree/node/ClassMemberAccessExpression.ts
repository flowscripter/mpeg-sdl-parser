import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

class ClassMemberAccessExpression extends Node {
  // TODO: implement
  //   readonly class_member_access_expression ::= identifier (class_member_access identifier)+
  //   readonly identifiers: Identifier[];
  constructor(location: Location) {
    super(NodeKind.CLASS_MEMBER_ACCESS_EXPRESSION, location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitClassMemberAccessExpression(this);
  }
}

export default ClassMemberAccessExpression;
