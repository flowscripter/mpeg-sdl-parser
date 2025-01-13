import { apply, seq } from "../../../deps.ts";
import AbstractExpression from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import LengthOfExpression from "../../abstract_syntax_tree/node/LengthOfExpression.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { EXPRESSION_RULE } from "../syntax_rules.ts";

function getLengthofExpression(
  values: [
    SyntaxToken,
    SyntaxToken,
    AbstractExpression,
    SyntaxToken,
  ],
): LengthOfExpression {
  const [
    lengthofToken,
    openParenthesisToken,
    abstractExpression,
    closeParenthesisToken,
  ] = values;
  return new LengthOfExpression(
    abstractExpression,
    lengthofToken,
    openParenthesisToken,
    closeParenthesisToken,
  );
}

function getLengthofExpressionPattern() {
  return apply(
    seq(
      getToken(TokenKind.KEYWORD_LENGTHOF_TOKEN),
      getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
      EXPRESSION_RULE,
      getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
    ),
    getLengthofExpression,
  );
}

export default getLengthofExpressionPattern;
