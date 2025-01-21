import { alt_sc, apply, rep_sc, seq } from "../../../deps.ts";
import NumberLiteralKind from "../../abstract_syntax_tree/node/enum/number_literal_kind.ts";
import NumberLiteral from "../../abstract_syntax_tree/node/NumberLiteral.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { InternalParserError } from "../../util/ParserError.ts";

const DOT_SEPARATOR_REGEX = /\./g;
const ESCAPED_BACKSLASH_REGEX = /\\\\/g;
const ESCAPED_SINGLE_QUOTE_REGEX = /\\'/g;
const MAXIMUM_MULTIPLE_CHARACTER_LITERAL_LENGTH = 10;

function parseUnsignedIntFromMultipleCharacterLiteral(literal: string): number {
  if (literal.length > MAXIMUM_MULTIPLE_CHARACTER_LITERAL_LENGTH) {
    throw new InternalParserError(
      `Multiple character number literal exceeds maximum length of ${MAXIMUM_MULTIPLE_CHARACTER_LITERAL_LENGTH}: ${literal}`,
    );
  }

  let value = 0;
  for (let i = 0; i < literal.length; i++) {
    const charCode = literal.charCodeAt(i);
    if (charCode < 0x20 || charCode > 0x7E) {
      throw new InternalParserError(
        `Invalid character ${
          literal.charCodeAt(i)
        } in multiple character number literal: ${literal}`,
      );
    }

    value = (value << 8) + charCode;
  }

  return value;
}

function validateAndStripMultipleCharacterLiteral(
  multipleCharacterLiteralToken: SyntaxToken,
): string {
  const tokenKind = multipleCharacterLiteralToken.tokenKind;

  if (tokenKind !== TokenKind.LITERAL_MULTIPLE_CHARACTER_TOKEN) {
    throw new InternalParserError(
      `Expected multiple character literal token kind, but received: ${
        TokenKind[tokenKind]
      }`,
      multipleCharacterLiteralToken,
    );
  }

  let stringValue = multipleCharacterLiteralToken.text;

  if (stringValue[0] !== "'") {
    throw new InternalParserError(
      `Missing starting single quote in multiple character number literal: ${stringValue}`,
      multipleCharacterLiteralToken,
    );
  }

  if (stringValue[stringValue.length - 1] !== "'") {
    throw new InternalParserError(
      `Missing ending single quote in multiple character number literal: ${stringValue}`,
      multipleCharacterLiteralToken,
    );
  }
  stringValue = stringValue.substring(1, stringValue.length - 1);
  stringValue = stringValue.replaceAll(ESCAPED_BACKSLASH_REGEX, "\\");

  return stringValue.replaceAll(ESCAPED_SINGLE_QUOTE_REGEX, "'");
}

function getNumberLiteral(
  numberLiteralTokenOrTokens: SyntaxToken | [SyntaxToken, SyntaxToken[]],
): NumberLiteral {
  let numberLiteralToken: SyntaxToken;
  let extraMultipleCharacterLiteralTokens: SyntaxToken[] | undefined =
    undefined;
  let extraMultipleCharacterLiteralText = "";

  if (Array.isArray(numberLiteralTokenOrTokens)) {
    [numberLiteralToken, extraMultipleCharacterLiteralTokens] =
      numberLiteralTokenOrTokens;

    const tokenKind = numberLiteralToken.tokenKind;
    if (tokenKind !== TokenKind.LITERAL_MULTIPLE_CHARACTER_TOKEN) {
      throw new InternalParserError(
        `Expected multiple character literal token kind, but received: ${
          TokenKind[tokenKind]
        }`,
        numberLiteralToken,
      );
    }

    extraMultipleCharacterLiteralText = extraMultipleCharacterLiteralTokens.map(
      (multipleCharacterLiteralToken) =>
        validateAndStripMultipleCharacterLiteral(multipleCharacterLiteralToken),
    ).join("");
  } else {
    numberLiteralToken = numberLiteralTokenOrTokens;
  }

  const { tokenKind, text } = numberLiteralToken;

  let numberLiteralKind: NumberLiteralKind;
  let stringValue: string;
  let value: number;

  switch (tokenKind) {
    case TokenKind.LITERAL_BINARY_TOKEN:
      numberLiteralKind = NumberLiteralKind.BINARY;
      if (!text.startsWith("0b")) {
        throw new InternalParserError(
          `Missing binary literal prefix '0b': ${text}`,
          numberLiteralToken,
        );
      }

      if (text.length === 2) {
        throw new InternalParserError(
          `Missing binary literal value after prefix '0b'`,
          numberLiteralToken,
        );
      }

      stringValue = text.substring(2).trim().replaceAll(
        DOT_SEPARATOR_REGEX,
        "",
      );
      value = parseInt(stringValue, 2);

      break;
    case TokenKind.LITERAL_HEXADECIMAL_TOKEN:
      numberLiteralKind = NumberLiteralKind.HEXADECIMAL;
      if (!text.startsWith("0x")) {
        throw new InternalParserError(
          `Missing hexadecimal literal prefix '0x': ${text}`,
          numberLiteralToken,
        );
      }

      if (text.length === 2) {
        throw new InternalParserError(
          `Missing hexadecimal literal value after prefix '0x'`,
          numberLiteralToken,
        );
      }

      stringValue = text.substring(2).trim().replaceAll(
        DOT_SEPARATOR_REGEX,
        "",
      );
      value = parseInt(stringValue, 16);

      break;
    case TokenKind.LITERAL_INTEGER_TOKEN:
      numberLiteralKind = NumberLiteralKind.INTEGER;
      value = parseInt(text, 10);
      break;
    case TokenKind.LITERAL_DECIMAL_TOKEN:
      numberLiteralKind = NumberLiteralKind.DECIMAL;
      value = parseFloat(text);
      break;
    case TokenKind.LITERAL_FLOATING_POINT_TOKEN:
      numberLiteralKind = NumberLiteralKind.FLOATING_POINT;
      value = parseFloat(text);
      break;
    case TokenKind.LITERAL_MULTIPLE_CHARACTER_TOKEN: {
      numberLiteralKind = NumberLiteralKind.MULTIPLE_CHARACTER;

      const initialText = validateAndStripMultipleCharacterLiteral(
        numberLiteralToken,
      );

      value = parseUnsignedIntFromMultipleCharacterLiteral(
        initialText + extraMultipleCharacterLiteralText,
      );
      break;
    }
    default:
      throw new InternalParserError(
        `Unsupported TokenKind: ${
          TokenKind[tokenKind]
        } when mapping to an NumberLiteral node`,
        numberLiteralToken,
      );
  }

  if (isNaN(value)) {
    throw new InternalParserError(
      `Unable to convert number literal string: ${value} for NumberLiteralKind: ${
        TokenKind[tokenKind]
      } to number value`,
      numberLiteralToken,
    );
  }

  if (extraMultipleCharacterLiteralTokens) {
    return new NumberLiteral(
      numberLiteralKind,
      value,
      [numberLiteralToken, ...extraMultipleCharacterLiteralTokens],
    );
  }

  return new NumberLiteral(
    numberLiteralKind,
    value,
    [numberLiteralToken],
  );
}

function getNumberLiteralPattern() {
  return apply(
    alt_sc(
      getToken(TokenKind.LITERAL_BINARY_TOKEN),
      getToken(TokenKind.LITERAL_HEXADECIMAL_TOKEN),
      getToken(TokenKind.LITERAL_INTEGER_TOKEN),
      getToken(TokenKind.LITERAL_DECIMAL_TOKEN),
      getToken(TokenKind.LITERAL_FLOATING_POINT_TOKEN),
      seq(
        getToken(TokenKind.LITERAL_MULTIPLE_CHARACTER_TOKEN),
        rep_sc(
          getToken(TokenKind.LITERAL_MULTIPLE_CHARACTER_TOKEN),
        ),
      ),
    ),
    getNumberLiteral,
  );
}

export default getNumberLiteralPattern;
