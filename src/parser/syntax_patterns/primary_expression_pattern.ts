import { alt_sc, apply, seq } from "../../../deps.ts";
import AbstractExpression from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import PrimaryExpression from "../../abstract_syntax_tree/node/PrimaryExpression.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import {
  EXPRESSION_RULE,
  IDENTIFIER_RULE,
  NUMBER_LITERAL_RULE,
} from "../syntax_rules.ts";

function getPrimaryExpression(
  value:
    | AbstractExpression
    | [
      SyntaxToken,
      AbstractExpression,
      SyntaxToken,
    ],
): AbstractExpression {
  if (!Array.isArray(value)) {
    return value as AbstractExpression;
  }

  const [openParenthesisToken, operand, closeParenthesisToken] = value;

  if (openParenthesisToken) {
    if (!closeParenthesisToken) {
      throw new InternalParserError(
        `Missing close parenthesis`,
        openParenthesisToken,
      );
    }
  }

  if (closeParenthesisToken) {
    if (!openParenthesisToken) {
      throw new InternalParserError(
        `Missing open parenthesis`,
        openParenthesisToken,
      );
    }
  }

  return new PrimaryExpression(
    operand,
    openParenthesisToken,
    closeParenthesisToken,
  );
}

function getPrimaryExpressionPattern() {
  return apply(
    alt_sc(
      IDENTIFIER_RULE,
      NUMBER_LITERAL_RULE,
      seq(
        getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
        EXPRESSION_RULE,
        getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
      ),
    ),
    getPrimaryExpression,
  );
}

export default getPrimaryExpressionPattern;
