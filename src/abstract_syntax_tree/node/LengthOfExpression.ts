import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractExpression from "./AbstractExpression.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";

class LengthOfExpression extends AbstractExpression {
  constructor(
    public readonly expression: AbstractExpression,
    public readonly lengthOfToken: SyntaxToken,
    public readonly openParenthesisPunctuatorToken: SyntaxToken,
    public readonly closeParenthesisPunctuatorToken: SyntaxToken,
  ) {
    super(NodeKind.LENGTH_OF_EXPRESSION, lengthOfToken.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitLengthOfExpression(this);
  }
}

export default LengthOfExpression;
