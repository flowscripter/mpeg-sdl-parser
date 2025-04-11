import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";

export class ParameterValueList extends AbstractCompositeNode {
  constructor(
    public readonly values: AbstractNode[],
    public readonly openParenthesisPunctuatorToken: SyntaxToken,
    public readonly commaPunctuatorTokens: SyntaxToken[] | undefined,
    public readonly closeParenthesisPunctuatorToken: SyntaxToken,
  ) {
    super(
      NodeKind.PARAMETER_VALUE_LIST,
      openParenthesisPunctuatorToken.location,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (let i = 0; i < this.values.length; i++) {
      yield this.values[i];
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openParenthesisPunctuatorToken;
    for (let i = 0; i < this.values.length; i++) {
      yield* this.values[i].getSyntaxTokenIterable();
      if (
        this.commaPunctuatorTokens && (i < this.commaPunctuatorTokens.length)
      ) {
        yield this.commaPunctuatorTokens[i];
      }
    }
    yield this.closeParenthesisPunctuatorToken;
  }
}
