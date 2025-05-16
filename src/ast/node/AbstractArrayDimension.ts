import type { Location } from "../../Location.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { ArrayDimensionKind } from "./enum/array_dimension_kind.ts";
import { NodeKind } from "./enum/node_kind.ts";

export abstract class AbstractArrayDimension extends AbstractCompositeNode {
  constructor(
    public readonly arrayDimensionKind: ArrayDimensionKind,
    location: Location,
  ) {
    super(NodeKind.ARRAY_DIMENSION, location);
  }
}
