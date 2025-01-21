import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import type AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import StatementKind from "./enum/statement_kind.ts";
import type IfClause from "./IfClause.ts";

class IfStatement extends AbstractStatement {
  constructor(
    public readonly clauses: IfClause[],
  ) {
    super(StatementKind.IF, clauses[0].ifToken!.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (const clause of this.clauses) {
      if (clause.condition) {
        yield clause.condition;
      }
      yield clause.statement;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    for (const clause of this.clauses) {
      if (clause.ifToken) {
        yield clause.ifToken;
      }
      if (clause.elseToken) {
        yield clause.elseToken;
      }
      if (clause.openParenthesisToken) {
        yield clause.openParenthesisToken;
      }
      if (clause.condition) {
        yield* clause.condition.getSyntaxTokenIterable();
      }
      if (clause.closeParenthesisToken) {
        yield clause.closeParenthesisToken;
      }
      yield* clause.statement.getSyntaxTokenIterable();
    }
  }
}

export default IfStatement;
