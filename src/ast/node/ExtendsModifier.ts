import type Token from "../token/Token.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import type AbstractNode from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type Identifier from "./Identifier.ts";
import type ParameterValueList from "./ParameterValueList.ts";

export default class ExtendsModifier extends AbstractCompositeNode {
  constructor(
    public readonly identifier: Identifier,
    public readonly parameterValueList: ParameterValueList | undefined,
    public readonly extendsKeyword: Token,
  ) {
    super(
      NodeKind.EXTENDS_MODIFIER,
      extendsKeyword,
      parameterValueList?.endToken ?? identifier.endToken,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.identifier;
    if (this.parameterValueList) {
      yield this.parameterValueList;
    }
  }
}
