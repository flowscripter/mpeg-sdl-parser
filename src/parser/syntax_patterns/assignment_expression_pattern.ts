import { apply, seq } from "../../../deps.ts";
import AbstractNode from "../../abstract_syntax_tree/node/AbstractNode.ts";
import BinaryExpression from "../../abstract_syntax_tree/node/BinaryExpression.ts";
import BinaryOperatorKind from "../../abstract_syntax_tree/node/enum/binary_operator_kind.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { EXPRESSION_RULE } from "../syntax_rules.ts";

function getAssignmentExpression(
  values: [AbstractNode, SyntaxToken, AbstractNode],
): BinaryExpression {
  const [valueTarget, equalOperatorToken, valueSource] = values;

  return new BinaryExpression(
    valueTarget,
    BinaryOperatorKind.ASSIGNMENT,
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
