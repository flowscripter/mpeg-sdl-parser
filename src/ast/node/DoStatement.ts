import type { AbstractNode } from "./AbstractNode.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import type { CompoundStatement } from "./CompoundStatement.ts";
import { StatementKind } from "./enum/statement_kind.ts";

export class DoStatement extends AbstractStatement {
  constructor(
    public readonly compoundStatement: CompoundStatement,
    public readonly conditionExpression: AbstractNode,
    public readonly doKeywordToken: SyntaxToken,
    public readonly whileKeywordToken: SyntaxToken,
    public readonly openParenthesisPunctuatorToken: SyntaxToken,
    public readonly closeParenthesisPunctuatorToken: SyntaxToken,
    public readonly semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(StatementKind.DO, doKeywordToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.compoundStatement;
    yield this.conditionExpression;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.doKeywordToken;
    yield* this.compoundStatement.getSyntaxTokenIterable();
    yield this.whileKeywordToken;
    yield this.openParenthesisPunctuatorToken;
    yield* this.conditionExpression.getSyntaxTokenIterable();
    yield this.closeParenthesisPunctuatorToken;
    yield this.semicolonPunctuatorToken;
  }
}
