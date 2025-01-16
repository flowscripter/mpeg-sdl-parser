import Location from "../../tokenizer/token/Location.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import AbstractNode from "./AbstractNode.ts";
import NodeKind from "./enum/node_kind.ts";

abstract class AbstractLeafNode extends AbstractNode {
  constructor(
    nodeKind: NodeKind,
    location: Location,
  ) {
    super(nodeKind, location, false);
  }

  override accept(visitor: NodeVisitor): boolean {
    if (!visitor.visitBefore(this)) {
      return false;
    }

    return visitor.visitAfter(this);
  }
}

export default AbstractLeafNode;
