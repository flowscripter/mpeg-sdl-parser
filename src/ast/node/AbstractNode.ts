import { InternalParseError } from "../../ParseError.ts";
import type { Token } from "../token/Token.ts";
import { NodeKind } from "./enum/node_kind.ts";
import getLogger from "../../util/logger.ts";

const logger = getLogger("NodeFactory");

export abstract class AbstractNode {
  constructor(
    public readonly nodeKind: NodeKind,
    public readonly startToken: Token,
    public readonly endToken: Token,
    public readonly isComposite: boolean,
  ) {
    if (!startToken || !endToken) {
      throw new InternalParseError(
        `Start and end tokens must be provided for AbstractNode: ${
          NodeKind[nodeKind]
        }`,
      );
    }

    logger.debug(
      'created %s starting with "%s" at row: %d, column: %d',
      NodeKind[nodeKind],
      startToken.text,
      startToken.location.row,
      startToken.location.column,
    );
  }

  abstract toString(): string;
}
