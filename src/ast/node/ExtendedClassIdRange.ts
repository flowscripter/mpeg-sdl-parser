import { AbstractClassId } from "./AbstractClassId.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { SingleClassId } from "./SingleClassId.ts";
import type { ClassIdRange } from "./ClassIdRange.ts";
import { ClassIdKind } from "./enum/class_id_kind.ts";

export class ExtendedClassIdRange extends AbstractClassId {
  constructor(
    public readonly classIds: Array<(SingleClassId | ClassIdRange)>,
    public readonly commaPunctuatorTokens: SyntaxToken[],
  ) {
    super(ClassIdKind.EXTENDED_RANGE, classIds[0].location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (let i = 0; i < this.classIds.length; i++) {
      yield this.classIds[i];
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    for (let i = 0; i < this.classIds.length; i++) {
      yield* this.classIds[i].getSyntaxTokenIterable();
      if (i < this.commaPunctuatorTokens.length) {
        yield this.commaPunctuatorTokens[i];
      }
    }
  }
}
