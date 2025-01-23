import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
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
    public readonly reservedToken: SyntaxToken | undefined,
    public readonly legacyToken: SyntaxToken | undefined,
    public readonly openParenthesisToken: SyntaxToken,
    public readonly closeParenthesisToken: SyntaxToken,
    public readonly semicolonToken: SyntaxToken,
  ) {
    super(
      StatementKind.MAP_DEFINITION,
      reservedToken?.location ?? legacyToken?.location ??
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
    if (this.reservedToken) {
      yield this.reservedToken;
    }

    if (this.legacyToken) {
      yield this.legacyToken;
    }

    if (this.elementaryType) {
      yield* this.elementaryType.getSyntaxTokenIterable();
    } else {
      yield* this.classIdentifier!.getSyntaxTokenIterable();
    }
    yield this.openParenthesisToken;
    yield* this.mapIdentifier.getSyntaxTokenIterable();
    yield this.closeParenthesisToken;
    yield* this.identifier.getSyntaxTokenIterable();
    yield this.semicolonToken;
  }
}
