import { AbstractLeafNode } from "./AbstractLeafNode.ts";
import type { ElementaryTypeKind } from "./enum/elementary_type_kind.ts";
import { NodeKind } from "./enum/node_kind.ts";

export class ElementaryType extends AbstractLeafNode {
  constructor(
    public readonly elementaryTypeKind: ElementaryTypeKind,
    public readonly unsignedQualifierKeywordToken: SyntaxToken | undefined,
    public readonly typeToken: SyntaxToken,
  ) {
    super(
      NodeKind.ELEMENTARY_TYPE,
      unsignedQualifierKeywordToken?.location ?? typeToken.location,
    );
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    if (this.unsignedQualifierKeywordToken) {
      yield this.unsignedQualifierKeywordToken;
    }
    yield this.typeToken;
  }
}
