import type { Token } from "../token/Token.ts";
import { AbstractLeafNode } from "./AbstractLeafNode.ts";
import { NodeKind } from "./enum/node_kind.ts";

export class Identifier extends AbstractLeafNode {
  constructor(
    public readonly name: string,
    public readonly literal: Token,
  ) {
    super(NodeKind.IDENTIFIER, literal, literal);
  }

  toString(): string {
    return this.name;
  }
}
