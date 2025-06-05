import type Token from "../token/Token.ts";
import AbstractArrayDimension from "./AbstractArrayDimension.ts";
import type AbstractExpression from "./AbstractExpression.ts";
import type AbstractNode from "./AbstractNode.ts";
import { ArrayDimensionKind } from "./enum/array_dimension_kind.ts";
import type Identifier from "./Identifier.ts";
import type NumberLiteral from "./NumberLiteral.ts";

export default class PartialArrayDimension extends AbstractArrayDimension {
  constructor(
    public readonly index: AbstractExpression | Identifier | NumberLiteral,
    openBracketPunctuator: Token,
    public readonly innerOpenBracketPunctuator: Token,
    public readonly innerCloseBracketPunctuator: Token,
    closeBracketPunctuator: Token,
  ) {
    super(
      ArrayDimensionKind.PARTIAL,
      openBracketPunctuator,
      closeBracketPunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.index;
  }
}
