import { apply, opt_sc, seq } from "../../../deps.ts";
import AbstractExpression from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import ImplicitArrayDimension from "../../abstract_syntax_tree/node/ImplicitArrayDimension.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { EXPRESSION_RULE } from "../syntax_rules.ts";

function getImplicitArrayDimension(
  values: [
    SyntaxToken,
    [AbstractExpression, SyntaxToken, AbstractExpression] | undefined,
    SyntaxToken,
  ],
): ImplicitArrayDimension {
  const [
    openBracketToken,
    rangeAttribute,
    closeBracketToken,
  ] = values;

  let rangeStartExpression: AbstractExpression | undefined;
  let rangeOperatorToken: SyntaxToken | undefined;
  let rangeEndExpression: AbstractExpression | undefined;

  if (rangeAttribute) {
    rangeStartExpression = rangeAttribute[0];
    rangeOperatorToken = rangeAttribute[1];
    rangeEndExpression = rangeAttribute[2];
  }

  return new ImplicitArrayDimension(
    rangeStartExpression,
    rangeEndExpression,
    openBracketToken,
    rangeOperatorToken,
    closeBracketToken,
  );
}

function getImplicitArrayDimensionPattern() {
  return apply(
    seq(
      getToken(TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN),
      opt_sc(
        seq(
          EXPRESSION_RULE,
          getToken(TokenKind.OPERATOR_RANGE_TOKEN),
          EXPRESSION_RULE,
        ),
      ),
      getToken(TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN),
    ),
    getImplicitArrayDimension,
  );
}

export default getImplicitArrayDimensionPattern;
