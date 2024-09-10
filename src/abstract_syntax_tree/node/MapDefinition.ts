import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

class MapDefinition extends Node {
  // TODO: implement
  //   readonly map_definition ::= (type | identifier) open_parenthesis identifier close_parenthesis identifier semicolon
  // If the outputType is Identifier type, it must refer to the name of a class
  // The outputType must match the outputType of the map specified by mapIdentifier
  // outputType: Identifier | ElementaryTypeKind;
  // The identifier must refer to the name of a map
  // mapIdentifier: Identifier;
  // identifier: Identifier;
  constructor(location: Location, _name: string) {
    super(NodeKind.MAP_DEFINITION, location);
    // this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitMapDefinition(this);
  }
}

export default MapDefinition;
