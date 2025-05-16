import { AbstractExpression } from "./AbstractExpression.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { ArrayElementAccess } from "./ArrayElementAccess.ts";
import type { ClassMemberAccess } from "./ClassMemberAccess.ts";
import { ExpressionKind } from "./enum/expression_kind.ts";
import type { PostfixOperatorKind } from "./enum/postfix_operator_kind.ts";

export class PostfixExpression extends AbstractExpression {
  constructor(
    public readonly operand: AbstractNode,
    public readonly arrayElementAccess: ArrayElementAccess | undefined,
    public readonly classMemberAccess: ClassMemberAccess | undefined,
    public readonly postfixOperatorKind: PostfixOperatorKind | undefined,
    public readonly postfixOperatorToken: SyntaxToken | undefined,
  ) {
    super(
      ExpressionKind.POSTFIX,
      operand.location,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.operand;
    if (this.arrayElementAccess) {
      yield this.arrayElementAccess;
    } else if (this.classMemberAccess) {
      yield this.classMemberAccess;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield* this.operand.getSyntaxTokenIterable();
    if (this.arrayElementAccess) {
      yield* this.arrayElementAccess.getSyntaxTokenIterable();
    } else if (this.classMemberAccess) {
      yield* this.classMemberAccess.getSyntaxTokenIterable();
    } else if (this.postfixOperatorToken) {
      yield this.postfixOperatorToken;
    }
  }
}
