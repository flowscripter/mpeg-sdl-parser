import type { Location } from "../../tokenizer/token/Location.ts";
import { AbstractNode } from "./AbstractNode.ts";
import type { NodeKind } from "./enum/node_kind.ts";

export abstract class AbstractLeafNode extends AbstractNode {
  constructor(
    nodeKind: NodeKind,
    location: Location,
  ) {
    super(nodeKind, location, false);
  }
}
