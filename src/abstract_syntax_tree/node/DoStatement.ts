import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

/* Rule FC.4: Flow control using do */

class DoStatement extends Node {
  // TODO: implement
  //   readonly do_statement ::= do compound_statement while open_parenthesis expression close_parenthesis semicolon
  //   readonly compoundStatement: CompoundStatement;
  //   readonly expression: Expression;
  constructor(location: Location, _name: string) {
    super(NodeKind.DO_STATEMENT, location);
    // this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitDoStatement(this);
  }
}

export default DoStatement;
