import type Token from "../token/Token.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import type AbstractExpression from "./AbstractExpression.ts";
import type AbstractNode from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type Identifier from "./Identifier.ts";
import type NumberLiteral from "./NumberLiteral.ts";

export default class ArrayElementAccess extends AbstractCompositeNode {
  constructor(
    public readonly index: AbstractExpression | NumberLiteral | Identifier,
    public readonly openBracketPunctuator: Token,
    public readonly closeBracketPunctuator: Token,
  ) {
    super(
      NodeKind.ARRAY_ELEMENT_ACCESS,
      openBracketPunctuator,
      closeBracketPunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.index;
  }
}
