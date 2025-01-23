import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import { StatementKind } from "./enum/statement_kind.ts";

export class WhileStatement extends AbstractStatement {
  // TODO: implement
  constructor() {
    super(StatementKind.WHILE, {
      position: 0,
      row: 0,
      column: 0,
    });
  }

  // TODO: implement
  override getChildNodeIterable(): IterableIterator<AbstractNode> {
    throw new Error("Method not implemented.");
  }

  // TODO: implement
  override getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    throw new Error("Method not implemented.");
  }
}
