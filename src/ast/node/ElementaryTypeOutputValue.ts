import type AbstractNode from "./AbstractNode.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type LengthAttribute from "./LengthAttribute.ts";
import type ElementaryType from "./ElementaryType.ts";

export default class ElementaryTypeOutputValue extends AbstractCompositeNode {
  constructor(
    public readonly elementaryType: ElementaryType,
    public readonly lengthAttribute: LengthAttribute,
  ) {
    super(
      NodeKind.ELEMENTARY_TYPE_OUTPUT_VALUE,
      elementaryType.startToken,
      lengthAttribute.endToken,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.elementaryType;
    yield this.lengthAttribute;
  }
}
