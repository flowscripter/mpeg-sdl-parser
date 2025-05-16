import type { AbstractNode } from "./AbstractNode.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import type { AlignedModifier } from "./AlignedModifier.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type { StringVariableKind } from "./enum/string_variable_kind.ts";
import type { Identifier } from "./Identifier.ts";
import type { StringLiteral } from "./StringLiteral.ts";

export class StringDefinition extends AbstractStatement {
  constructor(
    public readonly isReserved: boolean,
    public readonly isLegacy: boolean,
    public readonly isConst: boolean,
    public readonly alignedModifier: AlignedModifier | undefined,
    public readonly stringVariableKind: StringVariableKind,
    public readonly identifier: Identifier,
    public readonly stringLiteral: StringLiteral | undefined,
    public readonly reservedKeywordToken: SyntaxToken | undefined,
    public readonly legacyKeywordToken: SyntaxToken | undefined,
    public readonly constKeywordToken: SyntaxToken | undefined,
    public readonly stringVariableKindToken: SyntaxToken,
    public readonly assignmentPunctuatorToken: SyntaxToken | undefined,
    public readonly semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(
      StatementKind.STRING_DEFINITION,
      reservedKeywordToken?.location ??
        legacyKeywordToken?.location ??
        constKeywordToken?.location ??
        alignedModifier?.location ??
        stringVariableKindToken.location,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.alignedModifier) {
      yield this.alignedModifier;
    }

    yield this.identifier;
    if (this.stringLiteral) {
      yield this.stringLiteral;
    }
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    if (this.reservedKeywordToken) {
      yield this.reservedKeywordToken;
    }
    if (this.legacyKeywordToken) {
      yield this.legacyKeywordToken;
    }
    if (this.constKeywordToken) {
      yield this.constKeywordToken;
    }
    if (this.alignedModifier) {
      yield* this.alignedModifier.getSyntaxTokenIterable();
    }
    yield this.stringVariableKindToken;
    yield* this.identifier.getSyntaxTokenIterable();
    if (this.assignmentPunctuatorToken) {
      yield this.assignmentPunctuatorToken;
      yield* this.stringLiteral!.getSyntaxTokenIterable();
    }
    yield this.semicolonPunctuatorToken;
  }
}
