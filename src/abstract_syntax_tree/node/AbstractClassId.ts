import Location from "../../tokenizer/token/Location.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import ClassIdKind from "./enum/class_id_kind.ts";
import NodeKind from "./enum/node_kind.ts";

abstract class AbstractClassId extends AbstractCompositeNode {
  constructor(
    public readonly classIdKind: ClassIdKind,
    location: Location,
  ) {
    super(NodeKind.CLASS_ID, location);
  }
}

export default AbstractClassId;
