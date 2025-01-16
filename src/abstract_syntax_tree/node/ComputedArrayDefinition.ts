import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractArrayDefinition from "./AbstractArrayDefinition.ts";
import AbstractNode from "./AbstractNode.ts";
import ElementaryType from "./ElementaryType.ts";
import ExplicitArrayDimension from "./ExplicitArrayDimension.ts";
import Identifier from "./Identifier.ts";
import StatementKind from "./enum/statement_kind.ts";

class ComputedArrayDefinition extends AbstractArrayDefinition {
  constructor(
    public readonly elementaryType: ElementaryType,
    identifier: Identifier,
    public readonly dimensions: ExplicitArrayDimension[],
    public readonly computedToken: SyntaxToken,
    semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(
      StatementKind.COMPUTED_ARRAY_DEFINITION,
      computedToken.location,
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
    yield this.computedToken;
    yield* this.elementaryType.getSyntaxTokenIterable();
    yield* this.identifier.getSyntaxTokenIterable();
    for (const dimension of this.dimensions) {
      yield* dimension.getSyntaxTokenIterable();
    }
    yield this.semicolonPunctuatorToken;
  }
}

export default ComputedArrayDefinition;
