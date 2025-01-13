import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractClassId from "./AbstractClassId.ts";
import ClassId from "./ClassId.ts";

class ClassIdRange extends AbstractClassId {
  constructor(
    public readonly startClassId: ClassId,
    public readonly endClassId: ClassId,
    public readonly rangeToken: SyntaxToken,
  ) {
    super(NodeKind.CLASS_ID_RANGE, startClassId.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitClassIdRange(this);
  }
}

export default ClassIdRange;
