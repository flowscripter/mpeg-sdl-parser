import { alt_sc, apply, seq } from "typescript-parsec";
import type { ElementaryType } from "../../abstract_syntax_tree/node/ElementaryType.ts";
import type { LengthAttribute } from "../../abstract_syntax_tree/node/LengthAttribute.ts";
import { SingleMapOutputValue } from "../../abstract_syntax_tree/node/SingleMapOutputValue.ts";
import type { NumberLiteral } from "../../abstract_syntax_tree/node/NumberLiteral.ts";
import {
  ELEMENTARY_TYPE_RULE,
  LENGTH_ATTRIBUTE_RULE,
  NUMBER_LITERAL_RULE,
} from "../syntax_rules.ts";

function getSingleMapOutputValueRule(
  value:
    | NumberLiteral
    | [ElementaryType, LengthAttribute],
): SingleMapOutputValue {
  if (Array.isArray(value)) {
    const [elementaryType, lengthAttribute] = value;
    return new SingleMapOutputValue(
      undefined,
      elementaryType,
      lengthAttribute,
    );
  }

  return new SingleMapOutputValue(
    value as NumberLiteral,
    undefined,
    undefined,
  );
}

export function getSingleMapOutputValueRulePattern() {
  return apply(
    alt_sc(
      NUMBER_LITERAL_RULE,
      seq(
        ELEMENTARY_TYPE_RULE,
        LENGTH_ATTRIBUTE_RULE,
      ),
    ),
    getSingleMapOutputValueRule,
  );
}
