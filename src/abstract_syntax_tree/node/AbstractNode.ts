import NodeKind from "./enum/node_kind.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import Location from "../../tokenizer/token/Location.ts";
import getLogger from "../../util/logger.ts";

const logger = getLogger("AbstractNode");

abstract class AbstractNode {
  constructor(
    public readonly nodeKind: NodeKind,
    public readonly location: Location,
  ) {
    logger.debug(
      "AbstractNode: %s => row: %d, column: %d, position: %d",
      NodeKind[this.nodeKind],
      location.row,
      location.column,
      location.position,
    );
  }

  abstract accept(visitor: NodeVisitor): void;
}

export default AbstractNode;
