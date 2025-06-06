import type { Token } from "../token/Token.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractExpression } from "./AbstractExpression.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { Identifier } from "./Identifier.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";

export class LengthAttribute extends AbstractCompositeNode {
  constructor(
    public readonly length: NumberLiteral | Identifier | AbstractExpression,
    public readonly openParenthesisPunctuator: Token,
    public readonly closeParenthesisPunctuator: Token,
  ) {
    super(
      NodeKind.LENGTH_ATTRIBUTE,
      openParenthesisPunctuator,
      closeParenthesisPunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.length;
  }
}
