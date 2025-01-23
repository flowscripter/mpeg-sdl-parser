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
    public readonly mapToken: SyntaxToken,
    public readonly openParenthesisToken: SyntaxToken,
    public readonly closeParenthesisToken: SyntaxToken,
  ) {
    super(StatementKind.MAP_DECLARATION, mapToken.location);
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
    yield this.mapToken;
    yield* this.identifier.getSyntaxTokenIterable();
    if (this.outputElementaryType) {
      yield* this.outputElementaryType.getSyntaxTokenIterable();
    } else if (this.outputClassIdentifier) {
      yield* this.outputClassIdentifier.getSyntaxTokenIterable();
    }
    yield this.openParenthesisToken;
    yield* this.mapEntryList.getSyntaxTokenIterable();
    yield this.closeParenthesisToken;
  }
}
