import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractExpression from "./AbstractExpression.ts";
import AbstractNode from "./AbstractNode.ts";
import BinaryOperatorKind from "./enum/binary_operator_kind.ts";
import ExpressionKind from "./enum/expression_kind.ts";

class BinaryExpression extends AbstractExpression {
  constructor(
    public readonly leftOperand: AbstractNode,
    public readonly binaryOperatorKind: BinaryOperatorKind,
    public readonly rightOperand: AbstractNode,
    public readonly binaryOperandToken: SyntaxToken,
  ) {
    super(ExpressionKind.BINARY, leftOperand.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.leftOperand;
    yield this.rightOperand;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield* this.leftOperand.getSyntaxTokenIterable();
    yield this.binaryOperandToken;
    yield* this.rightOperand.getSyntaxTokenIterable();
  }
}

export default BinaryExpression;
