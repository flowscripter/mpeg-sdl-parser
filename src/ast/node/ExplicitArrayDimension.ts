import type Token from "../token/Token.ts";
import AbstractArrayDimension from "./AbstractArrayDimension.ts";
import type AbstractExpression from "./AbstractExpression.ts";
import type AbstractNode from "./AbstractNode.ts";
import { ArrayDimensionKind } from "./enum/array_dimension_kind.ts";
import type Identifier from "./Identifier.ts";
import type NumberLiteral from "./NumberLiteral.ts";

export default class ExplicitArrayDimension extends AbstractArrayDimension {
  constructor(
    public readonly size: AbstractExpression | Identifier | NumberLiteral,
    openBracketPunctuator: Token,
    closeBracketPunctuator: Token,
  ) {
    super(
      ArrayDimensionKind.EXPLICIT,
      openBracketPunctuator,
      closeBracketPunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.size;
  }
}
