import AbstractNode from "./AbstractNode.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import Identifier from "./Identifier.ts";
import ElementaryType from "./ElementaryType.ts";

class Parameter extends AbstractNode {
  constructor(
    public readonly classIdentifier: Identifier | undefined,
    public readonly elementaryType: ElementaryType | undefined,
    public readonly identifier: Identifier,
  ) {
    super(
      NodeKind.PARAMETER,
      classIdentifier?.location ?? elementaryType!.location,
    );
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitParameter(this);
  }
}

export default Parameter;
