import { apply, seq } from "../../../deps.ts";
import type AggregateMapOutputValue from "../../abstract_syntax_tree/node/AggregateMapOutputValue.ts";
import MapEntry from "../../abstract_syntax_tree/node/MapEntry.ts";
import type NumberLiteral from "../../abstract_syntax_tree/node/NumberLiteral.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import {
  AGGREGATE_MAP_OUTPUT_VALUE_RULE,
  NUMBER_LITERAL_RULE,
} from "../syntax_rules.ts";

function getMapEntry(
  values: [
    NumberLiteral,
    SyntaxToken,
    AggregateMapOutputValue,
  ],
): MapEntry {
  const [
    inputValue,
    commaToken,
    outputValue,
  ] = values;

  return new MapEntry(
    inputValue,
    outputValue,
    commaToken,
  );
}

function getMapEntryPattern() {
  return apply(
    seq(
      NUMBER_LITERAL_RULE,
      getToken(TokenKind.PUNCTUATOR_COMMA_TOKEN),
      AGGREGATE_MAP_OUTPUT_VALUE_RULE,
    ),
    getMapEntry,
  );
}

export default getMapEntryPattern;
