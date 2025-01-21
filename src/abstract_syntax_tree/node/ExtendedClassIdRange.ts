import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractClassId from "./AbstractClassId.ts";
import type AbstractNode from "./AbstractNode.ts";
import type SingleClassId from "./SingleClassId.ts";
import type ClassIdRange from "./ClassIdRange.ts";
import ClassIdKind from "./enum/class_id_kind.ts";

class ExtendedClassIdRange extends AbstractClassId {
  constructor(
    public readonly classIds: Array<(SingleClassId | ClassIdRange)>,
    public readonly commaTokens: SyntaxToken[],
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
      if (i < this.commaTokens.length) {
        yield this.commaTokens[i];
      }
    }
  }
}

export default ExtendedClassIdRange;
