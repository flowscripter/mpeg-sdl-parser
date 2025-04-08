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
    public readonly openParenthesisPunctuatorToken: SyntaxToken,
    public readonly closeParenthesisPunctuatorToken: SyntaxToken,
    public readonly openBracePunctuatorToken: SyntaxToken,
    public readonly closeBracePunctuatorToken: SyntaxToken,
  ) {
    super(StatementKind.SWITCH, switchKeywordToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.expression;
    for (const clause of this.switchCaseClauses) {
      yield clause;
    }
    if (this.switchDefaultClause) {
      yield this.switchDefaultClause;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.switchKeywordToken;
    yield this.openParenthesisPunctuatorToken;
    yield* this.expression.getSyntaxTokenIterable();
    yield this.closeParenthesisPunctuatorToken;
    yield this.openBracePunctuatorToken;
    for (const clause of this.switchCaseClauses) {
      yield* clause.getSyntaxTokenIterable();
    }
    if (this.switchDefaultClause) {
      yield* this.switchDefaultClause.getSyntaxTokenIterable();
    }
    yield this.closeBracePunctuatorToken;
  }
}
