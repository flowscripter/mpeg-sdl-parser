import type { Token } from "../token/Token.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { AggregateOutputValue } from "./AggregateOutputValue.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";

export class MapEntry extends AbstractCompositeNode {
  constructor(
    public readonly inputValue: NumberLiteral,
    public readonly outputValue: AggregateOutputValue,
    public readonly commaPunctuator: Token,
  ) {
    super(NodeKind.MAP_ENTRY, inputValue.startToken, outputValue.endToken);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.inputValue;
    yield this.outputValue;
  }
}
