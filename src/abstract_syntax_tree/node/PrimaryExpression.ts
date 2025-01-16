import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractExpression from "./AbstractExpression.ts";
import AbstractNode from "./AbstractNode.ts";
import ExpressionKind from "./enum/expression_kind.ts";
import Identifier from "./Identifier.ts";
import NumberLiteral from "./NumberLiteral.ts";

class PrimaryExpression extends AbstractExpression {
  constructor(
    public readonly operand: Identifier | NumberLiteral | AbstractNode,
    public readonly openParenthesisToken: SyntaxToken | undefined,
    public readonly closeParenthesisToken: SyntaxToken | undefined,
  ) {
    super(
      ExpressionKind.PRIMARY,
      openParenthesisToken?.location ?? operand.location,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.operand;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    if (this.openParenthesisToken) {
      yield this.openParenthesisToken;
    }
    yield* this.operand.getSyntaxTokenIterable();
    if (this.closeParenthesisToken) {
      yield this.closeParenthesisToken;
    }
  }
}

export default PrimaryExpression;
