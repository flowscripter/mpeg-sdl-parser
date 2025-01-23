import type AbstractCompositeNode from "../node/AbstractCompositeNode.ts";
import type AbstractLeafNode from "../node/AbstractLeafNode.ts";

/**
 * Interface representing a handler for nodes in an abstract syntax tree.
 * 
 * @interface NodeHandler
 */
interface NodeHandler {
  beforeVisit(node: AbstractCompositeNode): void;

  visit(node: AbstractLeafNode): void;

  afterVisit(node: AbstractCompositeNode): void;
}

export default NodeHandler;
