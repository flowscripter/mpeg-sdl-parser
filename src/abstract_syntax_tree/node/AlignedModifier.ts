import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";

export class AlignedModifier extends AbstractCompositeNode {
  constructor(
    public readonly bitCount: number,
    public readonly isDefault8BitCount: boolean,
    public readonly bitCountModifier: NumberLiteral | undefined,
    public readonly alignedKeywordToken: SyntaxToken,
    public readonly openParenthesisPunctuatorToken?: SyntaxToken,
    public readonly closeParenthesisPunctuatorToken?: SyntaxToken,
  ) {
    super(NodeKind.ALIGNED_MODIFIER, alignedKeywordToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (!this.isDefault8BitCount) {
      yield this.bitCountModifier!;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.alignedKeywordToken;

    if (!this.isDefault8BitCount) {
      yield this.openParenthesisPunctuatorToken!;
      yield* this.bitCountModifier!.getSyntaxTokenIterable();
      yield this.closeParenthesisPunctuatorToken!;
    }
  }
}
