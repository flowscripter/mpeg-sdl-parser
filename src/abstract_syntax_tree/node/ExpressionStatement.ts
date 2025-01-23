import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import { StatementKind } from "./enum/statement_kind.ts";

export class ExpressionStatement extends AbstractStatement {
  constructor(
    public readonly expression: AbstractNode,
    public readonly semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(StatementKind.EXPRESSION, expression.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.expression;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield* this.expression.getSyntaxTokenIterable();
    yield this.semicolonPunctuatorToken;
  }
}
