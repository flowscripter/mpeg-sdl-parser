import { AbstractClassId } from "./AbstractClassId.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { ClassId } from "./ClassId.ts";
import type { ClassIdRange } from "./ClassIdRange.ts";
import { ClassIdKind } from "./enum/class_id_kind.ts";
import type { Token } from "../token/Token.ts";

export class ExtendedClassIdRange extends AbstractClassId {
  constructor(
    public readonly classIds: Array<(ClassId | ClassIdRange)>,
    public readonly commaPunctuators: Token[],
  ) {
    super(
      ClassIdKind.EXTENDED_RANGE,
      classIds[0].startToken,
      classIds[classIds.length - 1].endToken,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    for (let i = 0; i < this.classIds.length; i++) {
      yield this.classIds[i];
    }
  }
}
