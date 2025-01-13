import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import NodeVisitor from "../visitor/NodeVisitor.ts";
import AbstractExpression from "./AbstractExpression.ts";
import NodeKind from "./enum/node_kind.ts";
import Identifier from "./Identifier.ts";
import NumberLiteral from "./NumberLiteral.ts";

class PrimaryExpression extends AbstractExpression {
  constructor(
    public readonly operand: Identifier | NumberLiteral | AbstractExpression,
    public readonly openParenthesisToken: SyntaxToken | undefined,
    public readonly closeParenthesisToken: SyntaxToken | undefined,
  ) {
    super(
      NodeKind.PRIMARY_EXPRESSION,
      openParenthesisToken?.location ?? operand.location,
    );
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitPrimaryExpression(this);
  }
}

export default PrimaryExpression;
