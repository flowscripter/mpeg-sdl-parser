import type { Token } from "../token/Token.ts";
import { AbstractExpression } from "./AbstractExpression.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { ArrayElementAccess } from "./ArrayElementAccess.ts";
import type { ClassMemberAccess } from "./ClassMemberAccess.ts";
import { ExpressionKind } from "./enum/expression_kind.ts";
import { PostfixOperatorKind } from "./enum/postfix_operator_kind.ts";
import { UnaryOperatorKind } from "./enum/unary_operator_kind.ts";
import type { Identifier } from "./Identifier.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";

export class UnaryExpression extends AbstractExpression {
  constructor(
    public readonly unaryOperatorKind: UnaryOperatorKind | undefined,
    public readonly operand:
      | AbstractExpression
      | Identifier
      | NumberLiteral
      | undefined,
    public readonly arrayElementAccess: ArrayElementAccess | undefined,
    public readonly classMemberAccess: ClassMemberAccess | undefined,
    public readonly postfixOperatorKind: PostfixOperatorKind | undefined,
    public readonly unaryOperator: Token | undefined,
    public readonly openParenthesisPunctuator: Token | undefined,
    public readonly closeParenthesisPunctuator: Token | undefined,
    public readonly postfixOperator: Token | undefined,
  ) {
    super(
      ExpressionKind.UNARY,
      unaryOperator ?? openParenthesisPunctuator ?? operand!.startToken,
      postfixOperator ?? classMemberAccess?.endToken ??
        arrayElementAccess?.endToken ?? closeParenthesisPunctuator ??
        operand!.endToken,
    );
  }

  toString(): string {
    if (this.unaryOperatorKind !== undefined) {
      return super.toString() + " " + UnaryOperatorKind[this.unaryOperatorKind];
    } else if (this.postfixOperatorKind !== undefined) {
      return super.toString() + " " +
        PostfixOperatorKind[this.postfixOperatorKind];
    }
    return super.toString();
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.operand!;
    if (this.arrayElementAccess) {
      yield this.arrayElementAccess;
    }
    if (this.classMemberAccess) {
      yield this.classMemberAccess;
    }
  }
}
