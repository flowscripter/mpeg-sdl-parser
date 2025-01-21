import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import type AbstractNode from "./AbstractNode.ts";
import type ElementaryType from "./ElementaryType.ts";
import NodeKind from "./enum/node_kind.ts";
import type Identifier from "./Identifier.ts";

class Parameter extends AbstractCompositeNode {
  constructor(
    public readonly classIdentifier: Identifier | undefined,
    public readonly elementaryType: ElementaryType | undefined,
    public readonly identifier: Identifier,
  ) {
    super(
      NodeKind.PARAMETER,
      classIdentifier?.location ?? elementaryType!.location,
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

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    if (this.classIdentifier) {
      yield* this.classIdentifier.getSyntaxTokenIterable();
    } else {
      yield* this.elementaryType!.getSyntaxTokenIterable();
    }
    yield* this.identifier.getSyntaxTokenIterable();
  }
}

export default Parameter;
