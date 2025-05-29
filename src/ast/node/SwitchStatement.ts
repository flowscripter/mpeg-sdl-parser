import type Token from "../token/Token.ts";
import type AbstractExpression from "./AbstractExpression.ts";
import type AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type Identifier from "./Identifier.ts";
import type NumberLiteral from "./NumberLiteral.ts";
import type SwitchCaseClause from "./SwitchCaseClause.ts";
import type SwitchDefaultClause from "./SwitchDefaultClause.ts";

export default class SwitchStatement extends AbstractStatement {
  constructor(
    public readonly expression: AbstractExpression | Identifier | NumberLiteral,
    public readonly switchCaseClauses: SwitchCaseClause[],
    public readonly switchDefaultClause: SwitchDefaultClause | undefined,
    public readonly switchKeyword: Token,
    public readonly openParenthesisPunctuator: Token,
    public readonly closeParenthesisPunctuator: Token,
    public readonly openBracePunctuator: Token,
    public readonly closeBracePunctuator: Token,
  ) {
    super(StatementKind.SWITCH, switchKeyword, closeBracePunctuator);
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
}
