import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { AbstractStatement } from "./AbstractStatement.ts";
import { NodeKind } from "./enum/node_kind.ts";

export class SwitchDefaultClause extends AbstractCompositeNode {
  constructor(
    public readonly statements: AbstractStatement[],
    public readonly defaultKeywordToken: SyntaxToken,
    public readonly colonPunctuatorToken: SyntaxToken,
    public readonly openBracePunctuatorToken: SyntaxToken | undefined,
    public readonly closeBracePunctuatorToken: SyntaxToken | undefined,
  ) {
    super(NodeKind.SWITCH_DEFAULT_CLAUSE, defaultKeywordToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (const statement of this.statements) {
      yield statement;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.defaultKeywordToken;
    yield this.colonPunctuatorToken;
    if (this.openBracePunctuatorToken) {
      yield this.openBracePunctuatorToken;
    }
    for (const statement of this.statements) {
      yield* statement.getSyntaxTokenIterable();
    }
    if (this.closeBracePunctuatorToken) {
      yield this.closeBracePunctuatorToken;
    }
  }
}
