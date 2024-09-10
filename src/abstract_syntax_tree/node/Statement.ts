import Comment from "./Comment.ts";
import ExpressionStatement from "./ExpressionStatement.ts";
import CompoundStatement from "./CompoundStatement.ts";
import StringDefinition from "./StringDefinition.ts";

// TODO: implement

type Statement =
  | Comment
  | CompoundStatement
  | StringDefinition
  | ExpressionStatement;
// | ElementaryTypeVariableDefinition
// | MapDefinition
// | MapVariableDefinition
// | ClassDefinition
// | ClassVariableDefinition
// | ArrayVariableDefinition
// | IfStatement
// | SwitchStatement
// | ForStatement
// | DoStatement
// | WhileStatement

export default Statement;
