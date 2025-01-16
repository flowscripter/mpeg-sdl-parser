import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import AbstractLeafNode from "./AbstractLeafNode.ts";
import NodeKind from "./enum/node_kind.ts";

class Identifier extends AbstractLeafNode {
  constructor(
    public readonly name: string,
    public readonly token: SyntaxToken,
  ) {
    super(NodeKind.IDENTIFIER, token.location);
  }

  override *getSyntaxTokenIterable(): IterableIterator<SyntaxToken> {
    yield this.token;
  }
}

export default Identifier;
