import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractArrayDimension } from "./AbstractArrayDimension.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { ArrayDimensionKind } from "./enum/array_dimension_kind.ts";

export class PartialArrayDimension extends AbstractArrayDimension {
  constructor(
    public readonly index: AbstractNode,
    public readonly openBracketToken: SyntaxToken,
    public readonly innerOpenBracketToken: SyntaxToken,
    public readonly innerCloseBracketToken: SyntaxToken,
    public readonly closeBracketToken: SyntaxToken,
  ) {
    super(ArrayDimensionKind.PARTIAL, openBracketToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.index;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openBracketToken;
    yield this.innerOpenBracketToken;
    yield* this.index.getSyntaxTokenIterable();
    yield this.innerCloseBracketToken;
    yield this.closeBracketToken;
  }
}
