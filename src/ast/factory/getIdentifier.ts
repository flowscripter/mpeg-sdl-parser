import { Text } from "@codemirror/state";
import type { TreeCursor } from "@lezer/common";
import { assertSyntaxNodeType, getToken } from "../../util/nodeFactoryUtils";
import Identifier from "../node/Identifier";

export function getIdentifier(
  cursor: TreeCursor,
  text: Text,
): Identifier {
  assertSyntaxNodeType(cursor, "Identifier");

  const literal = getToken(cursor, text);

  return new Identifier(literal.text, literal);
}
