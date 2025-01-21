import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import type AbstractNode from "./AbstractNode.ts";
import type ElementaryType from "./ElementaryType.ts";
import NodeKind from "./enum/node_kind.ts";
import type Identifier from "./Identifier.ts";
import type LengthAttribute from "./LengthAttribute.ts";

class ArrayElementType extends AbstractCompositeNode {
  constructor(
    public readonly elementaryType: ElementaryType | undefined,
    public readonly lengthAttribute: LengthAttribute | undefined,
    public readonly classIdentifier: Identifier | undefined,
  ) {
    super(
      NodeKind.ARRAY_ELEMENT_TYPE,
      elementaryType?.location ?? classIdentifier!.location,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.elementaryType) {
      yield this.elementaryType;
      yield this.lengthAttribute!;
    } else {
      yield this.classIdentifier!;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    if (this.elementaryType) {
      yield* this.elementaryType.getSyntaxTokenIterable();
      yield* this.lengthAttribute!.getSyntaxTokenIterable();
    } else {
      yield* this.classIdentifier!.getSyntaxTokenIterable();
    }
  }
}

export default ArrayElementType;
