import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { Identifier } from "./Identifier.ts";
import type { ParameterValueList } from "./ParameterValueList.ts";

export class ExtendsModifier extends AbstractCompositeNode {
  constructor(
    public readonly identifier: Identifier,
    public readonly parameterValueList: ParameterValueList | undefined,
    public readonly extendsKeywordToken: SyntaxToken,
  ) {
    super(NodeKind.EXTENDS_MODIFIER, extendsKeywordToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.identifier;
    if (this.parameterValueList) {
      yield this.parameterValueList;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.extendsKeywordToken;
    yield* this.identifier.getSyntaxTokenIterable();
    if (this.parameterValueList) {
      yield* this.parameterValueList.getSyntaxTokenIterable();
    }
  }
}
