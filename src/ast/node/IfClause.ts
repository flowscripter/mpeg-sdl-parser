import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { AbstractStatement } from "./AbstractStatement.ts";
import { NodeKind } from "./enum/node_kind.ts";

export class IfClause extends AbstractCompositeNode {
  constructor(
    public readonly condition: AbstractNode | undefined,
    public readonly statement: AbstractStatement,
    public readonly ifKeywordToken: SyntaxToken | undefined,
    public readonly elseKeywordToken: SyntaxToken | undefined,
    public readonly openParenthesisPunctuatorToken: SyntaxToken | undefined,
    public readonly closeParenthesisPunctuatorToken: SyntaxToken | undefined,
  ) {
    super(
      NodeKind.IF_CLAUSE,
      elseKeywordToken?.location || ifKeywordToken!.location,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.condition) {
      yield this.condition;
    }
    yield this.statement;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    if (this.elseKeywordToken) {
      yield this.elseKeywordToken;
    }
    if (this.ifKeywordToken) {
      yield this.ifKeywordToken;
    }
    if (this.openParenthesisPunctuatorToken) {
      yield this.openParenthesisPunctuatorToken;
    }
    if (this.condition) {
      yield* this.condition.getSyntaxTokenIterable();
    }
    if (this.closeParenthesisPunctuatorToken) {
      yield this.closeParenthesisPunctuatorToken;
    }
    yield* this.statement.getSyntaxTokenIterable();
  }
}
