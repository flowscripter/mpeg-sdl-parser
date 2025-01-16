import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractMapOutputValue from "./AbstractMapOutputValue.ts";
import AbstractNode from "./AbstractNode.ts";
import MapOutputValueKind from "./enum/map_output_value_kind.ts";

class AggregateMapOutputValue extends AbstractMapOutputValue {
  constructor(
    public readonly outputValues: AbstractMapOutputValue[],
    public readonly openBraceToken: SyntaxToken,
    public readonly commaTokens: SyntaxToken[] | undefined,
    public readonly closeBraceToken: SyntaxToken,
  ) {
    super(MapOutputValueKind.AGGREGATE, openBraceToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (let i = 0; i < this.outputValues.length; i++) {
      yield this.outputValues[i];
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openBraceToken;

    for (let i = 0; i < this.outputValues.length; i++) {
      yield* this.outputValues[i].getSyntaxTokenIterable();

      if (i < this.outputValues.length - 1) {
        yield this.commaTokens![i];
      }
    }

    yield this.closeBraceToken;
  }
}

export default AggregateMapOutputValue;
