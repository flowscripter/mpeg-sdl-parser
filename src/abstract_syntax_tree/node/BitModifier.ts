import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import type AbstractClassId from "./AbstractClassId.ts";
import AbstractCompositeNode from "./AbstractCompositeNode.ts";
import type AbstractNode from "./AbstractNode.ts";
import NodeKind from "./enum/node_kind.ts";
import type Identifier from "./Identifier.ts";
import type NumberLiteral from "./NumberLiteral.ts";

class BitModifier extends AbstractCompositeNode {
  constructor(
    public readonly length: NumberLiteral,
    public readonly identifier: Identifier | undefined,
    public readonly classId: AbstractClassId,
    public readonly colonToken: SyntaxToken,
    public readonly bitKeywordToken: SyntaxToken,
    public readonly openParenthesisToken: SyntaxToken,
    public readonly closeParenthesisToken: SyntaxToken,
    public readonly assignmentToken: SyntaxToken | undefined,
  ) {
    super(NodeKind.BIT_MODIFIER, colonToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.length;

    if (this.identifier) {
      yield this.identifier;
    }

    yield this.classId;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.colonToken;
    yield this.bitKeywordToken;
    yield this.openParenthesisToken;
    yield* this.length.getSyntaxTokenIterable();
    yield this.closeParenthesisToken;

    if (this.identifier) {
      yield* this.identifier.getSyntaxTokenIterable();
      yield this.assignmentToken!;
    }
    yield* this.classId.getSyntaxTokenIterable();
  }
}

export default BitModifier;
