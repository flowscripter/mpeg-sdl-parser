import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

// export interface ParsableTypeMapOutput extends Node {
//   kind: NodeKind.PARSABLE_TYPE_MAP_OUTPUT;
//   elementaryType: ElementaryTypeKind;
//   width: NumberValue;
// }
//
// export type MapOutputType = NumberValue | ParsableTypeMapOutput | MapOutputType[];

class MapDeclaration extends Node {
  // TODO: implement
  //   readonly output_value ::= number_literal | type length_attribute | aggregate_output_value
  //   readonly aggregate_output_value ::= open_brace (output_value comma)* output_value close_brace
  //   readonly map_entry ::= binary_literal comma aggregate_output_value
  //   readonly map_declaration ::= map identifier open_parenthesis (type | identifier) close_parenthesis open_brace (map_entry comma)+ map_entry close_brace
  // identifier: Identifier;
  // If the outputType is Identifier type, it must refer to the name of a class
  // outputType: Identifier | ElementaryTypeKind;
  // inputValue.numberKind must be BINARY
  // entries: { inputValue: NumberValue, outputValue: MapOutputType };
  constructor(location: Location, _name: string) {
    super(NodeKind.MAP_DECLARATION, location);
    // this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitMapDeclaration(this);
  }
}

export default MapDeclaration;
