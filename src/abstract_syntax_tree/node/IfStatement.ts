import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type { IfClause } from "./IfClause.ts";

export class IfStatement extends AbstractStatement {
  constructor(
    public readonly clauses: IfClause[],
  ) {
    super(StatementKind.IF, clauses[0].location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (const clause of this.clauses) {
      yield clause;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    for (const clause of this.clauses) {
      yield* clause.getSyntaxTokenIterable();
    }
  }
}
