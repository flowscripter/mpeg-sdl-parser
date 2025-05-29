import type Token from "../token/Token.ts";
import type AbstractExpression from "./AbstractExpression.ts";
import type AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import type CompoundStatement from "./CompoundStatement.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type Identifier from "./Identifier.ts";
import type NumberLiteral from "./NumberLiteral.ts";

export default class DoStatement extends AbstractStatement {
  constructor(
    public readonly compoundStatement: CompoundStatement,
    public readonly conditionExpression:
      | AbstractExpression
      | Identifier
      | NumberLiteral,
    public readonly doKeyword: Token,
    public readonly whileKeyword: Token,
    public readonly openParenthesisPunctuator: Token,
    public readonly closeParenthesisPunctuator: Token,
    public readonly semicolonPunctuator: Token,
  ) {
    super(StatementKind.DO, doKeyword, semicolonPunctuator);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.compoundStatement;
    yield this.conditionExpression;
  }
}
