import { AbstractArrayDefinition } from "./AbstractArrayDefinition.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { ElementaryType } from "./ElementaryType.ts";
import type { ExplicitArrayDimension } from "./ExplicitArrayDimension.ts";
import type { Identifier } from "./Identifier.ts";
import { StatementKind } from "./enum/statement_kind.ts";

export class ComputedArrayDefinition extends AbstractArrayDefinition {
  constructor(
    public readonly elementaryType: ElementaryType,
    identifier: Identifier,
    public readonly dimensions: ExplicitArrayDimension[],
    public readonly computedKeywordToken: SyntaxToken,
    semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(
      StatementKind.COMPUTED_ARRAY_DEFINITION,
      computedKeywordToken.location,
      identifier,
      semicolonPunctuatorToken,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.elementaryType;
    yield this.identifier;
    for (const dimension of this.dimensions) {
      yield dimension;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.computedKeywordToken;
    yield* this.elementaryType.getSyntaxTokenIterable();
    yield* this.identifier.getSyntaxTokenIterable();
    for (const dimension of this.dimensions) {
      yield* dimension.getSyntaxTokenIterable();
    }
    yield this.semicolonPunctuatorToken;
  }
}
