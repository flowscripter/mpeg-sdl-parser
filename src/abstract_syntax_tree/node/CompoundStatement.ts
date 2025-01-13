import NodeVisitor from "../visitor/NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import Statement from "./AbstractStatement.ts";
import AbstractStatement from "./AbstractStatement.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";

class CompoundStatement extends AbstractStatement {
  constructor(
    public readonly statements: Statement[],
    public readonly openBracePunctuatorToken: SyntaxToken,
    public readonly closeBracePunctuatorToken: SyntaxToken,
  ) {
    super(NodeKind.COMPOUND_STATEMENT, openBracePunctuatorToken.location);
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitCompoundStatement(this);
  }
}

export default CompoundStatement;
