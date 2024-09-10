import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

class ArrayDimension extends Node {
  // TODO: implement
  //  readonly array_dimension ::= open_bracket expression close_bracket
  //  readonly partial_array_dimension ::= open_bracket open_bracket expression close_bracket close_bracket
  //  readonly arrayDimensionKind: ArrayDimensionKind;
  //
  // // expression is required for ArrayDimensionKind.EXPLICIT,
  // // optional for ArrayDimensionKind.PARTIAL and illegal for ArrayDimensionKind.IMPLICIT
  // expression?: Expression;
  //
  // // rangeStart is optional for ArrayDimensionKind.IMPLICIT and illegal otherwise
  // // if rangeStart is specified, rangeEnd must also be specified
  // rangeStart?: NumberValue;
  //
  // // rangeEnd is optional for ArrayDimensionKind.IMPLICIT and illegal otherwise
  // // if rangeEnd is specified, rangeStart must also be specified
  // rangeEnd?: NumberValue;
  constructor(location: Location, _name: string) {
    super(NodeKind.ARRAY_DIMENSION, location);
    // this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitArrayDimension(this);
  }
}

export default ArrayDimension;
