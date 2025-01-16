import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractArrayDimension from "./AbstractArrayDimension.ts";
import AbstractNode from "./AbstractNode.ts";
import ArrayDimensionKind from "./enum/array_dimension_kind.ts";

class ExplicitArrayDimension extends AbstractArrayDimension {
  constructor(
    public readonly size: AbstractNode,
    public readonly openBracketToken: SyntaxToken,
    public readonly closeBracketToken: SyntaxToken,
  ) {
    super(ArrayDimensionKind.EXPLICIT, openBracketToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.size;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openBracketToken;
    yield* this.size.getSyntaxTokenIterable();
    yield this.closeBracketToken;
  }
}

export default ExplicitArrayDimension;
