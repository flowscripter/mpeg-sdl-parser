import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { AbstractArrayDefinition } from "./AbstractArrayDefinition.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import type { AlignedModifier } from "./AlignedModifier.ts";
import type { ArrayElementType } from "./ArrayElementType.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type { ExplicitArrayDimension } from "./ExplicitArrayDimension.ts";
import type { Identifier } from "./Identifier.ts";
import type { ImplicitArrayDimension } from "./ImplicitArrayDimension.ts";
import type { PartialArrayDimension } from "./PartialArrayDimension.ts";

export class ArrayDefinition extends AbstractArrayDefinition {
  constructor(
    public readonly isReserved: boolean,
    public readonly isLegacy: boolean,
    public readonly alignedModifier: AlignedModifier | undefined,
    public readonly arrayElementType: ArrayElementType,
    identifier: Identifier,
    public readonly implicitArrayDimension: ImplicitArrayDimension | undefined,
    public readonly dimensions:
      | (ExplicitArrayDimension | PartialArrayDimension)[]
      | undefined,
    public readonly reservedToken: SyntaxToken | undefined,
    public readonly legacyToken: SyntaxToken | undefined,
    semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(
      StatementKind.ARRAY_DEFINITION,
      reservedToken?.location ?? legacyToken?.location ??
        alignedModifier?.location ??
        arrayElementType.location,
      identifier,
      semicolonPunctuatorToken,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.alignedModifier) {
      yield this.alignedModifier;
    }

    yield this.arrayElementType;
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

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    if (this.isReserved) {
      yield this.reservedToken!;
    }

    if (this.isLegacy) {
      yield this.legacyToken!;
    }

    if (this.alignedModifier) {
      yield* this.alignedModifier.getSyntaxTokenIterable();
    }

    yield* this.arrayElementType.getSyntaxTokenIterable();
    yield* this.identifier.getSyntaxTokenIterable();

    if (this.implicitArrayDimension) {
      yield* this.implicitArrayDimension.getSyntaxTokenIterable();
    }

    if (this.dimensions) {
      for (const dimension of this.dimensions) {
        yield* dimension.getSyntaxTokenIterable();
      }
    }

    yield this.semicolonPunctuatorToken;
  }
}
