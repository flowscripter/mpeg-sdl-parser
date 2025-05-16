import type { AbstractClassId } from "./AbstractClassId.ts";
import { AbstractCompositeNode } from "./AbstractCompositeNode.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { NodeKind } from "./enum/node_kind.ts";
import type { Identifier } from "./Identifier.ts";
import type { NumberLiteral } from "./NumberLiteral.ts";

export class BitModifier extends AbstractCompositeNode {
  constructor(
    public readonly length: NumberLiteral,
    public readonly identifier: Identifier | undefined,
    public readonly classId: AbstractClassId,
    public readonly colonPunctuatorToken: SyntaxToken,
    public readonly bitKeywordToken: SyntaxToken,
    public readonly openParenthesisPunctuatorToken: SyntaxToken,
    public readonly closeParenthesisPunctuatorToken: SyntaxToken,
    public readonly assignmentOperatorToken: SyntaxToken | undefined,
  ) {
    super(NodeKind.BIT_MODIFIER, colonPunctuatorToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.length;

    if (this.identifier) {
      yield this.identifier;
    }

    yield this.classId;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.colonPunctuatorToken;
    yield this.bitKeywordToken;
    yield this.openParenthesisPunctuatorToken;
    yield* this.length.getSyntaxTokenIterable();
    yield this.closeParenthesisPunctuatorToken;

    if (this.identifier) {
      yield* this.identifier.getSyntaxTokenIterable();
      yield this.assignmentOperatorToken!;
    }
    yield* this.classId.getSyntaxTokenIterable();
  }
}
