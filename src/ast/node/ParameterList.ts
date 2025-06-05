import type Token from "../token/Token.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import type AbstractNode from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type Parameter from "./Parameter.ts";

export default class ParameterList extends AbstractCompositeNode {
  constructor(
    public readonly parameters: Parameter[],
    public readonly openParenthesisPunctuator: Token,
    public readonly commaPunctuators: Token[] | undefined,
    public readonly closeParenthesisPunctuator: Token,
  ) {
    super(
      NodeKind.PARAMETER_LIST,
      openParenthesisPunctuator,
      closeParenthesisPunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (let i = 0; i < this.parameters.length; i++) {
      yield this.parameters[i];
    }
  }
}
