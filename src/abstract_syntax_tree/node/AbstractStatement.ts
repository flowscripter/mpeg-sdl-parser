import type { Location } from "../../tokenizer/token/Location.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { StatementKind } from "./enum/statement_kind.ts";

export abstract class AbstractStatement extends AbstractCompositeNode {
  constructor(
    public readonly statementKind: StatementKind,
    location: Location,
  ) {
    super(NodeKind.STATEMENT, location);
  }
}
