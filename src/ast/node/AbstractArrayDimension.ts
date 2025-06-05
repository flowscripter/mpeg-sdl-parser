import type Token from "../token/Token.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import { ArrayDimensionKind } from "./enum/array_dimension_kind.ts";
import { NodeKind } from "./enum/node_kind.ts";

export default abstract class AbstractArrayDimension
  extends AbstractCompositeNode {
  constructor(
    public readonly arrayDimensionKind: ArrayDimensionKind,
    public readonly openBracketPunctuator: Token,
    public readonly closeBracketPunctuator: Token,
  ) {
    super(
      NodeKind.ARRAY_DIMENSION,
      openBracketPunctuator,
      closeBracketPunctuator,
    );
  }

  toString(): string {
    return ArrayDimensionKind[this.arrayDimensionKind];
  }
}
