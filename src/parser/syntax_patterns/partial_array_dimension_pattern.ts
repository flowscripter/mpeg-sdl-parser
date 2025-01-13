import { apply, seq } from "../../../deps.ts";
import AbstractExpression from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import PartialArrayDimension from "../../abstract_syntax_tree/node/PartialArrayDimension.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { EXPRESSION_RULE } from "../syntax_rules.ts";

function getPartialArrayDimension(
  values: [
    SyntaxToken,
    SyntaxToken,
    AbstractExpression,
    SyntaxToken,
    SyntaxToken,
  ],
): PartialArrayDimension {
  const [
    openBracketToken,
    innerOpenBracketToken,
    indexExpression,
    innerCloseBracketToken,
    closeBracketToken,
  ] = values;

  return new PartialArrayDimension(
    indexExpression,
    openBracketToken,
    innerOpenBracketToken,
    innerCloseBracketToken,
    closeBracketToken,
  );
}

function getPartialArrayDimensionPattern() {
  return apply(
    seq(
      getToken(TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN),
      getToken(TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN),
      EXPRESSION_RULE,
      getToken(TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN),
      getToken(TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN),
    ),
    getPartialArrayDimension,
  );
}

export default getPartialArrayDimensionPattern;
