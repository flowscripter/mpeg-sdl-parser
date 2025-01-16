import Location from "../../tokenizer/token/Location.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import ArrayDimensionKind from "./enum/array_dimension_kind.ts";
import NodeKind from "./enum/node_kind.ts";

abstract class AbstractArrayDimension extends AbstractCompositeNode {
  constructor(
    public readonly arrayDimensionKind: ArrayDimensionKind,
    location: Location,
  ) {
    super(NodeKind.ARRAY_DIMENSION, location);
  }
}

export default AbstractArrayDimension;
