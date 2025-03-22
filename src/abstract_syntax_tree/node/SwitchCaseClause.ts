import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { AbstractStatement } from "./AbstractStatement.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";

export class SwitchCaseClause extends AbstractCompositeNode {
  constructor(
    public readonly value: NumberLiteral,
    public readonly statements: AbstractStatement[],
    public readonly caseToken: SyntaxToken,
    public readonly colonToken: SyntaxToken,
    public readonly openBraceToken: SyntaxToken | undefined,
    public readonly breakToken: SyntaxToken,
    public readonly semicolonToken: SyntaxToken,
    public readonly closeBraceToken: SyntaxToken | undefined,
  ) {
    super(NodeKind.SWITCH_CASE_CLAUSE, caseToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.value;
    for (const statement of this.statements) {
      yield statement;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield* this.getSyntaxTokenIterable();
    yield this.caseToken;
    yield* this.value.getSyntaxTokenIterable();
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
