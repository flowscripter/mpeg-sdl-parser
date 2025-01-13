import Location from "../../tokenizer/token/Location.ts";
import AbstractNode from "./AbstractNode.ts";
import NodeKind from "./enum/node_kind.ts";

abstract class AbstractClassId extends AbstractNode {
  constructor(nodeKind: NodeKind, location: Location) {
    super(nodeKind, location);
  }
}

export default AbstractClassId;
