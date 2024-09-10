import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

class ArrayDefinition extends Node {
  // If the itemType is Identifier type, it must refer to the name of a class
  // TODO: implement
  //  readonly explicit_array_definition ::= aligned_modifier? typespec identifier (array_dimension | partial_array_dimension)+ semicolon
  //  readonly implicit_array_definition ::= aligned_modifier? typespec identifier open_bracket (positive_integer range_operator positive_integer)? close_bracket semicolon
  //  readonly array_definition ::= explicit_array_definition | implicit_array_definition
  //  readonly itemType: Identifier | ElementaryTypeArrayItemType;
  //  readonly identifier: Identifier;
  //  readonly dimensions: ArrayDimension[];
  constructor(location: Location, _name: string) {
    super(NodeKind.ARRAY_DEFINITION, location);
    // this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitArrayDefinition(this);
  }
}

export default ArrayDefinition;
