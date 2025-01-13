import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractExpression from "./AbstractExpression.ts";
import AbstractStatement from "./AbstractStatement.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";

class ExpressionStatement extends AbstractStatement {
  constructor(
    public readonly expression: AbstractExpression,
    public readonly semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(NodeKind.EXPRESSION_STATEMENT, expression.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitExpressionStatement(this);
  }
}

export default ExpressionStatement;
