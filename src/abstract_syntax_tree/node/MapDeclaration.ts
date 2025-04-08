import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import type { AbstractNode } from "./AbstractNode.ts";
import { AbstractStatement } from "./AbstractStatement.ts";
import type { ElementaryType } from "./ElementaryType.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type { Identifier } from "./Identifier.ts";
import type { MapEntryList } from "./MapEntryList.ts";

export class MapDeclaration extends AbstractStatement {
  constructor(
    public readonly identifier: Identifier,
    public readonly outputElementaryType: ElementaryType | undefined,
    public readonly outputClassIdentifier: Identifier | undefined,
    public readonly mapEntryList: MapEntryList,
    public readonly mapKeywordToken: SyntaxToken,
    public readonly openParenthesisPunctuatorToken: SyntaxToken,
    public readonly closeParenthesisPunctuatorToken: SyntaxToken,
  ) {
    super(StatementKind.MAP_DECLARATION, mapKeywordToken.location);
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.identifier;
    if (this.outputElementaryType) {
      yield this.outputElementaryType;
    } else if (this.outputClassIdentifier) {
      yield this.outputClassIdentifier;
    }
    yield this.mapEntryList;
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.mapKeywordToken;
    yield* this.identifier.getSyntaxTokenIterable();
    yield this.openParenthesisPunctuatorToken;
    if (this.outputElementaryType) {
      yield* this.outputElementaryType.getSyntaxTokenIterable();
    } else if (this.outputClassIdentifier) {
      yield* this.outputClassIdentifier.getSyntaxTokenIterable();
    }
    yield this.closeParenthesisPunctuatorToken;
    yield* this.mapEntryList.getSyntaxTokenIterable();
  }
}
