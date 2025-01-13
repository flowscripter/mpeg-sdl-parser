import { apply, opt_sc, rep_sc, seq } from "../../../deps.ts";
import MapEntry from "../../abstract_syntax_tree/node/MapEntry.ts";
import MapEntryList from "../../abstract_syntax_tree/node/MapEntryList.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { SyntacticParserError } from "../../util/ParserError.ts";
import { MAP_ENTRY_RULE } from "../syntax_rules.ts";

function getMapEntryList(
  values: [
    SyntaxToken,
    [MapEntry, SyntaxToken][],
    MapEntry | undefined,
    SyntaxToken,
  ],
): MapEntryList {
  const [
    openBraceToken,
    leadingMapEntryAndCommaArray,
    finalMapEntry,
    closeBraceToken,
  ] = values;

  const mapEntries: MapEntry[] = [];
  let commaTokens: SyntaxToken[] | undefined;

  if (leadingMapEntryAndCommaArray.length === 0) {
    if (finalMapEntry === undefined) {
      throw new SyntacticParserError(
        "Empty map entry list",
        openBraceToken,
      );
    }
  } else {
    commaTokens = [];

    leadingMapEntryAndCommaArray.forEach((mapEntryAndComma) => {
      mapEntries.push(mapEntryAndComma[0]);
      commaTokens!.push(mapEntryAndComma[1]);
    });

    if (finalMapEntry === undefined) {
      throw new SyntacticParserError(
        "Trailing comma in map entry list",
        commaTokens[commaTokens.length - 1],
      );
    }
  }

  mapEntries.push(finalMapEntry);

  return new MapEntryList(
    mapEntries,
    openBraceToken,
    commaTokens,
    closeBraceToken,
  );
}

function getMapEntryListPattern() {
  return apply(
    seq(
      getToken(TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN),
      rep_sc(
        seq(
          MAP_ENTRY_RULE,
          getToken(TokenKind.PUNCTUATOR_COMMA_TOKEN),
        ),
      ),
      opt_sc(
        MAP_ENTRY_RULE,
      ),
      getToken(TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN),
    ),
    getMapEntryList,
  );
}

export default getMapEntryListPattern;
