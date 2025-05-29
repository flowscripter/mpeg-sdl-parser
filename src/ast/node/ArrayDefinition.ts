import type Token from "../token/Token.ts";
import AbstractArrayDefinition from "./AbstractArrayDefinition.ts";
import type AbstractNode from "./AbstractNode.ts";
import type AlignedModifier from "./AlignedModifier.ts";
import type ElementaryType from "./ElementaryType.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type ExplicitArrayDimension from "./ExplicitArrayDimension.ts";
import type Identifier from "./Identifier.ts";
import type ImplicitArrayDimension from "./ImplicitArrayDimension.ts";
import type LengthAttribute from "./LengthAttribute.ts";
import type PartialArrayDimension from "./PartialArrayDimension.ts";

export default class ArrayDefinition extends AbstractArrayDefinition {
  constructor(
    public readonly isReserved: boolean,
    public readonly isLegacy: boolean,
    public readonly alignedModifier: AlignedModifier | undefined,
    public readonly elementaryType: ElementaryType | undefined,
    public readonly lengthAttribute: LengthAttribute | undefined,
    public readonly classIdentifier: Identifier | undefined,
    identifier: Identifier,
    public readonly implicitArrayDimension: ImplicitArrayDimension | undefined,
    public readonly dimensions:
      | (ExplicitArrayDimension | PartialArrayDimension)[]
      | undefined,
    public readonly reservedKeyword: Token | undefined,
    public readonly legacyKeyword: Token | undefined,
    semicolonPunctuator: Token,
  ) {
    super(
      StatementKind.ARRAY_DEFINITION,
      reservedKeyword ?? legacyKeyword ??
        alignedModifier?.startToken ?? elementaryType?.startToken ??
        classIdentifier!.startToken,
      identifier,
      semicolonPunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.alignedModifier) {
      yield this.alignedModifier;
    }

    if (this.elementaryType) {
      yield this.elementaryType;
      yield this.lengthAttribute!;
    } else {
      yield this.classIdentifier!;
    }
    yield this.identifier;

    if (this.implicitArrayDimension) {
      yield this.implicitArrayDimension;
    }

    if (this.dimensions) {
      for (const dimension of this.dimensions) {
        yield dimension;
      }
    }
  }
}
