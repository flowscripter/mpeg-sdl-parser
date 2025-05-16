import { AbstractArrayDimension } from "./AbstractArrayDimension.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { ArrayDimensionKind } from "./enum/array_dimension_kind.ts";

export class ExplicitArrayDimension extends AbstractArrayDimension {
  constructor(
    public readonly size: AbstractNode,
    public readonly openBracketPunctuatorToken: SyntaxToken,
    public readonly closeBracketPunctuatorToken: SyntaxToken,
  ) {
    super(ArrayDimensionKind.EXPLICIT, openBracketPunctuatorToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.size;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openBracketPunctuatorToken;
    yield* this.size.getSyntaxTokenIterable();
    yield this.closeBracketPunctuatorToken;
  }
}
