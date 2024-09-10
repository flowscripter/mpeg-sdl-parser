import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import NodeKind from "./enum/node_kind.ts";
import Statement from "./Statement.ts";
import Location from "../Location.ts";

class CompoundStatement extends Node {
  readonly statements: Statement[];
  readonly closeBracePunctuatorLocation: Location;

  constructor(
    openBraceLocation: Location,
    statements: Statement[],
    closeBracePunctuatorLocation: Location,
  ) {
    super(NodeKind.COMPOUND_STATEMENT, openBraceLocation);
    this.statements = statements;
    this.closeBracePunctuatorLocation = closeBracePunctuatorLocation;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitCompoundStatement(this);
  }
}

export default CompoundStatement;
