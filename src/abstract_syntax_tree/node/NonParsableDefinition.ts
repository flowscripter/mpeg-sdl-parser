import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";
import VariableDefinition from "./VariableDefinition.ts";

class NonParsableDefinition extends VariableDefinition {
  // TODO: implement
  //   readonly non_parsable_elementary_type_definition ::= const? type identifier (assignment number_literal)? semicolon
  constructor(location: Location, _name: string, isConst: boolean) {
    super(NodeKind.NON_PARSABLE_DEFINITION, location, isConst);
    // this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitNonParsableDefinition(this);
  }
}

export default NonParsableDefinition;
