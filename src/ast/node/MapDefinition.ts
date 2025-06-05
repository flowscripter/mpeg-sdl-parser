import type Token from "../token/Token.ts";
import type AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import type ElementaryType from "./ElementaryType.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type Identifier from "./Identifier.ts";

export default class MapDefinition extends AbstractStatement {
  constructor(
    public readonly isReserved: boolean,
    public readonly isLegacy: boolean,
    public readonly elementaryType: ElementaryType | undefined,
    public readonly classIdentifier: Identifier | undefined,
    public readonly mapIdentifier: Identifier,
    public readonly identifier: Identifier,
    public readonly reservedKeyword: Token | undefined,
    public readonly legacyKeyword: Token | undefined,
    public readonly openParenthesisPunctuator: Token,
    public readonly closeParenthesisPunctuator: Token,
    public readonly semicolonPunctuator: Token,
  ) {
    super(
      StatementKind.MAP_DEFINITION,
      reservedKeyword ?? legacyKeyword ??
        elementaryType?.startToken ?? classIdentifier!.startToken,
      semicolonPunctuator,
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
}
