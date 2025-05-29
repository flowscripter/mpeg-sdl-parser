import type Token from "../token/Token.ts";
import AbstractNode from "./AbstractNode.ts";
import type { NodeKind } from "./enum/node_kind.ts";

/**
 * Represents an abstract composite node in the abstract syntax tree.
 * This class extends the `AbstractNode` class and provides a base for nodes
 * that can have child nodes.
 */
export default abstract class AbstractCompositeNode extends AbstractNode {
  constructor(
    nodeKind: NodeKind,
    startToken: Token,
    endToken: Token,
  ) {
    super(nodeKind, startToken, endToken, true);
  }

  toString(): string {
    return "";
  }

  abstract getChildNodeIterable(): IterableIterator<AbstractNode>;
}
