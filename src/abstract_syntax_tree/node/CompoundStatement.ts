import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractNode from "./AbstractNode.ts";
import {
  default as AbstractStatement,
  default as Statement,
} from "./AbstractStatement.ts";
import StatementKind from "./enum/statement_kind.ts";

class CompoundStatement extends AbstractStatement {
  constructor(
    public readonly statements: Statement[],
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
