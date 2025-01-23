import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";

export class ArrayElementAccess extends AbstractCompositeNode {
  constructor(
    public readonly index: AbstractNode,
    public readonly openBracketToken: SyntaxToken,
    public readonly closeBracketToken: SyntaxToken,
  ) {
    super(
      NodeKind.ARRAY_ELEMENT_ACCESS,
      openBracketToken.location,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.index;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openBracketToken;
    yield* this.index.getSyntaxTokenIterable();
    yield this.closeBracketToken;
  }
}
