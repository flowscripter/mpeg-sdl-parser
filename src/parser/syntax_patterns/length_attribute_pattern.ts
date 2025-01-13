import { apply, seq } from "../../../deps.ts";
import AbstractExpression from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import LengthAttribute from "../../abstract_syntax_tree/node/LengthAttribute.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { EXPRESSION_RULE } from "../syntax_rules.ts";

function getLengthAttribute(
  values: [SyntaxToken, AbstractExpression, SyntaxToken],
): LengthAttribute {
  const [openParenthesisToken, lengthExpression, closeParenthesisToken] =
    values;

  return new LengthAttribute(
    lengthExpression,
    openParenthesisToken,
    closeParenthesisToken,
  );
}

function getLengthAttributePattern() {
  return apply(
    seq(
      getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
      EXPRESSION_RULE,
      getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
    ),
    getLengthAttribute,
  );
}

export default getLengthAttributePattern;
