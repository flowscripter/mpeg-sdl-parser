import AbstractNode from "../node/AbstractNode.ts";

interface NodeVisitor {
  visitBefore(
    node: AbstractNode,
  ): boolean;
  visitAfter(
    node: AbstractNode,
  ): boolean;
}

export default NodeVisitor;
