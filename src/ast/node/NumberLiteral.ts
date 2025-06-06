import type { Token } from "../token/Token.ts";
import { AbstractLeafNode } from "./AbstractLeafNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { NumberLiteralKind } from "./enum/number_literal_kind.ts";

export class NumberLiteral extends AbstractLeafNode {
  constructor(
    public readonly numberLiteralKind: NumberLiteralKind,
    public readonly value: number,
    // defined as an array to support multiple concatenated multiple character literal tokens
    public readonly literals: Token[],
  ) {
    super(NodeKind.NUMBER_LITERAL, literals[0], literals[literals.length - 1]);
    this.numberLiteralKind = numberLiteralKind;
    this.value = value;
  }

  toString(): string {
    return this.value.toString();
  }
}
