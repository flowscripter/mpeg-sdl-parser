import { alt_sc, apply, opt_sc, rep_sc, seq } from "../../../deps.ts";
import ClassIdRange from "../../abstract_syntax_tree/node/ClassIdRange.ts";
import ExtendedClassIdRange from "../../abstract_syntax_tree/node/ExtendedClassIdRange.ts";
import SingleClassId from "../../abstract_syntax_tree/node/SingleClassId.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import {
  InternalParserError,
  SyntacticParserError,
} from "../../util/ParserError.ts";
import { CLASS_ID_RANGE_RULE, SINGLE_CLASS_ID_RULE } from "../syntax_rules.ts";

function getExtendedClassIdRange(
  values: [
    [(SingleClassId | ClassIdRange), SyntaxToken][],
    (SingleClassId | ClassIdRange | undefined),
  ],
): ExtendedClassIdRange {
  const [
    leadingClassIdAndCommaArray,
    finalClassId,
  ] = values;

  const classIds: (SingleClassId | ClassIdRange)[] = [];
  const commaTokens: SyntaxToken[] = [];

  if (leadingClassIdAndCommaArray.length === 0) {
    if (finalClassId === undefined) {
      throw new InternalParserError(
        "Empty Class ID range",
      );
    }
  } else {
    leadingClassIdAndCommaArray.forEach((classIdAndComma) => {
      classIds.push(classIdAndComma[0]);
      commaTokens!.push(classIdAndComma[1]);
    });

    if (finalClassId === undefined) {
      throw new SyntacticParserError(
        "Trailing comma in parameter value list",
        commaTokens[commaTokens.length - 1],
      );
    }
  }

  classIds.push(finalClassId);

  return new ExtendedClassIdRange(
    classIds,
    commaTokens,
  );
}

function getExtendedClassIdRangePattern() {
  return apply(
    seq(
      rep_sc(
        seq(
          alt_sc(
            CLASS_ID_RANGE_RULE,
            SINGLE_CLASS_ID_RULE,
          ),
          getToken(TokenKind.PUNCTUATOR_COMMA_TOKEN),
        ),
      ),
      opt_sc(
        alt_sc(
          CLASS_ID_RANGE_RULE,
          SINGLE_CLASS_ID_RULE,
        ),
      ),
    ),
    getExtendedClassIdRange,
  );
}

export default getExtendedClassIdRangePattern;
