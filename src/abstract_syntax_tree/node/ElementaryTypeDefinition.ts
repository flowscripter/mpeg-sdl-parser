import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractElementaryTypeDefinition from "./AbstractElementaryTypeDefinition.ts";
import type AbstractNode from "./AbstractNode.ts";
import type AlignedModifier from "./AlignedModifier.ts";
import type ElementaryType from "./ElementaryType.ts";
import type Identifier from "./Identifier.ts";
import type LengthAttribute from "./LengthAttribute.ts";
import StatementKind from "./enum/statement_kind.ts";

class ElementaryTypeDefinition extends AbstractElementaryTypeDefinition {
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
    public readonly reservedToken: SyntaxToken | undefined,
    public readonly legacyToken: SyntaxToken | undefined,
    constToken: SyntaxToken | undefined,
    public readonly lookaheadToken: SyntaxToken | undefined,
    assignmentToken: SyntaxToken | undefined,
    public readonly rangeOperatorToken: SyntaxToken | undefined,
    semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(
      StatementKind.ELEMENTARY_TYPE_DEFINITION,
      reservedToken?.location ??
        legacyToken?.location ??
        constToken?.location ??
        alignedModifier?.location ??
        elementaryType.location,
      isConst,
      elementaryType,
      identifier,
      value,
      constToken,
      assignmentToken,
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
      yield this.reservedToken!;
    }

    if (this.isLegacy) {
      yield this.legacyToken!;
    }

    if (this.isConst) {
      yield this.constToken!;
    }

    if (this.alignedModifier) {
      yield* this.alignedModifier.getSyntaxTokenIterable();
    }

    yield* this.elementaryType.getSyntaxTokenIterable();
    yield* this.lengthAttribute.getSyntaxTokenIterable();
    if (this.lookaheadToken) {
      yield this.lookaheadToken;
    }

    yield* this.identifier.getSyntaxTokenIterable();

    if (this.value) {
      yield this.assignmentToken!;
      yield* this.value.getSyntaxTokenIterable();

      if (this.rangeOperatorToken) {
        yield this.rangeOperatorToken!;
        yield* this.endValue!.getSyntaxTokenIterable();
      }
    }

    yield this.semicolonPunctuatorToken;
  }
}

export default ElementaryTypeDefinition;
