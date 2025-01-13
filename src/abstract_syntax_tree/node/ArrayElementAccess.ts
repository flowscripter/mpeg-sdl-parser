import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractNode from "./AbstractNode.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import AbstractExpression from "./AbstractExpression.ts";
import NodeKind from "./enum/node_kind.ts";

class ArrayElementAccess extends AbstractNode {
  constructor(
    public readonly indexExpression: AbstractExpression,
    public readonly openBracketToken: SyntaxToken,
    public readonly closeBracketToken: SyntaxToken,
  ) {
    super(
      NodeKind.ARRAY_ELEMENT_ACCESS,
      openBracketToken.location,
    );
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitArrayElementAccess(this);
  }
}

export default ArrayElementAccess;
