import type { AbstractExpression } from "./AbstractExpression.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import type { CompoundStatement } from "./CompoundStatement.ts";
import { StatementKind } from "./enum/statement_kind.ts";

export class WhileStatement extends AbstractStatement {
  constructor(
    public readonly expression: AbstractExpression,
    public readonly compoundStatement: CompoundStatement,
    public readonly whileKeywordToken: SyntaxToken,
    public readonly openParenthesisPunctuatorToken: SyntaxToken,
    public readonly closeParenthesisPunctuatorToken: SyntaxToken,
  ) {
    super(StatementKind.WHILE, whileKeywordToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.expression;
    yield this.compoundStatement;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.whileKeywordToken;
    yield this.openParenthesisPunctuatorToken;
    yield* this.expression.getSyntaxTokenIterable();
    yield this.closeParenthesisPunctuatorToken;
    yield* this.compoundStatement.getSyntaxTokenIterable();
  }
}
