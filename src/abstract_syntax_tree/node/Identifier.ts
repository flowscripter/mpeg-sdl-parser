import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

class Identifier extends Node {
  readonly name: string;

  constructor(location: Location, name: string) {
    super(NodeKind.IDENTIFIER, location);
    this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitIdentifier(this);
  }
}

export default Identifier;
