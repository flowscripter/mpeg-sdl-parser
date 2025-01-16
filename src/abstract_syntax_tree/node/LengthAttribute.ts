import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import AbstractNode from "./AbstractNode.ts";
import NodeKind from "./enum/node_kind.ts";

class LengthAttribute extends AbstractCompositeNode {
  constructor(
    public readonly length: AbstractNode,
    public readonly openParenthesisToken: SyntaxToken,
    public readonly closeParenthesisToken: SyntaxToken,
  ) {
    super(NodeKind.LENGTH_ATTRIBUTE, openParenthesisToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.length;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openParenthesisToken;
    yield* this.length.getSyntaxTokenIterable();
    yield this.closeParenthesisToken;
  }
}

export default LengthAttribute;
