import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import type AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import StatementKind from "./enum/statement_kind.ts";

class CompoundStatement extends AbstractStatement {
  constructor(
    public readonly statements: AbstractStatement[],
    public readonly openBracePunctuatorToken: SyntaxToken,
    public readonly closeBracePunctuatorToken: SyntaxToken,
  ) {
    super(StatementKind.COMPOUND, openBracePunctuatorToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (const statement of this.statements) {
      yield statement;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openBracePunctuatorToken;
    for (const statement of this.statements) {
      yield* statement.getSyntaxTokenIterable();
    }
    yield this.closeBracePunctuatorToken;
  }
}

export default CompoundStatement;
