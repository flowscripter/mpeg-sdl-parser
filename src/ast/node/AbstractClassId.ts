import type { Location } from "../../Location.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { ClassIdKind } from "./enum/class_id_kind.ts";
import { NodeKind } from "./enum/node_kind.ts";

export abstract class AbstractClassId extends AbstractCompositeNode {
  constructor(
    public readonly classIdKind: ClassIdKind,
    location: Location,
  ) {
    super(NodeKind.CLASS_ID, location);
  }
}
