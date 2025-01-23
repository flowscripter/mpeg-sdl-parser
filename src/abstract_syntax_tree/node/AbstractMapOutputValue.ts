import type { Location } from "../../tokenizer/token/Location.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { MapOutputValueKind } from "./enum/map_output_value_kind.ts";
import { NodeKind } from "./enum/node_kind.ts";

export abstract class AbstractMapOutputValue extends AbstractCompositeNode {
  constructor(
    public readonly mapOutputValueKind: MapOutputValueKind,
    location: Location,
  ) {
    super(NodeKind.MAP_OUTPUT_VALUE, location);
  }
}
