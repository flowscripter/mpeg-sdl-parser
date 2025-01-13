import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractClassId from "./AbstractClassId.ts";
import NumberLiteral from "./NumberLiteral.ts";

class ClassId extends AbstractClassId {
  constructor(
    public readonly value: NumberLiteral,
  ) {
    super(NodeKind.CLASS_ID_RANGE, value.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitClassId(this);
  }
}

export default ClassId;
