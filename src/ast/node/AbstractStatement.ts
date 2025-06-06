import type { Token } from "../token/Token.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import { StatementKind } from "./enum/statement_kind.ts";

export abstract class AbstractStatement extends AbstractCompositeNode {
  constructor(
    public readonly statementKind: StatementKind,
    startToken: Token,
    endToken: Token,
  ) {
    super(NodeKind.STATEMENT, startToken, endToken);
  }

  toString(): string {
    return StatementKind[this.statementKind];
  }
}
