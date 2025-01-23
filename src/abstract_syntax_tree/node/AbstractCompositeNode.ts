import type Location from "../../tokenizer/token/Location.ts";
import AbstractNode from "./AbstractNode.ts";
import type NodeKind from "./enum/node_kind.ts";

abstract class AbstractCompositeNode extends AbstractNode {
  constructor(
    nodeKind: NodeKind,
    location: Location,
  ) {
    super(nodeKind, location, true);
  }

  abstract getChildNodeIterable(): IterableIterator<AbstractNode>;
}

export default AbstractCompositeNode;
