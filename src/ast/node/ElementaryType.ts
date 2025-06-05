import type Token from "../token/Token.ts";
import AbstractLeafNode from "./AbstractLeafNode.ts";
import { ElementaryTypeKind } from "./enum/elementary_type_kind.ts";
import { NodeKind } from "./enum/node_kind.ts";

export default class ElementaryType extends AbstractLeafNode {
  constructor(
    public readonly elementaryTypeKind: ElementaryTypeKind,
    public readonly unsignedQualifierKeyword: Token | undefined,
    public readonly typeKeyword: Token,
  ) {
    super(
      NodeKind.ELEMENTARY_TYPE,
      unsignedQualifierKeyword ?? typeKeyword,
      typeKeyword,
    );
  }

  toString(): string {
    return ElementaryTypeKind[this.elementaryTypeKind];
  }
}
