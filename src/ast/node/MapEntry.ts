import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { AggregateMapOutputValue } from "./AggregateMapOutputValue.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";

export class MapEntry extends AbstractCompositeNode {
  constructor(
    public readonly inputValue: NumberLiteral,
    public readonly outputValue: AggregateMapOutputValue,
    public readonly commaPunctuatorToken: SyntaxToken,
  ) {
    super(NodeKind.MAP_ENTRY, inputValue.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.inputValue;
    yield this.outputValue;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield* this.inputValue.getSyntaxTokenIterable();
    yield this.commaPunctuatorToken;
    yield* this.outputValue.getSyntaxTokenIterable();
  }
}
