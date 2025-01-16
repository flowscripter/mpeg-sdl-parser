import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractLeafNode from "./AbstractLeafNode.ts";
import NodeKind from "./enum/node_kind.ts";
import StringLiteralKind from "./enum/string_literal_kind.ts";

class StringLiteral extends AbstractLeafNode {
  constructor(
    public readonly stringLiteralKind: StringLiteralKind,
    public readonly value: string,
    // an array supports multiple concatenated string literal tokens
    public readonly stringLiteralTokens: SyntaxToken[],
  ) {
    super(NodeKind.STRING_LITERAL, stringLiteralTokens[0].location);
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield* this.stringLiteralTokens;
  }
}

export default StringLiteral;
