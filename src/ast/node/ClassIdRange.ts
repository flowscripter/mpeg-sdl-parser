import type Token from "../token/Token.ts";
import AbstractClassId from "./AbstractClassId.ts";
import type AbstractNode from "./AbstractNode.ts";
import type SingleClassId from "./SingleClassId.ts";
import { ClassIdKind } from "./enum/class_id_kind.ts";

export default class ClassIdRange extends AbstractClassId {
  constructor(
    public readonly startClassId: SingleClassId,
    public readonly endClassId: SingleClassId,
    public readonly rangeOperator: Token,
  ) {
    super(ClassIdKind.RANGE, startClassId.startToken, endClassId.endToken);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.startClassId;
    yield this.endClassId;
  }
}
