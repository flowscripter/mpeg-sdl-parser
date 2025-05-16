import { AbstractArrayDimension } from "./AbstractArrayDimension.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { ArrayDimensionKind } from "./enum/array_dimension_kind.ts";

export class PartialArrayDimension extends AbstractArrayDimension {
  constructor(
    public readonly index: AbstractNode,
    public readonly openBracketPunctuatorToken: SyntaxToken,
    public readonly innerOpenBracketPunctuatorToken: SyntaxToken,
    public readonly innerCloseBracketPunctuatorToken: SyntaxToken,
    public readonly closeBracketPunctuatorToken: SyntaxToken,
  ) {
    super(ArrayDimensionKind.PARTIAL, openBracketPunctuatorToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.index;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openBracketPunctuatorToken;
    yield this.innerOpenBracketPunctuatorToken;
    yield* this.index.getSyntaxTokenIterable();
    yield this.innerCloseBracketPunctuatorToken;
    yield this.closeBracketPunctuatorToken;
  }
}
