import type { AbstractNode } from "../node/AbstractNode.ts";

/**
 * Interface representing a visitor for nodes.
 */
export interface NodeVisitor {
  /**
   * Called when visiting a node.
   * @param node The node to visit.
   * @returns The result of the visit operation.
   */
  visit(node: AbstractNode): void;
}
