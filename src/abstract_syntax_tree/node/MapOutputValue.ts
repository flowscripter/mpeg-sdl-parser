import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import NumberLiteral from "./NumberLiteral.ts";
import ElementaryType from "./ElementaryType.ts";
import LengthAttribute from "./LengthAttribute.ts";
import AbstractMapOutputValue from "./AbstractMapOutputValue.ts";

class MapOutputValue extends AbstractMapOutputValue {
  constructor(
    public readonly numberLiteralValue: NumberLiteral | undefined,
    public readonly elementaryType: ElementaryType | undefined,
    public readonly lengthAttribute: LengthAttribute | undefined,
  ) {
    super(
      NodeKind.MAP_OUTPUT_VALUE,
      numberLiteralValue?.location ?? elementaryType!.location,
    );
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitMapOutputValue(this);
  }
}

export default MapOutputValue;
