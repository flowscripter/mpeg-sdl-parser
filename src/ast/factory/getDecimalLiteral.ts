import { Text } from "@codemirror/state";
import type { TreeCursor } from "@lezer/common";
import { assertSyntaxNodeType, getToken } from "../../util/nodeFactoryUtils";
import { NumberLiteral } from "../node/NumberLiteral";
import { NumberLiteralKind } from "../node/enum/number_literal_kind";

export function getDecimalLiteral(
  cursor: TreeCursor,
  text: Text,
): NumberLiteral {
  assertSyntaxNodeType(cursor, "DecimalLiteral");

  const literal = getToken(cursor, text);
  const literalText = literal.text;
  const value = parseFloat(literalText);

  return new NumberLiteral(
    NumberLiteralKind.DECIMAL,
    value,
    [literal],
  );
}
