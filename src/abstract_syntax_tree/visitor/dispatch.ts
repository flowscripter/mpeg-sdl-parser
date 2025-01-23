import type AbstractNode from "../node/AbstractNode.ts";
import type NodeHandler from "./NodeHandler.ts";
import TraversingVisitor from "./TraversingVisitor.ts";

/**
 * Dispatches a node to a visitor for traversal.
 * @param node The node to dispatch.
 * @param nodeHandler The handler to perform operations on the node.
 */
function dispatch(node: AbstractNode, nodeHandler: NodeHandler): void {
  const traversingVisitor = new TraversingVisitor(nodeHandler);

  traversingVisitor.visit(node);
}

export default dispatch;
