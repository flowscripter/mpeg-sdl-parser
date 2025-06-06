import { Text } from "@codemirror/state";
import type { TreeCursor } from "@lezer/common";
import { InternalParseError } from "../../ParseError";
import { assertSyntaxNodeType, getToken } from "../../util/nodeFactoryUtils";
import { NumberLiteral } from "../node/NumberLiteral";
import { NumberLiteralKind } from "../node/enum/number_literal_kind";

export function getAlignmentBitCount(
  cursor: TreeCursor,
  text: Text,
): NumberLiteral {
  assertSyntaxNodeType(cursor, "AlignmentBitCount");

  const literal = getToken(cursor, text);
  const literalText = literal.text;
  const value = parseInt(literalText, 10);

  if (![8, 16, 32, 64, 128].includes(value)) {
    throw new InternalParseError(
      `Unexpected value: ${value}`,
    );
  }

  return new NumberLiteral(
    NumberLiteralKind.INTEGER,
    value,
    [literal],
  );
}
