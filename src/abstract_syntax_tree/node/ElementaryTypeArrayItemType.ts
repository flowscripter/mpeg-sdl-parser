import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

class ElementaryTypeArrayItemType extends Node {
  // TODO: implement
  //  readonly typespec ::= (elementary_type length_attribute) | identifier
  //  readonly elementaryType: ElementaryTypeKind;
  //  readonly width: NumberValue;
  constructor(location: Location, _name: string) {
    super(NodeKind.ELEMENTARY_TYPE_ARRAY_ITEM_TYPE, location);
    // this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitElementaryTypeArrayItemType(this);
  }
}
export default ElementaryTypeArrayItemType;
