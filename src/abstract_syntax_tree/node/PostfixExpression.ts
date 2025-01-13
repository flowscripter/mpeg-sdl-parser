import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import AbstractExpression from "./AbstractExpression.ts";
import ArrayElementAccess from "./ArrayElementAccess.ts";
import ClassMemberAccess from "./ClassMemberAccess.ts";
import NodeKind from "./enum/node_kind.ts";
import PostfixOperatorKind from "./enum/postfix_operator_kind.ts";

class PostfixExpression extends AbstractExpression {
  constructor(
    public readonly operand: AbstractExpression,
    public readonly arrayElementAccess: ArrayElementAccess | undefined,
    public readonly classMemberAccess: ClassMemberAccess | undefined,
    public readonly postfixOperatorKind: PostfixOperatorKind | undefined,
    public readonly postfixOperatorToken: SyntaxToken | undefined,
  ) {
    super(
      NodeKind.POSTFIX_EXPRESSION,
      operand.location,
    );
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitPostfixExpression(this);
  }
}

export default PostfixExpression;
