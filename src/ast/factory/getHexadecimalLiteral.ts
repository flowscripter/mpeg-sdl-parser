import { Text } from "@codemirror/state";
import type { TreeCursor } from "@lezer/common";
import { assertSyntaxNodeType, getToken } from "../../util/nodeFactoryUtils";
import NumberLiteral from "../node/NumberLiteral";
import { NumberLiteralKind } from "../node/enum/number_literal_kind";
import { InternalParseError } from "../../ParseError";
import { getLocationFromTextPosition } from "../../util/locationUtils";

const DOT_SEPARATOR_REGEX = /\./g;

export function getHexadecimalLiteral(
  cursor: TreeCursor,
  text: Text,
): NumberLiteral {
  assertSyntaxNodeType(cursor, "HexadecimalLiteral");

  const literal = getToken(cursor, text);
  const literalText = literal.text;

  if (!literalText.startsWith("0x")) {
    throw new InternalParseError(
      `Missing hexadecimal literal prefix '0x': ${literalText}`,
      getLocationFromTextPosition(text, cursor.from),
    );
  }

  if (literalText.length === 2) {
    throw new InternalParseError(
      `Missing hexadecimal literal value after prefix '0x'`,
      getLocationFromTextPosition(text, cursor.from),
    );
  }

  const stringValue = literalText.substring(2).trim().replaceAll(
    DOT_SEPARATOR_REGEX,
    "",
  );
  const value = parseInt(stringValue, 16);

  return new NumberLiteral(
    NumberLiteralKind.HEXADECIMAL,
    value,
    [literal],
  );
}
