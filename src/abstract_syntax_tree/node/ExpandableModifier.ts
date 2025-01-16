import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import AbstractNode from "./AbstractNode.ts";
import NodeKind from "./enum/node_kind.ts";
import NumberLiteral from "./NumberLiteral.ts";

class ExpandableModifier extends AbstractCompositeNode {
  constructor(
    public readonly maxClassSize: NumberLiteral | undefined,
    public readonly expandableToken: SyntaxToken,
    public readonly openParenthesisToken: SyntaxToken | undefined,
    public readonly closeParenthesisToken: SyntaxToken | undefined,
  ) {
    super(NodeKind.EXPANDABLE_MODIFIER, expandableToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.maxClassSize) {
      yield this.maxClassSize;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.expandableToken;

    if (this.openParenthesisToken) {
      yield this.openParenthesisToken;
      yield* this.maxClassSize!.getSyntaxTokenIterable();
      yield this.closeParenthesisToken!;
    }
  }
}

export default ExpandableModifier;
