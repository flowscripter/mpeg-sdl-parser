import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractLeafNode from "./AbstractLeafNode.ts";
import NodeKind from "./enum/node_kind.ts";
import NumberLiteralKind from "./enum/number_literal_kind.ts";

class NumberLiteral extends AbstractLeafNode {
  constructor(
    public readonly numberLiteralKind: NumberLiteralKind,
    public readonly value: number,
    // defined as an array to support multiple concatenated multiple character literal tokens
    public readonly tokens: SyntaxToken[],
  ) {
    super(NodeKind.NUMBER_LITERAL, tokens[0].location);
    this.numberLiteralKind = numberLiteralKind;
    this.value = value;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield* this.tokens;
  }
}

export default NumberLiteral;
