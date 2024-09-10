import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";
import VariableDefinition from "./VariableDefinition.ts";

class ParsableDefinition extends VariableDefinition {
  // TODO: implement
  //   readonly aligned_modifier ::= aligned (open_bracket ('8' | '16' | '32' | '64' | '128') close_bracket)?
  //   readonly type ::= int | unsigned int | float | bit | double
  //   readonly length_attribute ::= open_parenthesis expression close_parenthesis
  //   readonly elementary_type_definition ::= const? aligned_modifier? type length_attribute '*'? identifier (assignment number_literal (range_operator number_literal)?)? semicolon
  //   readonly alignment?: number;
  //   readonly width: Expression | NumberValue;
  //   readonly isLookahead: boolean;
  //   readonly endValue?: NumberValue;
  constructor(location: Location, _name: string, isConst: boolean) {
    super(NodeKind.PARSABLE_DEFINITION, location, isConst);
    // this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitParsableDefinition(this);
  }
}

export default ParsableDefinition;
