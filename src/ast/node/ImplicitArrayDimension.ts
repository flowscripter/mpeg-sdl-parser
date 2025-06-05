import type Token from "../token/Token.ts";
import AbstractArrayDimension from "./AbstractArrayDimension.ts";
import type AbstractExpression from "./AbstractExpression.ts";
import type AbstractNode from "./AbstractNode.ts";
import { ArrayDimensionKind } from "./enum/array_dimension_kind.ts";
import type Identifier from "./Identifier.ts";
import type NumberLiteral from "./NumberLiteral.ts";

export default class ImplicitArrayDimension extends AbstractArrayDimension {
  constructor(
    public readonly rangeStart:
      | AbstractExpression
      | Identifier
      | NumberLiteral
      | undefined,
    public readonly rangeEnd:
      | AbstractExpression
      | Identifier
      | NumberLiteral
      | undefined,
    openBracketPunctuator: Token,
    public readonly rangeOperator: Token | undefined,
    closeBracketPunctuator: Token,
  ) {
    super(
      ArrayDimensionKind.IMPLICIT,
      openBracketPunctuator,
      closeBracketPunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.rangeStart) {
      yield this.rangeStart;
      yield this.rangeEnd!;
    }
  }
}
