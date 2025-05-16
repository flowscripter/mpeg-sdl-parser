import type { Location } from "../../Location.ts";
import getLogger from "../../util/logger.ts";
import { NodeKind } from "./enum/node_kind.ts";

const logger = getLogger("AbstractNode");

export abstract class AbstractNode {
  constructor(
    public readonly nodeKind: NodeKind,
    public readonly location: Location,
    public readonly isComposite: boolean,
  ) {
    logger.debug(
      "AbstractNode: %s => row: %d, column: %d, start: %d, end: %d",
      NodeKind[this.nodeKind],
      location.row,
      location.column,
      location.start,
      location.end,
    );
  }
}
