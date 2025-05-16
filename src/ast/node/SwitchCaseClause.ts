import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { AbstractStatement } from "./AbstractStatement.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";

export class SwitchCaseClause extends AbstractCompositeNode {
  constructor(
    public readonly value: NumberLiteral,
    public readonly statements: AbstractStatement[],
    public readonly caseKeywordToken: SyntaxToken,
    public readonly colonPunctuatorToken: SyntaxToken,
    public readonly openBracePunctuatorToken: SyntaxToken | undefined,
    public readonly breakKeywordToken: SyntaxToken | undefined,
    public readonly semicolonPunctuatorToken: SyntaxToken | undefined,
    public readonly closeBracePunctuatorToken: SyntaxToken | undefined,
  ) {
    super(NodeKind.SWITCH_CASE_CLAUSE, caseKeywordToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.value;
    for (const statement of this.statements) {
      yield statement;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.caseKeywordToken;
    yield* this.value.getSyntaxTokenIterable();
    yield this.colonPunctuatorToken;
    if (this.openBracePunctuatorToken) {
      yield this.openBracePunctuatorToken;
    }
    for (const statement of this.statements) {
      yield* statement.getSyntaxTokenIterable();
    }
    if (this.breakKeywordToken) {
      yield this.breakKeywordToken;
    }
    if (this.semicolonPunctuatorToken) {
      yield this.semicolonPunctuatorToken;
    }
    if (this.closeBracePunctuatorToken) {
      yield this.closeBracePunctuatorToken;
    }
  }
}
