import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

class WhileStatement extends Node {
  // TODO: implement
  //   readonly while_statement ::= while open_parenthesis expression close_parenthesis compound_statement
  //   readonly expression: Expression;
  //   readonly compoundStatement: CompoundStatement;
  constructor(location: Location, _name: string) {
    super(NodeKind.WHILE_STATEMENT, location);
    // this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitWhileStatement(this);
  }
}

export default WhileStatement;
