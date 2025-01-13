import NodeVisitor from "../visitor/NodeVisitor.ts";
import Location from "../../tokenizer/token/Location.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractStatement from "./AbstractStatement.ts";

class IfStatement extends AbstractStatement {
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
