import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractStatement from "./AbstractStatement.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import MapEntry from "./MapEntry.ts";

class MapEntryList extends AbstractStatement {
  constructor(
    public readonly mapEntries: MapEntry[],
    public readonly openBraceToken: SyntaxToken,
    public readonly commaTokens: SyntaxToken[] | undefined,
    public readonly closeBraceToken: SyntaxToken,
  ) {
    super(NodeKind.MAP_ENTRY_LIST, openBraceToken.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitMapEntryList(this);
  }
}

export default MapEntryList;
