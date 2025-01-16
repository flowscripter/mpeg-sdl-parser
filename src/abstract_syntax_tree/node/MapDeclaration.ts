import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractNode from "./AbstractNode.ts";
import AbstractStatement from "./AbstractStatement.ts";
import ElementaryType from "./ElementaryType.ts";
import StatementKind from "./enum/statement_kind.ts";
import Identifier from "./Identifier.ts";
import MapEntryList from "./MapEntryList.ts";

class MapDeclaration extends AbstractStatement {
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

export default MapDeclaration;
