import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import AbstractNode from "./AbstractNode.ts";
import NodeKind from "./enum/node_kind.ts";
import Parameter from "./Parameter.ts";

class ParameterList extends AbstractCompositeNode {
  constructor(
    public readonly parameters: Parameter[],
    public readonly openParenthesisToken: SyntaxToken,
    public readonly commaTokens: SyntaxToken[] | undefined,
    public readonly closeParenthesisToken: SyntaxToken,
  ) {
    super(NodeKind.PARAMETER_LIST, openParenthesisToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (let i = 0; i < this.parameters.length; i++) {
      yield this.parameters[i];
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openParenthesisToken;
    for (let i = 0; i < this.parameters.length; i++) {
      yield* this.parameters[i].getSyntaxTokenIterable();
      if (i < this.commaTokens!.length) {
        yield this.commaTokens![i];
      }
    }
    yield this.closeParenthesisToken;
  }
}

export default ParameterList;
