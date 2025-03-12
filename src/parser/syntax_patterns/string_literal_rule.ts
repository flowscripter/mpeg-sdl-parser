import { alt_sc, apply, rep_sc } from "typescript-parsec";
import { StringLiteralKind } from "../../abstract_syntax_tree/node/enum/string_literal_kind.ts";
import { StringLiteral } from "../../abstract_syntax_tree/node/StringLiteral.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import {
  InternalParserError,
  SyntacticParserError,
} from "../../util/ParserError.ts";

const ESCAPED_BACKSLASH_REGEX = /\\\\/g;
const ESCAPED_DOUBLE_QUOTE_REGEX = /\\"/g;
const FOUR_HEXADECIMAL_UNIVERSAL_CHARACTER_NAME_REGEX = /\\u[0-9A-F]{4}/g;
const EIGHT_HEXADECIMAL_UNIVERSAL_CHARACTER_NAME_REGEX = /\\U[0-9A-F]{8}/g;

function validateAndStripStringLiteral(
  stringLiteralToken: SyntaxToken,
  stringLiteralKind: StringLiteralKind,
  isFirst: boolean,
): string {
  let text = stringLiteralToken.text;

  if ((stringLiteralKind === StringLiteralKind.BASIC) && text.startsWith("u")) {
    if (isFirst) {
      throw new InternalParserError(
        `Unexpected UTF prefix "u" in string literal: ${text}`,
        stringLiteralToken,
      );
    } else {
      throw new SyntacticParserError(
        `Unexpected UTF prefix "u" in subsequent string literal: ${text}`,
        stringLiteralToken,
      );
    }
  }

  if (stringLiteralKind === StringLiteralKind.UTF) {
    if (!text.startsWith("u")) {
      if (isFirst) {
        throw new InternalParserError(
          `Missing UTF prefix "u" in string literal: ${text}`,
          stringLiteralToken,
        );
      } else {
        throw new SyntacticParserError(
          `Missing UTF prefix "u" in subsequent string literal: ${text}`,
          stringLiteralToken,
        );
      }
    }
    text = text.substring(1);
  }

  if (text[0] !== '"') {
    throw new InternalParserError(
      `Missing starting double quote in string literal: ${text}`,
      stringLiteralToken,
    );
  }

  if (text[text.length - 1] !== '"') {
    throw new InternalParserError(
      `Missing ending double quote in string literal: ${text}`,
      stringLiteralToken,
    );
  }

  text = text.substring(1, text.length - 1);
  text = text.replaceAll(ESCAPED_DOUBLE_QUOTE_REGEX, '"');
  text = text.replaceAll(ESCAPED_BACKSLASH_REGEX, "\\");

  // convert UTF characters
  if (stringLiteralKind === StringLiteralKind.UTF) {
    text = text.replaceAll(
      FOUR_HEXADECIMAL_UNIVERSAL_CHARACTER_NAME_REGEX,
      (match) => {
        if (!match.startsWith("\\u")) {
          throw new InternalParserError(
            `Missing prefix "\\u" in universal character name: ${match}`,
            stringLiteralToken,
          );
        }

        const codePoint = parseInt(match.substring(2), 16);

        if (isNaN(codePoint)) {
          throw new InternalParserError(
            `Unable to convert universal character name: ${codePoint} to code point number`,
            stringLiteralToken,
          );
        }

        return String.fromCodePoint(0x1234);
      },
    );

    text = text.replaceAll(
      EIGHT_HEXADECIMAL_UNIVERSAL_CHARACTER_NAME_REGEX,
      (match) => {
        if (!match.startsWith("\\U")) {
          throw new InternalParserError(
            `Missing prefix "\\U" in universal character name: ${match}`,
            stringLiteralToken,
          );
        }

        const codePoint = parseInt(match.substring(2), 16);

        if (isNaN(codePoint)) {
          throw new InternalParserError(
            `Unable to convert universal character name: ${match} to code point number`,
            stringLiteralToken,
          );
        }

        return String.fromCodePoint(codePoint);
      },
    );
  }

  return text;
}

function getStringLiteral(
  stringLiteralTokens: SyntaxToken[],
): StringLiteral {
  if (stringLiteralTokens.length === 0) {
    throw new InternalParserError("Empty string literal token array");
  }

  const tokenKind = stringLiteralTokens[0].tokenKind;

  if (
    tokenKind !== TokenKind.LITERAL_STRING_BASIC_TOKEN &&
    tokenKind !== TokenKind.LITERAL_STRING_UTF_TOKEN
  ) {
    throw new InternalParserError(
      `Unsupported TokenKind: ${
        TokenKind[tokenKind]
      } when mapping to an StringLiteral node`,
      stringLiteralTokens[0],
    );
  }

  const stringLiteralKind = tokenKind === TokenKind.LITERAL_STRING_BASIC_TOKEN
    ? StringLiteralKind.BASIC
    : StringLiteralKind.UTF;

  const text = stringLiteralTokens.map((stringLiteralToken, index) =>
    validateAndStripStringLiteral(
      stringLiteralToken,
      stringLiteralKind,
      index === 0,
    )
  ).join("");

  return new StringLiteral(
    stringLiteralKind,
    text,
    stringLiteralTokens,
  );
}

export function getStringLiteralPattern() {
  return apply(
    // the token types should be all the same but we allow a sequence of alternates here
    // this allows us to provide a better error message if the token types are different
    rep_sc(
      alt_sc(
        getToken(TokenKind.LITERAL_STRING_BASIC_TOKEN),
        getToken(TokenKind.LITERAL_STRING_UTF_TOKEN),
      ),
    ),
    getStringLiteral,
  );
}
