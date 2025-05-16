import type { AbstractNode } from "./AbstractNode.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import type { ElementaryType } from "./ElementaryType.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type { Identifier } from "./Identifier.ts";

export class MapDefinition extends AbstractStatement {
  constructor(
    public readonly isReserved: boolean,
    public readonly isLegacy: boolean,
    public readonly elementaryType: ElementaryType | undefined,
    public readonly classIdentifier: Identifier | undefined,
    public readonly mapIdentifier: Identifier,
    public readonly identifier: Identifier,
    public readonly reservedKeywordToken: SyntaxToken | undefined,
    public readonly legacyKeywordToken: SyntaxToken | undefined,
    public readonly openParenthesisPunctuatorToken: SyntaxToken,
    public readonly closeParenthesisPunctuatorToken: SyntaxToken,
    public readonly semicolonPunctuatorToken: SyntaxToken,
  ) {
    super(
      StatementKind.MAP_DEFINITION,
      reservedKeywordToken?.location ?? legacyKeywordToken?.location ??
        elementaryType?.location ?? classIdentifier!.location,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    if (this.elementaryType) {
      yield this.elementaryType;
    } else {
      yield this.classIdentifier!;
    }
    yield this.mapIdentifier;
    yield this.identifier;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    if (this.reservedKeywordToken) {
      yield this.reservedKeywordToken;
    }

    if (this.legacyKeywordToken) {
      yield this.legacyKeywordToken;
    }

    if (this.elementaryType) {
      yield* this.elementaryType.getSyntaxTokenIterable();
    } else {
      yield* this.classIdentifier!.getSyntaxTokenIterable();
    }
    yield this.openParenthesisPunctuatorToken;
    yield* this.mapIdentifier.getSyntaxTokenIterable();
    yield this.closeParenthesisPunctuatorToken;
    yield* this.identifier.getSyntaxTokenIterable();
    yield this.semicolonPunctuatorToken;
  }
}
