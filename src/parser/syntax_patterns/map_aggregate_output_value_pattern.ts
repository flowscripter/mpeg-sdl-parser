import { alt_sc, apply, opt_sc, rep_sc, seq } from "../../../deps.ts";
import AbstractMapOutputValue from "../../abstract_syntax_tree/node/AbstractMapOutputValue.ts";
import MapAggregateOutputValue from "../../abstract_syntax_tree/node/AggregateMapOutputValue.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { SyntacticParserError } from "../../util/ParserError.ts";
import {
  MAP_AGGREGATE_OUTPUT_VALUE_RULE,
  MAP_OUTPUT_VALUE_RULE,
} from "../syntax_rules.ts";

function getMapAggregateOutputValue(
  values: [
    SyntaxToken,
    [AbstractMapOutputValue, SyntaxToken][],
    AbstractMapOutputValue | undefined,
    SyntaxToken,
  ],
): MapAggregateOutputValue {
  const [
    openBraceToken,
    leadingOutputValueAndCommaArray,
    finalOutputValue,
    closeBraceToken,
  ] = values;

  const outputValues: AbstractMapOutputValue[] = [];
  let commaTokens: SyntaxToken[] | undefined;

  if (leadingOutputValueAndCommaArray.length === 0) {
    if (finalOutputValue === undefined) {
      throw new SyntacticParserError(
        "Empty output value",
        openBraceToken,
      );
    }
  } else {
    commaTokens = [];

    leadingOutputValueAndCommaArray.forEach((outputValueAndComma) => {
      outputValues.push(outputValueAndComma[0]);
      commaTokens!.push(outputValueAndComma[1]);
    });

    if (finalOutputValue === undefined) {
      throw new SyntacticParserError(
        "Trailing comma in output value",
        commaTokens[commaTokens.length - 1],
      );
    }
  }

  outputValues.push(finalOutputValue);

  return new MapAggregateOutputValue(
    outputValues,
    openBraceToken,
    commaTokens,
    closeBraceToken,
  );
}

function getMapAggregateOutputValuePattern() {
  return apply(
    seq(
      getToken(TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN),
      rep_sc(
        seq(
          alt_sc(
            MAP_OUTPUT_VALUE_RULE,
            MAP_AGGREGATE_OUTPUT_VALUE_RULE,
          ),
          getToken(TokenKind.PUNCTUATOR_COMMA_TOKEN),
        ),
      ),
      opt_sc(
        alt_sc(
          MAP_OUTPUT_VALUE_RULE,
          MAP_AGGREGATE_OUTPUT_VALUE_RULE,
        ),
      ),
      getToken(TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN),
    ),
    getMapAggregateOutputValue,
  );
}

export default getMapAggregateOutputValuePattern;
