import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import AbstractNode from "./AbstractNode.ts";
import NodeKind from "./enum/node_kind.ts";
import NumberLiteral from "./NumberLiteral.ts";

class AlignedModifier extends AbstractCompositeNode {
  constructor(
    public readonly bitCount: number,
    public readonly isDefault8BitCount: boolean,
    public readonly bitCountModifier: NumberLiteral | undefined,
    public readonly alignedToken: SyntaxToken,
    public readonly openParenthesisToken?: SyntaxToken,
    public readonly closeParenthesisToken?: SyntaxToken,
  ) {
    super(NodeKind.ALIGNED_MODIFIER, alignedToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (!this.isDefault8BitCount) {
      yield this.bitCountModifier!;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.alignedToken;

    if (!this.isDefault8BitCount) {
      yield this.openParenthesisToken!;
      yield* this.bitCountModifier!.getSyntaxTokenIterable();
      yield this.closeParenthesisToken!;
    }
  }
}

export default AlignedModifier;
