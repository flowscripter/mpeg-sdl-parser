import { alt_sc, apply, seq } from "../../../deps.ts";
import type AbstractNode from "../../abstract_syntax_tree/node/AbstractNode.ts";
import type Identifier from "../../abstract_syntax_tree/node/Identifier.ts";
import type NumberLiteral from "../../abstract_syntax_tree/node/NumberLiteral.ts";
import PrimaryExpression from "../../abstract_syntax_tree/node/PrimaryExpression.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import {
  EXPRESSION_RULE,
  IDENTIFIER_RULE,
  NUMBER_LITERAL_RULE,
} from "../syntax_rules.ts";

function getPrimaryExpression(
  value:
    | Identifier
    | NumberLiteral
    | [
      SyntaxToken,
      AbstractNode,
      SyntaxToken,
    ],
): AbstractNode {
  if (!Array.isArray(value)) {
    return value;
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
