import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractExpression } from "./AbstractExpression.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { ExpressionKind } from "./enum/expression_kind.ts";

export class LengthOfExpression extends AbstractExpression {
  constructor(
    public readonly operand: AbstractNode,
    public readonly lengthOfKeywordToken: SyntaxToken,
    public readonly openParenthesisPunctuatorToken: SyntaxToken,
    public readonly closeParenthesisPunctuatorToken: SyntaxToken,
  ) {
    super(ExpressionKind.LENGTH_OF, lengthOfKeywordToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.operand;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.lengthOfKeywordToken;
    yield this.openParenthesisPunctuatorToken;
    yield* this.operand.getSyntaxTokenIterable();
    yield this.closeParenthesisPunctuatorToken;
  }
}
