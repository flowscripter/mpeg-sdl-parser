import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractMapOutputValue } from "./AbstractMapOutputValue.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { MapOutputValueKind } from "./enum/map_output_value_kind.ts";

export class AggregateMapOutputValue extends AbstractMapOutputValue {
  constructor(
    public readonly outputValues: AbstractMapOutputValue[],
    public readonly openBracePunctuatorToken: SyntaxToken,
    public readonly commaPunctuatorTokens: SyntaxToken[] | undefined,
    public readonly closeBracePunctuatorToken: SyntaxToken,
  ) {
    super(MapOutputValueKind.AGGREGATE, openBracePunctuatorToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (let i = 0; i < this.outputValues.length; i++) {
      yield this.outputValues[i];
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openBracePunctuatorToken;

    for (let i = 0; i < this.outputValues.length; i++) {
      yield* this.outputValues[i].getSyntaxTokenIterable();

      if (this.commaPunctuatorTokens && (i < this.outputValues.length - 1)) {
        yield this.commaPunctuatorTokens[i];
      }
    }

    yield this.closeBracePunctuatorToken;
  }
}
