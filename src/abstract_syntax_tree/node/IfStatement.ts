import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

class IfStatement extends Node {
  // TODO: implement
  //   readonly if_statement ::= if open_parenthesis expression close_parenthesis compound_statement (else if open_parenthesis expression open_parenthesis compound_statement)* (else compound_statement)*
  //   readonly ifClauses: { expression: Expression, compoundStatement: CompoundStatement}[];
  //   readonly elseExpression?: Expression;
  constructor(location: Location, _name: string) {
    super(NodeKind.IF_STATEMENT, location);
    // this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitIfStatement(this);
  }
}

export default IfStatement;
