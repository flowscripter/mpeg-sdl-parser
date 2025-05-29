import type Token from "../token/Token.ts";
import AbstractArrayDefinition from "./AbstractArrayDefinition.ts";
import type AbstractNode from "./AbstractNode.ts";
import type ElementaryType from "./ElementaryType.ts";
import type ExplicitArrayDimension from "./ExplicitArrayDimension.ts";
import type Identifier from "./Identifier.ts";
import { StatementKind } from "./enum/statement_kind.ts";

export default class ComputedArrayDefinition extends AbstractArrayDefinition {
  constructor(
    public readonly elementaryType: ElementaryType,
    identifier: Identifier,
    public readonly dimensions: ExplicitArrayDimension[],
    public readonly computedKeyword: Token,
    semicolonPunctuator: Token,
  ) {
    super(
      StatementKind.COMPUTED_ARRAY_DEFINITION,
      computedKeyword,
      identifier,
      semicolonPunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.elementaryType;
    yield this.identifier;
    for (const dimension of this.dimensions) {
      yield dimension;
    }
  }
}
