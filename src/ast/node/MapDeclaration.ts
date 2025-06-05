import type Token from "../token/Token.ts";
import type AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import type ElementaryType from "./ElementaryType.ts";
import { StatementKind } from "./enum/statement_kind.ts";
import type Identifier from "./Identifier.ts";
import type MapEntry from "./MapEntry.ts";

export default class MapDeclaration extends AbstractStatement {
  constructor(
    public readonly identifier: Identifier,
    public readonly outputElementaryType: ElementaryType | undefined,
    public readonly outputClassIdentifier: Identifier | undefined,
    public readonly mapEntries: MapEntry[],
    public readonly mapKeyword: Token,
    public readonly openParenthesisPunctuator: Token,
    public readonly closeParenthesisPunctuator: Token,
    public readonly openBracePunctuator: Token,
    public readonly commaPunctuators: Token[] | undefined,
    public readonly closeBracePunctuator: Token,
  ) {
    super(
      StatementKind.MAP_DECLARATION,
      mapKeyword,
      closeBracePunctuator,
    );
  }

  override *getChildNodeIterable(): IterableIterator<AbstractNode> {
    yield this.identifier;
    if (this.outputElementaryType) {
      yield this.outputElementaryType;
    } else if (this.outputClassIdentifier) {
      yield this.outputClassIdentifier;
    }
    for (let i = 0; i < this.mapEntries.length; i++) {
      yield this.mapEntries[i];
    }
  }
}
