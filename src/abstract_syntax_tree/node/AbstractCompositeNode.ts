import type { Location } from "../../tokenizer/token/Location.ts";
import { AbstractNode } from "./AbstractNode.ts";
import type { NodeKind } from "./enum/node_kind.ts";

/**
 * Represents an abstract composite node in the abstract syntax tree.
 * This class extends the `AbstractNode` class and provides a base for nodes
 * that can have child nodes.
 *
 * @abstract
 */
export abstract class AbstractCompositeNode extends AbstractNode {
  constructor(
    nodeKind: NodeKind,
    location: Location,
  ) {
    super(nodeKind, location, true);
  }

  abstract getChildNodeIterable(): IterableIterator<AbstractNode>;
}
