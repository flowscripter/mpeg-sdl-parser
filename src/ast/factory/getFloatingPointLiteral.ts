import { Text } from "@codemirror/state";
import type { TreeCursor } from "@lezer/common";
import { getToken } from "../../util/nodeFactoryUtils";
import { NumberLiteral } from "../node/NumberLiteral";
import { NumberLiteralKind } from "../node/enum/number_literal_kind";

export function getFloatingPointLiteral(
  cursor: TreeCursor,
  text: Text,
): NumberLiteral {
  const literal = getToken(cursor, text);
  const literalText = literal.text;
  const value = parseFloat(literalText);

  return new NumberLiteral(
    NumberLiteralKind.FLOATING_POINT,
    value,
    [literal],
  );
}
