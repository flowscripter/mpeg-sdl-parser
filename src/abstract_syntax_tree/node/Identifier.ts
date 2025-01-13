import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractExpression from "./AbstractExpression.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";

class Identifier extends AbstractExpression {
  constructor(
    public readonly name: string,
    public readonly token: SyntaxToken,
  ) {
    super(NodeKind.IDENTIFIER, token.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitIdentifier(this);
  }
}

export default Identifier;
