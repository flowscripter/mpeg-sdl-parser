import type Token from "../token/Token.ts";
import AbstractLeafNode from "./AbstractLeafNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import { StringLiteralKind } from "./enum/string_literal_kind.ts";

export default class StringLiteral extends AbstractLeafNode {
  constructor(
    public readonly stringLiteralKind: StringLiteralKind,
    public readonly value: string,
    // an array supports multiple concatenated string literal tokens
    public readonly literals: Token[],
  ) {
    super(
      NodeKind.STRING_LITERAL,
      literals[0],
      literals[literals.length - 1],
    );
  }

  toString(): string {
    return StringLiteralKind[this.stringLiteralKind];
  }
}
