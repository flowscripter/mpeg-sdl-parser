import type { AbstractExpression } from "./AbstractExpression.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import type { CompoundStatement } from "./CompoundStatement.ts";
import type { ComputedElementaryTypeDefinition } from "./ComputedElementaryTypeDefinition.ts";
import { StatementKind } from "./enum/statement_kind.ts";

export class ForStatement extends AbstractStatement {
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
    public readonly openParenthesisPunctuatorToken: SyntaxToken,
    public readonly semicolon1PunctuatorToken: SyntaxToken | undefined,
    public readonly semicolon2PunctuatorToken: SyntaxToken,
    public readonly closeParenthesisPunctuatorToken: SyntaxToken,
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
    yield this.compoundStatement;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.forKeywordToken;
    yield this.openParenthesisPunctuatorToken;
    if (this.expression1) {
      yield* this.expression1.getSyntaxTokenIterable();
    }
    if (this.computedElementaryDefinition) {
      yield* this.computedElementaryDefinition.getSyntaxTokenIterable();
    }
    if (this.semicolon1PunctuatorToken) {
      yield this.semicolon1PunctuatorToken;
    }
    if (this.expression2) {
      yield* this.expression2.getSyntaxTokenIterable();
    }
    yield this.semicolon2PunctuatorToken;
    if (this.expression3) {
      yield* this.expression3.getSyntaxTokenIterable();
    }
    yield this.closeParenthesisPunctuatorToken;
    yield* this.compoundStatement.getSyntaxTokenIterable();
  }
}
