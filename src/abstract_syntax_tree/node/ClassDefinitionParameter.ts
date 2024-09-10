import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

class ClassDefinitionParameter extends Node {
  // TODO: implement
  //      readonly parameter_list_item ::= (identifier | elementary_type) identifier
  //      readonly parameter_list ::= open_parenthesis (parameter_list_item comma)* parameter_list_item close_parenthesis
  //      readonly parameter_values ::= open_parenthesis (expression comma)* expression close_parenthesis
  //   parameterType: Identifier | ElementaryTypeKind;
  //   identifier: Identifier;
  constructor(location: Location, _name: string) {
    super(NodeKind.CLASS_DEFINITION_PARAMETER, location);
    //this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitClassDefinitionParameter(this);
  }
}

export default ClassDefinitionParameter;
