import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type { SwitchCaseClause } from "./SwitchCaseClause.ts";
import type { SwitchDefaultClause } from "./SwitchDefaultClause.ts";

export class SwitchStatement extends AbstractStatement {
  constructor(
    public readonly expression: AbstractNode,
    public readonly switchCaseClauses: SwitchCaseClause[],
    public readonly switchDefaultClause: SwitchDefaultClause | undefined,
    public readonly switchKeywordToken: SyntaxToken,
    public readonly openParenthesisToken: SyntaxToken,
    public readonly closeParenthesisToken: SyntaxToken,
    public readonly openBraceToken: SyntaxToken,
    public readonly closeBraceToken: SyntaxToken,
  ) {
    super(StatementKind.SWITCH, switchKeywordToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.expression;
    for (const clause of this.switchCaseClauses) {
      yield clause.value;
      for (const statement of clause.statements) {
        yield statement;
      }
    }
    if (this.switchDefaultClause) {
      for (const statement of this.switchDefaultClause.statements) {
        yield statement;
      }
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.switchKeywordToken;
    yield this.openParenthesisToken;
    yield* this.expression.getSyntaxTokenIterable();
    yield this.closeParenthesisToken;
    yield this.openBraceToken;
    for (const clause of this.switchCaseClauses) {
      yield clause.caseToken;
      yield* clause.value.getSyntaxTokenIterable();
      yield clause.colonToken;
      if (clause.openBraceToken) {
        yield clause.openBraceToken;
      }
      for (const statement of clause.statements) {
        yield* statement.getSyntaxTokenIterable();
      }
      if (clause.closeBraceToken) {
        yield clause.closeBraceToken;
      }
    }
    if (this.switchDefaultClause) {
      yield this.switchDefaultClause.defaultToken;
      yield this.switchDefaultClause.colonToken;
      if (this.switchDefaultClause.openBraceToken) {
        yield this.switchDefaultClause.openBraceToken;
      }
      for (const statement of this.switchDefaultClause.statements) {
        yield* statement.getSyntaxTokenIterable();
      }
      if (this.switchDefaultClause.closeBraceToken) {
        yield this.switchDefaultClause.closeBraceToken;
      }
    }
    yield this.closeBraceToken;
  }
}
