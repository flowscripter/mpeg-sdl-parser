import Identifier from "./Identifier.ts";
import LengthOfExpression from "./LengthOfExpression.ts";
import NumberLiteral from "./NumberLiteral.ts";
import Expression from "./Expression.ts";

type OperatorTarget =
  | Expression
  | Identifier
  | NumberLiteral
  | LengthOfExpression;

export default OperatorTarget;
