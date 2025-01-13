import AbstractNode from "./AbstractNode.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import ElementaryTypeKind from "./enum/elementary_type_kind.ts";

class ElementaryType extends AbstractNode {
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

  public accept(visitor: NodeVisitor) {
    visitor.visitElementaryType(this);
  }
}

export default ElementaryType;
