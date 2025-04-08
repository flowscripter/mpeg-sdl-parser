import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";

export class LengthAttribute extends AbstractCompositeNode {
  constructor(
    public readonly length: AbstractNode,
    public readonly openParenthesisPunctuatorToken: SyntaxToken,
    public readonly closeParenthesisPunctuatorToken: SyntaxToken,
  ) {
    super(NodeKind.LENGTH_ATTRIBUTE, openParenthesisPunctuatorToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.length;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openParenthesisPunctuatorToken;
    yield* this.length.getSyntaxTokenIterable();
    yield this.closeParenthesisPunctuatorToken;
  }
}
