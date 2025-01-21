import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import type AbstractExpression from "./AbstractExpression.ts";
import type AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import type CompoundStatement from "./CompoundStatement.ts";
import type ComputedElementaryTypeDefinition from "./ComputedElementaryTypeDefinition.ts";
import StatementKind from "./enum/statement_kind.ts";

class ForStatement extends AbstractStatement {
  constructor(
    // either ((assignment_expression semicolon) | computed_elementary_type_definition | semicolon)
    public readonly expression1: AbstractExpression | undefined,
    public readonly computedElementaryDefinition:
      | ComputedElementaryTypeDefinition
      | undefined,
    public readonly expression2: AbstractExpression | undefined,
    public readonly expression3: AbstractExpression | undefined,
    public readonly compoundStatement: CompoundStatement,
    public readonly forKeywordToken: SyntaxToken,
    public readonly openParenthesisToken: SyntaxToken,
    public readonly semicolonToken1: SyntaxToken | undefined,
    public readonly semicolonToken2: SyntaxToken,
    public readonly closeParenthesisToken: SyntaxToken,
  ) {
    super(StatementKind.FOR, forKeywordToken.location);
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
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.forKeywordToken;
    yield this.openParenthesisToken;
    if (this.expression1) {
      yield* this.expression1.getSyntaxTokenIterable();
    }
    if (this.computedElementaryDefinition) {
      yield* this.computedElementaryDefinition.getSyntaxTokenIterable();
    }
    if (this.semicolonToken1) {
      yield this.semicolonToken1;
    }
    if (this.expression2) {
      yield* this.expression2.getSyntaxTokenIterable();
    }
    yield this.semicolonToken2;
    if (this.expression3) {
      yield* this.expression3.getSyntaxTokenIterable();
    }
    yield this.closeParenthesisToken;
    yield* this.compoundStatement.getSyntaxTokenIterable();
  }
}

export default ForStatement;
