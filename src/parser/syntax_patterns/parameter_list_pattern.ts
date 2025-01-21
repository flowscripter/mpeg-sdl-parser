import { apply, opt_sc, rep_sc, seq } from "../../../deps.ts";
import type Parameter from "../../abstract_syntax_tree/node/Parameter.ts";
import ParameterList from "../../abstract_syntax_tree/node/ParameterList.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { SyntacticParserError } from "../../util/ParserError.ts";
import { PARAMETER_RULE } from "../syntax_rules.ts";

function getParameterList(
  values: [
    SyntaxToken,
    [Parameter, SyntaxToken][],
    Parameter | undefined,
    SyntaxToken,
  ],
): ParameterList {
  const [
    openParenthesisToken,
    leadingParameterAndCommaArray,
    finalParameter,
    closeParenthesisToken,
  ] = values;

  const parameters: Parameter[] = [];
  let commaTokens: SyntaxToken[] | undefined;

  if (leadingParameterAndCommaArray.length === 0) {
    if (finalParameter === undefined) {
      throw new SyntacticParserError(
        "Empty parameter list",
        openParenthesisToken,
      );
    }
  } else {
    commaTokens = [];

    leadingParameterAndCommaArray.forEach((parameterAndComma) => {
      parameters.push(parameterAndComma[0]);
      commaTokens!.push(parameterAndComma[1]);
    });

    if (finalParameter === undefined) {
      throw new SyntacticParserError(
        "Trailing comma in parameter list",
        commaTokens[commaTokens.length - 1],
      );
    }
  }

  parameters.push(finalParameter);

  return new ParameterList(
    parameters,
    openParenthesisToken,
    commaTokens,
    closeParenthesisToken,
  );
}

function getParameterListPattern() {
  return apply(
    seq(
      getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
      rep_sc(
        seq(
          PARAMETER_RULE,
          getToken(TokenKind.PUNCTUATOR_COMMA_TOKEN),
        ),
      ),
      opt_sc(
        PARAMETER_RULE,
      ),
      getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
    ),
    getParameterList,
  );
}

export default getParameterListPattern;
