import AbstractClassId from "./AbstractClassId.ts";
import type AbstractNode from "./AbstractNode.ts";
import { ClassIdKind } from "./enum/class_id_kind.ts";
import type NumberLiteral from "./NumberLiteral.ts";

export default class ClassId extends AbstractClassId {
  constructor(
    public readonly value: NumberLiteral,
  ) {
    super(ClassIdKind.SINGLE, value.startToken, value.endToken);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.value;
  }
}
