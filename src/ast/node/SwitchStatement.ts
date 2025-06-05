import type Token from "../token/Token.ts";
import type AbstractExpression from "./AbstractExpression.ts";
import type AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type Identifier from "./Identifier.ts";
import type NumberLiteral from "./NumberLiteral.ts";
import type CaseClause from "./CaseClause.ts";
import type DefaultClause from "./DefaultClause.ts";

export default class SwitchStatement extends AbstractStatement {
  constructor(
    public readonly expression: AbstractExpression | Identifier | NumberLiteral,
    public readonly caseClauses: CaseClause[],
    public readonly defaultClause: DefaultClause | undefined,
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
    for (const clause of this.caseClauses) {
      yield clause;
    }
    if (this.defaultClause) {
      yield this.defaultClause;
    }
  }
}
