import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";

export class ParameterValueList extends AbstractCompositeNode {
  constructor(
    public readonly values: AbstractNode[],
    public readonly openParenthesisToken: SyntaxToken,
    public readonly commaTokens: SyntaxToken[] | undefined,
    public readonly closeParenthesisToken: SyntaxToken,
  ) {
    super(
      NodeKind.PARAMETER_VALUE_LIST,
      openParenthesisToken.location,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (let i = 0; i < this.values.length; i++) {
      yield this.values[i];
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openParenthesisToken;
    for (let i = 0; i < this.values.length; i++) {
      yield* this.values[i].getSyntaxTokenIterable();
      if (i < this.commaTokens!.length) {
        yield this.commaTokens![i];
      }
    }
    yield this.closeParenthesisToken;
  }
}
