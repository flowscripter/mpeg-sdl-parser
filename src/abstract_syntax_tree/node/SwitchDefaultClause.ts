import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { AbstractStatement } from "./AbstractStatement.ts";
import { NodeKind } from "./enum/node_kind.ts";

export class SwitchDefaultClause extends AbstractCompositeNode {
  constructor(
    public readonly statements: AbstractStatement[],
    public readonly defaultToken: SyntaxToken,
    public readonly colonToken: SyntaxToken,
    public readonly openBraceToken: SyntaxToken | undefined,
    public readonly closeBraceToken: SyntaxToken | undefined,
  ) {
    super(NodeKind.SWITCH_DEFAULT_CLAUSE, defaultToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (const statement of this.statements) {
      yield statement;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.defaultToken;
    yield this.colonToken;
    if (this.openBraceToken) {
      yield this.openBraceToken;
    }
    for (const statement of this.statements) {
      yield* statement.getSyntaxTokenIterable();
    }
    if (this.closeBraceToken) {
      yield this.closeBraceToken;
    }
  }
}
