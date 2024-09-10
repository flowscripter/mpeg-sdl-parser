import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

class ClassDefinitionBitAttribute extends Node {
  // TODO: implement
  //  readonly bit_modifier ::= (colon bit open_parenthesis positive_integer_value close_parenthesis (identifier assignment)? object_id | id_range (comma (object_id | id_range))*)?
  //   length: number;
  //   identifier?: Identifier;
  //   classIdSpecifications: ClassIdSpecification[];
  constructor(location: Location, _name: string) {
    super(NodeKind.CLASS_DEFINITION_BIT_ATTRIBUTE, location);
    // this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitClassDefinitionBitAttribute(this);
  }
}

export default ClassDefinitionBitAttribute;
