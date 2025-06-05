import type Token from "../token/Token.ts";
import type AbstractClassId from "./AbstractClassId.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import type AbstractNode from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type Identifier from "./Identifier.ts";
import type NumberLiteral from "./NumberLiteral.ts";

export default class BitModifier extends AbstractCompositeNode {
  constructor(
    public readonly length: NumberLiteral,
    public readonly identifier: Identifier | undefined,
    public readonly classId: AbstractClassId,
    public readonly colonPunctuator: Token,
    public readonly bitKeyword: Token,
    public readonly openParenthesisPunctuator: Token,
    public readonly closeParenthesisPunctuator: Token,
    public readonly assignmentOperator: Token | undefined,
  ) {
    super(NodeKind.BIT_MODIFIER, colonPunctuator, classId.endToken);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.length;

    if (this.identifier) {
      yield this.identifier;
    }

    yield this.classId;
  }
}
