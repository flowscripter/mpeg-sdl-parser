import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractStatement from "./AbstractStatement.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import Identifier from "./Identifier.ts";
import MapEntryList from "./MapEntryList.ts";
import ElementaryType from "./ElementaryType.ts";

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
    super(NodeKind.MAP_DECLARATION, mapToken.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitMapDeclaration(this);
  }
}

export default MapDeclaration;
