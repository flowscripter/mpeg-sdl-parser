import { apply, opt_sc, rep_sc, seq } from "../../../deps.ts";
import AbstractExpression from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import ParameterValueList from "../../abstract_syntax_tree/node/ParameterValueList.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { SyntacticParserError } from "../../util/ParserError.ts";
import { EXPRESSION_RULE } from "../syntax_rules.ts";

function getParameterValueList(
  values: [
    SyntaxToken,
    [AbstractExpression, SyntaxToken][],
    AbstractExpression | undefined,
    SyntaxToken,
  ],
): ParameterValueList {
  const [
    openParenthesisToken,
    leadingValueExpressionAndCommaArray,
    finalValueExpression,
    closeParenthesisToken,
  ] = values;

  const valueExpressions: AbstractExpression[] = [];
  let commaTokens: SyntaxToken[] | undefined;

  if (leadingValueExpressionAndCommaArray.length === 0) {
    if (finalValueExpression === undefined) {
      throw new SyntacticParserError(
        "Empty parameter value list",
        openParenthesisToken,
      );
    }
  } else {
    commaTokens = [];

    leadingValueExpressionAndCommaArray.forEach((valueExpressionAndComma) => {
      valueExpressions.push(valueExpressionAndComma[0]);
      commaTokens!.push(valueExpressionAndComma[1]);
    });

    if (finalValueExpression === undefined) {
      throw new SyntacticParserError(
        "Trailing comma in parameter value list",
        commaTokens[commaTokens.length - 1],
      );
    }
  }

  valueExpressions.push(finalValueExpression);

  return new ParameterValueList(
    valueExpressions,
    openParenthesisToken,
    commaTokens,
    closeParenthesisToken,
  );
}

function getParameterValueListPattern() {
  return apply(
    seq(
      getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
      rep_sc(
        seq(
          EXPRESSION_RULE,
          getToken(TokenKind.PUNCTUATOR_COMMA_TOKEN),
        ),
      ),
      opt_sc(
        EXPRESSION_RULE,
      ),
      getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
    ),
    getParameterValueList,
  );
}

export default getParameterValueListPattern;
