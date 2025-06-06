import type { Token } from "../token/Token.ts";
import { AbstractClassId } from "./AbstractClassId.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { ClassId } from "./ClassId.ts";
import { ClassIdKind } from "./enum/class_id_kind.ts";

export class ClassIdRange extends AbstractClassId {
  constructor(
    public readonly startClassId: ClassId,
    public readonly endClassId: ClassId,
    public readonly rangeOperator: Token,
  ) {
    super(ClassIdKind.RANGE, startClassId.startToken, endClassId.endToken);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.startClassId;
    yield this.endClassId;
  }
}
