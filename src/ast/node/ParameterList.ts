import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { Parameter } from "./Parameter.ts";

export class ParameterList extends AbstractCompositeNode {
  constructor(
    public readonly parameters: Parameter[],
    public readonly openParenthesisPunctuatorToken: SyntaxToken,
    public readonly commaPunctuatorTokens: SyntaxToken[] | undefined,
    public readonly closeParenthesisPunctuatorToken: SyntaxToken,
  ) {
    super(NodeKind.PARAMETER_LIST, openParenthesisPunctuatorToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (let i = 0; i < this.parameters.length; i++) {
      yield this.parameters[i];
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openParenthesisPunctuatorToken;
    for (let i = 0; i < this.parameters.length; i++) {
      yield* this.parameters[i].getSyntaxTokenIterable();
      if (
        this.commaPunctuatorTokens && (i < this.commaPunctuatorTokens.length)
      ) {
        yield this.commaPunctuatorTokens[i];
      }
    }
    yield this.closeParenthesisPunctuatorToken;
  }
}
