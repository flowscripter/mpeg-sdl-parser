import type Token from "../token/Token.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import type AbstractNode from "./AbstractNode.ts";
import type AbstractStatement from "./AbstractStatement.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type NumberLiteral from "./NumberLiteral.ts";

export default class CaseClause extends AbstractCompositeNode {
  constructor(
    public readonly value: NumberLiteral,
    public readonly statements: AbstractStatement[],
    public readonly caseKeyword: Token,
    public readonly colonPunctuator: Token,
    public readonly openBracePunctuator: Token | undefined,
    public readonly breakKeyword: Token | undefined,
    public readonly semicolonPunctuator: Token | undefined,
    public readonly closeBracePunctuator: Token | undefined,
  ) {
    super(
      NodeKind.CASE_CLAUSE,
      caseKeyword,
      closeBracePunctuator ?? semicolonPunctuator ??
        (statements.length > 0
          ? statements[statements.length - 1]?.endToken
          : colonPunctuator),
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.value;
    for (const statement of this.statements) {
      yield statement;
    }
  }
}
