import type Token from "../token/Token.ts";
import AbstractExpression from "./AbstractExpression.ts";
import type AbstractNode from "./AbstractNode.ts";
import { BinaryOperatorKind } from "./enum/binary_operator_kind.ts";
import { ExpressionKind } from "./enum/expression_kind.ts";
import type Identifier from "./Identifier.ts";
import type NumberLiteral from "./NumberLiteral.ts";

export default class BinaryExpression extends AbstractExpression {
  constructor(
    public readonly leftOperand:
      | AbstractExpression
      | Identifier
      | NumberLiteral,
    public readonly binaryOperatorKind: BinaryOperatorKind,
    public readonly rightOperand:
      | AbstractExpression
      | Identifier
      | NumberLiteral,
    public readonly binaryOperator: Token,
  ) {
    super(ExpressionKind.BINARY, leftOperand.startToken, rightOperand.endToken);
  }

  toString(): string {
    return super.toString() + " " + BinaryOperatorKind[this.binaryOperatorKind];
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.leftOperand;
    yield this.rightOperand;
  }
}
