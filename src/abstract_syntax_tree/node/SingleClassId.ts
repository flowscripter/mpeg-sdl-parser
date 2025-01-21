import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractClassId from "./AbstractClassId.ts";
import type AbstractNode from "./AbstractNode.ts";
import ClassIdKind from "./enum/class_id_kind.ts";
import type NumberLiteral from "./NumberLiteral.ts";

class SingleClassId extends AbstractClassId {
  constructor(
    public readonly value: NumberLiteral,
  ) {
    super(ClassIdKind.SINGLE, value.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.value;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield* this.value.getSyntaxTokenIterable();
  }
}

export default SingleClassId;
