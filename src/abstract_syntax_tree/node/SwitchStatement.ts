import Node from "../Node.ts";
import NodeVisitor from "../NodeVisitor.ts";
import Location from "../Location.ts";
import NodeKind from "./enum/node_kind.ts";

/* Rule FC.2: Flow control using switch */

class SwitchStatement extends Node {
  // TODO: implement
  //   readonly type ConstantExpression = NumberLiteral | StringLiteral;
  //   readonly switch_case_clause ::= case constant_expression colon ((statement* break semicolon) | (open_brace statement* break semicolon close_brace))
  //   readonly switch_default_clause ::= default colon (statement* | ( open_brace statement* close_brace))
  //   readonly switch_statement ::= switch open_parenthesis expression close_parenthesis open_brace switch_case_clause* switch_default_clause? close_brace
  //   readonly expression: Expression;
  //   readonly caseClauses: { case: ConstantExpression, statements: Statement[]}[];
  //   readonly defaultClauseStatements?: Statement[];
  constructor(location: Location, _name: string) {
    super(NodeKind.SWITCH_STATEMENT, location);
    // this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitSwitchStatement(this);
  }
}

export default SwitchStatement;
