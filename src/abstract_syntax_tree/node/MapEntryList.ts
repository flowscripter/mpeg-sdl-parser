import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { MapEntry } from "./MapEntry.ts";

export class MapEntryList extends AbstractCompositeNode {
  constructor(
    public readonly mapEntries: MapEntry[],
    public readonly openBraceToken: SyntaxToken,
    public readonly commaTokens: SyntaxToken[] | undefined,
    public readonly closeBraceToken: SyntaxToken,
  ) {
    super(NodeKind.MAP_ENTRY_LIST, openBraceToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (let i = 0; i < this.mapEntries.length; i++) {
      yield this.mapEntries[i];
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openBraceToken;
    for (let i = 0; i < this.mapEntries.length; i++) {
      yield* this.mapEntries[i].getSyntaxTokenIterable();
      if (i < this.commaTokens!.length) {
        yield this.commaTokens![i];
      }
    }
    yield this.closeBraceToken;
  }
}
