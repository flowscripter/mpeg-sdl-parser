import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractNode from "./AbstractNode.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import Identifier from "./Identifier.ts";

class ClassMemberAccess extends AbstractNode {
  constructor(
    public readonly memberIdentifier: Identifier,
    public readonly classMemberAccessOperatorToken: SyntaxToken,
  ) {
    super(
      NodeKind.CLASS_MEMBER_ACCESS,
      classMemberAccessOperatorToken.location,
    );
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitClassMemberAccess(this);
  }
}

export default ClassMemberAccess;
