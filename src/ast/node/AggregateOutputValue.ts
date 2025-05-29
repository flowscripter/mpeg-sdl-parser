import type Token from "../token/Token.ts";
import type AbstractNode from "./AbstractNode.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type LengthAttribute from "./LengthAttribute.ts";
import type NumberLiteral from "./NumberLiteral.ts";
import type ElementaryType from "./ElementaryType.ts";

export default class AggregateOutputValue extends AbstractCompositeNode {
  constructor(
    public readonly outputValues: (AggregateOutputValue | NumberLiteral | [
      ElementaryType,
      LengthAttribute,
    ])[],
    public readonly openBracePunctuator: Token,
    public readonly commaPunctuators: Token[] | undefined,
    public readonly closeBracePunctuator: Token,
  ) {
    super(
      NodeKind.AGGREGATE_OUTPUT_VALUE,
      openBracePunctuator,
      closeBracePunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (let i = 0; i < this.outputValues.length; i++) {
      if (this.outputValues[i] instanceof Array) {
        yield (this.outputValues[i] as [ElementaryType, LengthAttribute])[
          0
        ] as ElementaryType;
        yield (this.outputValues[i] as [ElementaryType, LengthAttribute])[
          1
        ] as LengthAttribute;
      } else {
        yield this.outputValues[i] as (AggregateOutputValue | NumberLiteral);
      }
    }
  }
}
