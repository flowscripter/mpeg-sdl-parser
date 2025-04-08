import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractClassId } from "./AbstractClassId.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { SingleClassId } from "./SingleClassId.ts";
import { ClassIdKind } from "./enum/class_id_kind.ts";

export class ClassIdRange extends AbstractClassId {
  constructor(
    public readonly startClassId: SingleClassId,
    public readonly endClassId: SingleClassId,
    public readonly rangeOperatorToken: SyntaxToken,
  ) {
    super(ClassIdKind.RANGE, startClassId.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.startClassId;
    yield this.endClassId;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield* this.startClassId.getSyntaxTokenIterable();
    yield this.rangeOperatorToken;
    yield* this.endClassId.getSyntaxTokenIterable();
  }
}
