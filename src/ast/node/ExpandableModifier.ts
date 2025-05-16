import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";

export class ExpandableModifier extends AbstractCompositeNode {
  constructor(
    public readonly maxClassSize: NumberLiteral | undefined,
    public readonly expandableKeywordToken: SyntaxToken,
    public readonly openParenthesisPunctuatorToken: SyntaxToken | undefined,
    public readonly closeParenthesisPunctuatorToken: SyntaxToken | undefined,
  ) {
    super(NodeKind.EXPANDABLE_MODIFIER, expandableKeywordToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.maxClassSize) {
      yield this.maxClassSize;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.expandableKeywordToken;

    if (this.openParenthesisPunctuatorToken) {
      yield this.openParenthesisPunctuatorToken;
      yield* this.maxClassSize!.getSyntaxTokenIterable();
      yield this.closeParenthesisPunctuatorToken!;
    }
  }
}
