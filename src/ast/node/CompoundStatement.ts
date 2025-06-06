import type { Token } from "../token/Token.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import { StatementKind } from "./enum/statement_kind.ts";

export class CompoundStatement extends AbstractStatement {
  constructor(
    public readonly statements: AbstractStatement[],
    public readonly openBracePunctuator: Token,
    public readonly closeBracePunctuator: Token,
  ) {
    super(
      StatementKind.COMPOUND,
      openBracePunctuator,
      closeBracePunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (const statement of this.statements) {
      yield statement;
    }
  }
}
