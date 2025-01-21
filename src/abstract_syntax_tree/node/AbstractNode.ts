import type Location from "../../tokenizer/token/Location.ts";
import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import getLogger from "../../util/logger.ts";
import type NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";

const logger = getLogger("AbstractNode");

abstract class AbstractNode {
  constructor(
    public readonly nodeKind: NodeKind,
    public readonly location: Location,
    public readonly isComposite: boolean,
  ) {
    logger.debug(
      "AbstractNode: %s => row: %d, column: %d, position: %d",
      NodeKind[this.nodeKind],
      location.row,
      location.column,
      location.position,
    );
  }

  abstract accept(visitor: NodeVisitor): boolean;

  abstract getSyntaxTokenIterable(): IterableIterator<SyntaxToken>;
}

export default AbstractNode;
