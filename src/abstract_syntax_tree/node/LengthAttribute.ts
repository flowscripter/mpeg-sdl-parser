import AbstractNode from "./AbstractNode.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractExpression from "./AbstractExpression.ts";

class LengthAttribute extends AbstractNode {
  constructor(
    public readonly lengthExpression: AbstractExpression,
    public readonly openParenthesisToken: SyntaxToken,
    public readonly closeParenthesisToken: SyntaxToken,
  ) {
    super(NodeKind.LENGTH_ATTRIBUTE, openParenthesisToken.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitLengthAttribute(this);
  }
}

export default LengthAttribute;
