import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractClassId from "./AbstractClassId.ts";
import ClassId from "./ClassId.ts";
import ClassIdRange from "./ClassIdRange.ts";

class ExtendedClassIdRange extends AbstractClassId {
  constructor(
    public readonly classIds: Array<(ClassId | ClassIdRange)>,
    public readonly commaTokens: SyntaxToken[],
  ) {
    super(NodeKind.EXTENDED_CLASS_ID_RANGE, classIds[0].location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitExtendedClassIdRange(this);
  }
}

export default ExtendedClassIdRange;
