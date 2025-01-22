import type AbstractNode from "../node/AbstractNode.ts";
import type NodeVisitor from "./NodeVisitor.ts";
import TraversingVisitor from "./TraversingVisitor.ts";

/**
 * Dispatches a node to a visitor for traversal.
 * @param node The node to dispatch.
 * @param operationVisitor The visitor to perform operations on the node.
 */
function dispatch(node: AbstractNode, operationVisitor: NodeVisitor): void {
  const traversingVisitor = new TraversingVisitor(operationVisitor);

  traversingVisitor.visit(node);
}

export default dispatch;
