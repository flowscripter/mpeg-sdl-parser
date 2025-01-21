import type AbstractNode from "../node/AbstractNode.ts";

/**
 * Interface representing a visitor for nodes in an abstract syntax tree.
 * Implementations of this interface can define actions to be taken before and after visiting a node.
 */
interface NodeVisitor {
  /**
   * Method to be called before visiting a node.
   *
   * @param node - The node to be visited.
   * @returns A boolean indicating whether to continue visiting child nodes.
   */
  visitBefore(node: AbstractNode): boolean;

  /**
   * Method to be called after visiting a node.
   *
   * @param node - The node that was visited.
   * @returns A boolean indicating whether to continue visiting sibling nodes.
   */
  visitAfter(node: AbstractNode): boolean;
}

export default NodeVisitor;
