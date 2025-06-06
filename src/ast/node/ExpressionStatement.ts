import type { Token } from "../token/Token.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";
import type { AbstractExpression } from "./AbstractExpression.ts";
import type { Identifier } from "./Identifier.ts";

export class ExpressionStatement extends AbstractStatement {
  constructor(
    public readonly expression: AbstractExpression | Identifier | NumberLiteral,
    public readonly semicolonPunctuator: Token,
  ) {
    super(
      StatementKind.EXPRESSION,
      expression.startToken,
      semicolonPunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.expression;
  }
}
