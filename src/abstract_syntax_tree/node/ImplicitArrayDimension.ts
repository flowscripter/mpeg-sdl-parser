import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractArrayDimension } from "./AbstractArrayDimension.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { ArrayDimensionKind } from "./enum/array_dimension_kind.ts";

export class ImplicitArrayDimension extends AbstractArrayDimension {
  constructor(
    public readonly rangeStart: AbstractNode | undefined,
    public readonly rangeEnd: AbstractNode | undefined,
    public readonly openBracketToken: SyntaxToken,
    public readonly rangeOperatorToken: SyntaxToken | undefined,
    public readonly closeBracketToken: SyntaxToken,
  ) {
    super(ArrayDimensionKind.IMPLICIT, openBracketToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.rangeStart) {
      yield this.rangeStart;
      yield this.rangeEnd!;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openBracketToken;

    if (this.rangeStart) {
      yield* this.rangeStart.getSyntaxTokenIterable();

      yield this.rangeOperatorToken!;

      yield* this.rangeEnd!.getSyntaxTokenIterable();
    }

    yield this.closeBracketToken;
  }
}
