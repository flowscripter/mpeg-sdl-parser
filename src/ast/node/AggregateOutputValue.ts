import type { Token } from "../token/Token.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";
import type { ElementaryTypeOutputValue } from "./ElementaryTypeOutputValue.ts";

export class AggregateOutputValue extends AbstractCompositeNode {
  constructor(
    public readonly outputValues:
      (AggregateOutputValue | ElementaryTypeOutputValue | NumberLiteral)[],
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
    yield* this.outputValues;
  }
}
