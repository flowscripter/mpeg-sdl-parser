import type Token from "../token/Token.ts";
import type AbstractExpression from "./AbstractExpression.ts";
import type AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import type CompoundStatement from "./CompoundStatement.ts";
import { StatementKind } from "./enum/statement_kind.ts";

export default class WhileStatement extends AbstractStatement {
  constructor(
    public readonly expression: AbstractExpression,
    public readonly compoundStatement: CompoundStatement,
    public readonly whileKeyword: Token,
    public readonly openParenthesisPunctuator: Token,
    public readonly closeParenthesisPunctuator: Token,
  ) {
    super(
      StatementKind.WHILE,
      whileKeyword,
      closeParenthesisPunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.expression;
    yield this.compoundStatement;
  }
}
