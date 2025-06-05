import type Token from "../token/Token.ts";
import type AbstractExpression from "./AbstractExpression.ts";
import type AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import type CompoundStatement from "./CompoundStatement.ts";
import type ComputedElementaryTypeDefinition from "./ComputedElementaryTypeDefinition.ts";
import { StatementKind } from "./enum/statement_kind.ts";

export default class ForStatement extends AbstractStatement {
  constructor(
    // either ((assignment_expression semicolon) | computed_elementary_type_definition | semicolon)
    public readonly expression1: AbstractExpression | undefined,
    public readonly computedElementaryDefinition:
      | ComputedElementaryTypeDefinition
      | undefined,
    public readonly expression2: AbstractExpression | undefined,
    public readonly expression3: AbstractExpression | undefined,
    public readonly compoundStatement: CompoundStatement,
    public readonly forKeyword: Token,
    public readonly openParenthesisPunctuator: Token,
    // optional as the first semicolon can be considered part of the optional computedElementaryDefinition
    public readonly semicolon1Punctuator: Token | undefined,
    public readonly semicolon2Punctuator: Token,
    public readonly closeParenthesisPunctuator: Token,
  ) {
    super(StatementKind.FOR, forKeyword, compoundStatement.endToken);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.expression1) {
      yield this.expression1;
    }
    if (this.computedElementaryDefinition) {
      yield this.computedElementaryDefinition;
    }
    if (this.expression2) {
      yield this.expression2;
    }
    if (this.expression3) {
      yield this.expression3;
    }
    yield this.compoundStatement;
  }
}
