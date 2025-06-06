import type { Token } from "../token/Token.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { AbstractStatement } from "./AbstractStatement.ts";
import { NodeKind } from "./enum/node_kind.ts";

export class DefaultClause extends AbstractCompositeNode {
  constructor(
    public readonly statements: AbstractStatement[],
    public readonly defaultKeyword: Token,
    public readonly colonPunctuator: Token,
    public readonly openBracePunctuator: Token | undefined,
    public readonly closeBracePunctuator: Token | undefined,
  ) {
    super(
      NodeKind.DEFAULT_CLAUSE,
      defaultKeyword,
      closeBracePunctuator ?? colonPunctuator ??
        statements[statements.length - 1]?.endToken,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (const statement of this.statements) {
      yield statement;
    }
  }
}
