import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { MapEntry } from "./MapEntry.ts";

export class MapEntryList extends AbstractCompositeNode {
  constructor(
    public readonly mapEntries: MapEntry[],
    public readonly openBracePunctuatorToken: SyntaxToken,
    public readonly commaPunctuatorTokens: SyntaxToken[] | undefined,
    public readonly closeBracePunctuatorToken: SyntaxToken,
  ) {
    super(NodeKind.MAP_ENTRY_LIST, openBracePunctuatorToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (let i = 0; i < this.mapEntries.length; i++) {
      yield this.mapEntries[i];
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.openBracePunctuatorToken;
    for (let i = 0; i < this.mapEntries.length; i++) {
      yield* this.mapEntries[i].getSyntaxTokenIterable();
      if (
        this.commaPunctuatorTokens && (i < this.commaPunctuatorTokens.length)
      ) {
        yield this.commaPunctuatorTokens[i];
      }
    }
    yield this.closeBracePunctuatorToken;
  }
}
