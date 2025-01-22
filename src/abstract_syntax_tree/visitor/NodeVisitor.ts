import type AbstractCompositeNode from "../node/AbstractCompositeNode.ts";
import type AbstractNode from "../node/AbstractNode.ts";
import type VisitResult from "./visit_result.ts";

/**
 * Interface representing a visitor for nodes.
 */
interface NodeVisitor {
  /**
   * Called before visiting a composite node.
   * @param node The composite node to visit.
   * @returns The result of the visit operation.
   */
  beforeVisit(node: AbstractCompositeNode): VisitResult;

  /**
   * Called when visiting a node.
   * @param node The node to visit.
   * @returns The result of the visit operation.
   */
  visit(node: AbstractNode): VisitResult;

  /**
   * Called after visiting a composite node.
   * @param node The composite node to visit.
   * @returns The result of the visit operation.
   */
  afterVisit(node: AbstractCompositeNode): VisitResult;
}

export default NodeVisitor;
