import { apply, seq } from "../../../deps.ts";
import { ClassIdRange } from "../../abstract_syntax_tree/node/ClassIdRange.ts";
import type { SingleClassId } from "../../abstract_syntax_tree/node/SingleClassId.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { SINGLE_CLASS_ID_RULE } from "../syntax_rules.ts";

function getClassIdRange(
  values: [
    SingleClassId,
    SyntaxToken,
    SingleClassId,
  ],
): ClassIdRange {
  const [startClassId, rangeToken, endClassId] = values;

  return new ClassIdRange(startClassId, endClassId, rangeToken);
}

export function getClassIdRangePattern() {
  return apply(
    seq(
      SINGLE_CLASS_ID_RULE,
      getToken(TokenKind.OPERATOR_RANGE_TOKEN),
      SINGLE_CLASS_ID_RULE,
    ),
    getClassIdRange,
  );
}
