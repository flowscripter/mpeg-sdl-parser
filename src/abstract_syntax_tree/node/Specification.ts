import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";

export class Specification extends AbstractCompositeNode {
  constructor(
    public readonly globals: Array<AbstractNode>,
    public readonly eofToken: SyntaxToken,
  ) {
    super(NodeKind.SPECIFICATION, globals[0].location);
    this.globals = globals;
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (const currentGlobal of this.globals) {
      yield currentGlobal;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    for (const currentGlobal of this.globals) {
      yield* currentGlobal.getSyntaxTokenIterable();
    }
    yield this.eofToken;
  }
}
