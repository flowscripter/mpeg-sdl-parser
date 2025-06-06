import type { Token } from "../token/Token.ts";
import type { AbstractExpression } from "./AbstractExpression.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type { Identifier } from "./Identifier.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";

export class IfStatement extends AbstractStatement {
  constructor(
    public readonly condition: AbstractExpression | Identifier | NumberLiteral,
    public readonly ifStatement: AbstractStatement,
    public readonly elseStatement: AbstractStatement | undefined,
    public readonly ifKeyword: Token,
    public readonly openParenthesisPunctuator: Token,
    public readonly closeParenthesisPunctuator: Token,
    public readonly elseKeyword: Token | undefined,
  ) {
    super(
      StatementKind.IF,
      ifStatement.startToken,
      elseStatement?.endToken ?? ifStatement.endToken,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.condition;
    yield this.ifStatement;
    if (this.elseStatement) {
      yield this.elseStatement;
    }
  }
}
