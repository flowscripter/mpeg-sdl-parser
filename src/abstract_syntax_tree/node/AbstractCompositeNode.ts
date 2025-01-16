import Location from "../../tokenizer/token/Location.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import AbstractNode from "./AbstractNode.ts";
import NodeKind from "./enum/node_kind.ts";

abstract class AbstractCompositeNode extends AbstractNode {
  constructor(
    nodeKind: NodeKind,
    location: Location,
  ) {
    super(nodeKind, location, true);
  }

  override accept(visitor: NodeVisitor): boolean {
    if (!visitor.visitBefore(this)) {
      return false;
    }

    for (const child of this.getChildNodeIterable()) {
      if (!child.accept(visitor)) {
        break;
      }
    }

    return visitor.visitAfter(this);
  }

  abstract getChildNodeIterable(): IterableIterator<AbstractNode>;
}

export default AbstractCompositeNode;
