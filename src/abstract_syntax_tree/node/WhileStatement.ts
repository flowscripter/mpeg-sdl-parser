import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
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
    public readonly openParenthesisToken: SyntaxToken,
    public readonly closeParenthesisToken: SyntaxToken,
  ) {
    super(StatementKind.WHILE, whileKeywordToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.expression;
    yield this.compoundStatement;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.whileKeywordToken;
    yield this.openParenthesisToken;
    yield* this.expression.getSyntaxTokenIterable();
    yield this.closeParenthesisToken;
    yield* this.compoundStatement.getSyntaxTokenIterable();
  }
}
