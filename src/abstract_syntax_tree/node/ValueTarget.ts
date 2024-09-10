import Identifier from "./Identifier.ts";
import ClassMemberAccessExpression from "./ClassMemberAccessExpression.ts";
import ArrayElementAccessExpression from "./ArrayElementAccessExpression.ts";

type ValueTarget =
  | Identifier
  | ClassMemberAccessExpression
  | ArrayElementAccessExpression;

export default ValueTarget;
