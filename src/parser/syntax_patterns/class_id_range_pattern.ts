import { apply, seq } from "../../../deps.ts";
import ClassId from "../../abstract_syntax_tree/node/ClassId.ts";
import ClassIdRange from "../../abstract_syntax_tree/node/ClassIdRange.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { CLASS_ID_RULE } from "../syntax_rules.ts";

function getClassIdRange(
  values: [
    ClassId,
    SyntaxToken,
    ClassId,
  ],
): ClassIdRange {
  const [startClassId, rangeToken, endClassId] = values;

  return new ClassIdRange(startClassId, endClassId, rangeToken);
}

function getClassIdRangePattern() {
  return apply(
    seq(
      CLASS_ID_RULE,
      getToken(TokenKind.OPERATOR_RANGE_TOKEN),
      CLASS_ID_RULE,
    ),
    getClassIdRange,
  );
}

export default getClassIdRangePattern;
