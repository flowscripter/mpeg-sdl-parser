import type { Token } from "../token/Token.ts";
import { AbstractExpression } from "./AbstractExpression.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { ExpressionKind } from "./enum/expression_kind.ts";
import type { Identifier } from "./Identifier.ts";

export class LengthofExpression extends AbstractExpression {
  constructor(
    public readonly operand: AbstractExpression | Identifier,
    public readonly lengthOfKeyword: Token,
    public readonly openParenthesisPunctuator: Token,
    public readonly closeParenthesisPunctuator: Token,
  ) {
    super(
      ExpressionKind.LENGTHOF,
      lengthOfKeyword,
      closeParenthesisPunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.operand;
  }
}
