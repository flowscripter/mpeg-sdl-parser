import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import type AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import type CompoundStatement from "./CompoundStatement.ts";
import StatementKind from "./enum/statement_kind.ts";

class DoStatement extends AbstractStatement {
  constructor(
    public readonly compoundStatement: CompoundStatement,
    public readonly conditionExpression: AbstractNode,
    public readonly doKeywordToken: SyntaxToken,
    public readonly whileKeywordToken: SyntaxToken,
    public readonly openParenthesisToken: SyntaxToken,
    public readonly closeParenthesisToken: SyntaxToken,
    public readonly semicolonToken: SyntaxToken,
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
    yield this.openParenthesisToken;
    yield* this.conditionExpression.getSyntaxTokenIterable();
    yield this.closeParenthesisToken;
    yield this.semicolonToken;
  }
}

export default DoStatement;
