import NodeVisitor from "../visitor/NodeVisitor.ts";
import Location from "../../tokenizer/token/Location.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractStatement from "./AbstractStatement.ts";

/* Rule FC.4: Flow control using do */

class DoStatement extends AbstractStatement {
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
