import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractElementaryTypeDefinition } from "./AbstractElementaryTypeDefinition.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { AlignedModifier } from "./AlignedModifier.ts";
import type { ElementaryType } from "./ElementaryType.ts";
import type { Identifier } from "./Identifier.ts";
import type { LengthAttribute } from "./LengthAttribute.ts";
import { StatementKind } from "./enum/statement_kind.ts";

export class ElementaryTypeDefinition extends AbstractElementaryTypeDefinition {
  constructor(
    public readonly isReserved: boolean,
    public readonly isLegacy: boolean,
    isConst: boolean,
    public readonly alignedModifier: AlignedModifier | undefined,
    elementaryType: ElementaryType,
    public readonly lengthAttribute: LengthAttribute,
    public readonly isLookahead: boolean,
    identifier: Identifier,
    value: AbstractNode | undefined,
    public readonly endValue: AbstractNode | undefined,
    public readonly reservedKeywordToken: SyntaxToken | undefined,
    public readonly legacyKeywordToken: SyntaxToken | undefined,
    constKeywordToken: SyntaxToken | undefined,
    public readonly lookaheadOperatorToken: SyntaxToken | undefined,
    assignmentOperatorToken: SyntaxToken | undefined,
    public readonly rangeOperatorToken: SyntaxToken | undefined,
    semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(
      StatementKind.ELEMENTARY_TYPE_DEFINITION,
      reservedKeywordToken?.location ??
        legacyKeywordToken?.location ??
        constKeywordToken?.location ??
        alignedModifier?.location ??
        elementaryType.location,
      isConst,
      elementaryType,
      identifier,
      value,
      constKeywordToken,
      assignmentOperatorToken,
      semicolonPunctuatorToken,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.alignedModifier) {
      yield this.alignedModifier;
    }

    yield this.elementaryType;
    yield this.lengthAttribute;

    yield this.identifier;

    if (this.value) {
      yield this.value;

      if (this.endValue) {
        yield this.endValue;
      }
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    if (this.isReserved) {
      yield this.reservedKeywordToken!;
    }

    if (this.isLegacy) {
      yield this.legacyKeywordToken!;
    }

    if (this.isConst) {
      yield this.constKeywordToken!;
    }

    if (this.alignedModifier) {
      yield* this.alignedModifier.getSyntaxTokenIterable();
    }

    yield* this.elementaryType.getSyntaxTokenIterable();
    yield* this.lengthAttribute.getSyntaxTokenIterable();
    if (this.lookaheadOperatorToken) {
      yield this.lookaheadOperatorToken;
    }

    yield* this.identifier.getSyntaxTokenIterable();

    if (this.value) {
      yield this.assignmentOperatorToken!;
      yield* this.value.getSyntaxTokenIterable();

      if (this.rangeOperatorToken) {
        yield this.rangeOperatorToken!;
        yield* this.endValue!.getSyntaxTokenIterable();
      }
    }

    yield this.semicolonPunctuatorToken;
  }
}
