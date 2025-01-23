import { alt_sc, apply, seq } from "../../../deps.ts";
import { ArrayElementType } from "../../abstract_syntax_tree/node/ArrayElementType.ts";
import type { ElementaryType } from "../../abstract_syntax_tree/node/ElementaryType.ts";
import type { Identifier } from "../../abstract_syntax_tree/node/Identifier.ts";
import type { LengthAttribute } from "../../abstract_syntax_tree/node/LengthAttribute.ts";
import {
  ELEMENTARY_TYPE_RULE,
  IDENTIFIER_RULE,
  LENGTH_ATTRIBUTE_RULE,
} from "../syntax_rules.ts";

function getArrayElementType(
  value: [
    ElementaryType,
    LengthAttribute,
  ] | Identifier,
): ArrayElementType {
  if (Array.isArray(value)) {
    const [elementaryType, lengthAttribute] = value;

    return new ArrayElementType(
      elementaryType,
      lengthAttribute,
      undefined,
    );
  }

  return new ArrayElementType(
    undefined,
    undefined,
    value as Identifier,
  );
}

export function getArrayElementTypePattern() {
  return apply(
    alt_sc(
      seq(
        ELEMENTARY_TYPE_RULE,
        LENGTH_ATTRIBUTE_RULE,
      ),
      IDENTIFIER_RULE,
    ),
    getArrayElementType,
  );
}
