import { alt_sc, apply, seq } from "../../../deps.ts";
import ElementaryType from "../../abstract_syntax_tree/node/ElementaryType.ts";
import LengthAttribute from "../../abstract_syntax_tree/node/LengthAttribute.ts";
import MapOutputValue from "../../abstract_syntax_tree/node/MapOutputValue.ts";
import NumberLiteral from "../../abstract_syntax_tree/node/NumberLiteral.ts";
import {
  ELEMENTARY_TYPE_RULE,
  LENGTH_ATTRIBUTE_RULE,
  NUMBER_LITERAL_RULE,
} from "../syntax_rules.ts";

function getMapOutputValueRule(
  value:
    | NumberLiteral
    | [ElementaryType, LengthAttribute],
): MapOutputValue {
  if (Array.isArray(value)) {
    const [elementaryType, lengthAttribute] = value;
    return new MapOutputValue(
      undefined,
      elementaryType,
      lengthAttribute,
    );
  }

  return new MapOutputValue(
    value as NumberLiteral,
    undefined,
    undefined,
  );
}

function getMapOutputValueRulePattern() {
  return apply(
    alt_sc(
      NUMBER_LITERAL_RULE,
      seq(
        ELEMENTARY_TYPE_RULE,
        LENGTH_ATTRIBUTE_RULE,
      ),
    ),
    getMapOutputValueRule,
  );
}

export default getMapOutputValueRulePattern;
