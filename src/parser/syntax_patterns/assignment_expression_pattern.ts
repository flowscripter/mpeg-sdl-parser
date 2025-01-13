import { apply, seq } from "../../../deps.ts";
import AbstractExpression from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import AssignmentExpression from "../../abstract_syntax_tree/node/AssignmentExpression.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { EXPRESSION_RULE } from "../syntax_rules.ts";

function getAssignmentExpression(
  values: [AbstractExpression, SyntaxToken, AbstractExpression],
): AssignmentExpression {
  const [valueTarget, equalOperatorToken, valueSource] = values;

  return new AssignmentExpression(
    valueTarget,
    valueSource,
    equalOperatorToken,
  );
}

function getAssignmentExpressionPattern() {
  return apply(
    seq(
      EXPRESSION_RULE,
      getToken(TokenKind.OPERATOR_ASSIGNMENT_TOKEN),
      EXPRESSION_RULE,
    ),
    getAssignmentExpression,
  );
}

export default getAssignmentExpressionPattern;
