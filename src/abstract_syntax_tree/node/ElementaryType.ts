import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractLeafNode from "./AbstractLeafNode.ts";
import ElementaryTypeKind from "./enum/elementary_type_kind.ts";
import NodeKind from "./enum/node_kind.ts";

class ElementaryType extends AbstractLeafNode {
  constructor(
    public readonly elementaryTypeKind: ElementaryTypeKind,
    public readonly unsignedQualifierToken: SyntaxToken | undefined,
    public readonly typeToken: SyntaxToken,
  ) {
    super(
      NodeKind.ELEMENTARY_TYPE,
      unsignedQualifierToken?.location ?? typeToken.location,
    );
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    if (this.unsignedQualifierToken) {
      yield this.unsignedQualifierToken;
    }
    yield this.typeToken;
  }
}

export default ElementaryType;
