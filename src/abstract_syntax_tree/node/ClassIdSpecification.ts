import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

class ClassIdSpecification extends Node {
  // TODO: implement
  //  readonly object_id ::= 0 | positive_integer
  //  readonly id_range ::= object_id range_operator object_id
  //   id: number;
  //   idRangeEnd?: number;
  constructor(location: Location, _name: string) {
    super(NodeKind.CLASS_ID_SPECIFICATION, location);
    //this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitClassIdSpecification(this);
  }
}

export default ClassIdSpecification;
