import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractExpression from "./AbstractExpression.ts";
import AbstractNode from "./AbstractNode.ts";
import ExpressionKind from "./enum/expression_kind.ts";
import UnaryOperatorKind from "./enum/unary_operator_kind.ts";

class UnaryExpression extends AbstractExpression {
  constructor(
    public readonly unaryOperatorKind: UnaryOperatorKind,
    public readonly operand: AbstractNode,
    public readonly unaryOperatorToken: SyntaxToken,
  ) {
    super(
      ExpressionKind.UNARY,
      unaryOperatorToken.location,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.operand;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.unaryOperatorToken;
    yield* this.operand.getSyntaxTokenIterable();
  }
}

export default UnaryExpression;
