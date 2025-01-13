import NodeVisitor from "../visitor/NodeVisitor.ts";
import Location from "../../tokenizer/token/Location.ts";
import NodeKind from "./enum/node_kind.ts";
import AbstractStatement from "./AbstractStatement.ts";

class ForStatement extends AbstractStatement {
  // TODO: implement
  //   readonly for_statement ::= for open_parenthesis (assignment_expression | computed_elementary_type_definition )? semicolon expression? semicolon (assignment_expression | expression)? close_parenthesis compound_statement
  //   readonly expression1: AssignmentExpression | ComputedVariableDefinition;
  //   readonly expression2: Expression;
  //   readonly expression3: AssignmentExpression | Expression;
  //   readonly compoundStatement: CompoundStatement;
  constructor(location: Location, _name: string) {
    super(NodeKind.FOR_STATEMENT, location);
    // this.name = name;
  }

  public accept(visitor: NodeVisitor) {
    visitor.visitForStatement(this);
  }
}

export default ForStatement;
