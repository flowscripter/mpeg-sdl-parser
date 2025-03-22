import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { AbstractStatement } from "./AbstractStatement.ts";
import { NodeKind } from "./enum/node_kind.ts";

export class IfClause extends AbstractCompositeNode {
  constructor(
    public readonly condition: AbstractNode | undefined,
    public readonly statement: AbstractStatement,
    public readonly ifToken: SyntaxToken | undefined,
    public readonly elseToken: SyntaxToken | undefined,
    public readonly openParenthesisToken: SyntaxToken | undefined,
    public readonly closeParenthesisToken: SyntaxToken | undefined,
  ) {
    super(NodeKind.IF_CLAUSE, elseToken?.location || ifToken!.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.condition) {
      yield this.condition;
    }
    yield this.statement;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    if (this.elseToken) {
      yield this.elseToken;
    }
    if (this.ifToken) {
      yield this.ifToken;
    }
    if (this.openParenthesisToken) {
      yield this.openParenthesisToken;
    }
    if (this.condition) {
      yield* this.condition.getSyntaxTokenIterable();
    }
    if (this.closeParenthesisToken) {
      yield this.closeParenthesisToken;
    }
    yield* this.statement.getSyntaxTokenIterable();
  }
}
