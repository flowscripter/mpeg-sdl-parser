import { AbstractExpression } from "./AbstractExpression.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { BinaryOperatorKind } from "./enum/binary_operator_kind.ts";
import { ExpressionKind } from "./enum/expression_kind.ts";

export class BinaryExpression extends AbstractExpression {
  constructor(
    public readonly leftOperand: AbstractNode,
    public readonly binaryOperatorKind: BinaryOperatorKind,
    public readonly rightOperand: AbstractNode,
    public readonly binaryOperatorToken: SyntaxToken,
  ) {
    super(ExpressionKind.BINARY, leftOperand.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.leftOperand;
    yield this.rightOperand;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield* this.leftOperand.getSyntaxTokenIterable();
    yield this.binaryOperatorToken;
    yield* this.rightOperand.getSyntaxTokenIterable();
  }
}
