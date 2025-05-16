import { AbstractArrayDimension } from "./AbstractArrayDimension.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { ArrayDimensionKind } from "./enum/array_dimension_kind.ts";

export class ImplicitArrayDimension extends AbstractArrayDimension {
  constructor(
    public readonly rangeStart: AbstractNode | undefined,
    public readonly rangeEnd: AbstractNode | undefined,
    public readonly openBracketPunctuatorToken: SyntaxToken,
    public readonly rangeOperatorToken: SyntaxToken | undefined,
    public readonly closeBracketPunctuatorToken: SyntaxToken,
  ) {
    super(ArrayDimensionKind.IMPLICIT, openBracketPunctuatorToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.rangeStart) {
      yield this.rangeStart;
      yield this.rangeEnd!;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openBracketPunctuatorToken;

    if (this.rangeStart) {
      yield* this.rangeStart.getSyntaxTokenIterable();

      yield this.rangeOperatorToken!;

      yield* this.rangeEnd!.getSyntaxTokenIterable();
    }

    yield this.closeBracketPunctuatorToken;
  }
}
