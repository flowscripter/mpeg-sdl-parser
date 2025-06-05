import type Token from "../token/Token.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import type AbstractNode from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type NumberLiteral from "./NumberLiteral.ts";

export default class AlignedModifier extends AbstractCompositeNode {
  constructor(
    public readonly bitCount: number,
    public readonly isDefault8BitCount: boolean,
    public readonly bitCountModifier: NumberLiteral | undefined,
    public readonly alignedKeyword: Token,
    public readonly openParenthesisPunctuator?: Token,
    public readonly closeParenthesisPunctuator?: Token,
  ) {
    super(
      NodeKind.ALIGNED_MODIFIER,
      alignedKeyword,
      closeParenthesisPunctuator ?? alignedKeyword,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (!this.isDefault8BitCount) {
      yield this.bitCountModifier!;
    }
  }
}
