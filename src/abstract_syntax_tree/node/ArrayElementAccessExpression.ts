import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

// TODO: implement
//  readonly array_element_access_expression ::= identifier (open_bracket expression close_bracket)+

class ArrayElementAccessExpression extends Node {
  constructor(location: Location, _name: string) {
    super(NodeKind.ARRAY_ELEMENT_ACCESS_EXPRESSION, location);
    // this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitArrayElementAccessExpression(this);
  }
}

export default ArrayElementAccessExpression;
