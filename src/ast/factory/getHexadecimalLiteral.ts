import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import {
  assertSyntaxNodeType,
  getTokenFromSyntaxNode,
} from "../../util/nodeFactoryUtils";
import NumberLiteral from "../node/NumberLiteral";
import { NumberLiteralKind } from "../node/enum/number_literal_kind";
import { InternalParseError } from "../../ParseError";
import { getLocationFromTextPosition } from "../../util/locationUtils";

const DOT_SEPARATOR_REGEX = /\./g;

export function getHexadecimalLiteral(
  syntaxNode: SyntaxNode,
  text: Text,
): NumberLiteral {
  assertSyntaxNodeType(syntaxNode, "HexadecimalLiteral");

  const literal = getTokenFromSyntaxNode(syntaxNode, text);
  const literalText = literal.text;

  if (!literalText.startsWith("0x")) {
    throw new InternalParseError(
      `Missing hexadecimal literal prefix '0x': ${literalText}`,
      getLocationFromTextPosition(text, syntaxNode.from),
    );
  }

  if (literalText.length === 2) {
    throw new InternalParseError(
      `Missing hexadecimal literal value after prefix '0x'`,
      getLocationFromTextPosition(text, syntaxNode.from),
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
