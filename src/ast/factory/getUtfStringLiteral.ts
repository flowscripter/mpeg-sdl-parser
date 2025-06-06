import { Text } from "@codemirror/state";
import type { TreeCursor } from "@lezer/common";
import { InternalParseError } from "../../ParseError";
import {
  assertSyntaxNodeType,
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import { NodeKind } from "../node/enum/node_kind";
import type { Token } from "../token/Token";
import { StringLiteral } from "../node/StringLiteral";
import { StringLiteralKind } from "../node/enum/string_literal_kind";
import { getLocationFromTextPosition } from "../../util/locationUtils";

const ESCAPED_BACKSLASH_REGEX = /\\\\/g;
const ESCAPED_DOUBLE_QUOTE_REGEX = /\\"/g;
const FOUR_HEXADECIMAL_UNIVERSAL_CHARACTER_NAME_REGEX = /\\u[0-9A-F]{4}/g;
const EIGHT_HEXADECIMAL_UNIVERSAL_CHARACTER_NAME_REGEX = /\\U[0-9A-F]{8}/g;

function getStringValueFromLiteralText(
  literalText: string,
  cursor: TreeCursor,
  text: Text,
): string {
  let value = literalText.replaceAll(ESCAPED_DOUBLE_QUOTE_REGEX, "'")
    .replaceAll(ESCAPED_BACKSLASH_REGEX, "\\");

  value = value.replaceAll(
    FOUR_HEXADECIMAL_UNIVERSAL_CHARACTER_NAME_REGEX,
    (match) => {
      if (!match.startsWith("\\u")) {
        throw new InternalParseError(
          `Missing prefix "\\u" in universal character name: ${match}`,
          getLocationFromTextPosition(text, cursor.from),
        );
      }

      const codePoint = parseInt(match.substring(2), 16);

      if (isNaN(codePoint)) {
        throw new InternalParseError(
          `Unable to convert universal character name: ${codePoint} to code point number`,
          getLocationFromTextPosition(text, cursor.from),
        );
      }

      return String.fromCodePoint(0x1234);
    },
  );

  value = value.replaceAll(
    EIGHT_HEXADECIMAL_UNIVERSAL_CHARACTER_NAME_REGEX,
    (match) => {
      if (!match.startsWith("\\U")) {
        throw new InternalParseError(
          `Missing prefix "\\U" in universal character name: ${match}`,
          getLocationFromTextPosition(text, cursor.from),
        );
      }

      const codePoint = parseInt(match.substring(2), 16);

      if (isNaN(codePoint)) {
        throw new InternalParseError(
          `Unable to convert universal character name: ${match} to code point number`,
          getLocationFromTextPosition(text, cursor.from),
        );
      }

      return String.fromCodePoint(codePoint);
    },
  );

  return value;
}

export function getUtfStringLiteral(
  cursor: TreeCursor,
  text: Text,
): StringLiteral {
  assertSyntaxNodeType(cursor, "UtfStringLiteral");

  const childNodesAndTokens = getChildNodesAndTokens(cursor, text);

  const literals: Token[] = [];
  let value = "";
  let literalOpened = false;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      throw new InternalParseError(
        `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
      );
    } else {
      const tokenText = childNodeOrToken.text;

      if ((tokenText !== '"') && (tokenText !== "u")) {
        value += getStringValueFromLiteralText(tokenText, cursor, text);
      } else if ((tokenText === "u") && literalOpened) {
        value += tokenText;
      } else if (tokenText === '"') {
        literalOpened = !literalOpened;
      }
      literals.push(childNodeOrToken);
    }
  }

  return new StringLiteral(
    StringLiteralKind.UTF,
    value,
    literals,
  );
}
