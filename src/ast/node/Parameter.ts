import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import type AbstractNode from "./AbstractNode.ts";
import type ElementaryType from "./ElementaryType.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type Identifier from "./Identifier.ts";

export default class Parameter extends AbstractCompositeNode {
  constructor(
    public readonly classIdentifier: Identifier | undefined,
    public readonly elementaryType: ElementaryType | undefined,
    public readonly identifier: Identifier,
  ) {
    super(
      NodeKind.PARAMETER,
      classIdentifier?.startToken ?? elementaryType!.startToken,
      identifier.endToken,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.classIdentifier) {
      yield this.classIdentifier;
    } else {
      yield this.elementaryType!;
    }
    yield this.identifier;
  }
}
