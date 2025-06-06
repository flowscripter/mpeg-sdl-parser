import type { Token } from "../token/Token.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";

export class ExpandableModifier extends AbstractCompositeNode {
  constructor(
    public readonly maxClassSize: NumberLiteral | undefined,
    public readonly expandableKeyword: Token,
    public readonly openParenthesisPunctuator: Token | undefined,
    public readonly closeParenthesisPunctuator: Token | undefined,
  ) {
    super(
      NodeKind.EXPANDABLE_MODIFIER,
      expandableKeyword,
      closeParenthesisPunctuator ?? expandableKeyword,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.maxClassSize) {
      yield this.maxClassSize;
    }
  }
}
