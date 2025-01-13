import AbstractNode from "./AbstractNode.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import ElementaryType from "./ElementaryType.ts";
import NodeKind from "./enum/node_kind.ts";
import Identifier from "./Identifier.ts";
import LengthAttribute from "./LengthAttribute.ts";

class ArrayElementType extends AbstractNode {
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

  public accept(visitor: NodeVisitor) {
    visitor.visitArrayElementType(this);
  }
}

export default ArrayElementType;
