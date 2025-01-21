import { alt_sc, apply, opt_sc, seq } from "../../../deps.ts";
import type AlignedModifier from "../../abstract_syntax_tree/node/AlignedModifier.ts";
import StringLiteralKind from "../../abstract_syntax_tree/node/enum/string_literal_kind.ts";
import StringVariableKind from "../../abstract_syntax_tree/node/enum/string_variable_kind.ts";
import type Identifier from "../../abstract_syntax_tree/node/Identifier.ts";
import StringDefinition from "../../abstract_syntax_tree/node/StringDefinition.ts";
import type StringLiteral from "../../abstract_syntax_tree/node/StringLiteral.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import {
  InternalParserError,
  SyntacticParserError,
} from "../../util/ParserError.ts";
import {
  ALIGNED_MODIFIER_RULE,
  IDENTIFIER_RULE,
  STRING_LITERAL_RULE,
} from "../syntax_rules.ts";

function getStringDefinition(values: [
  SyntaxToken | undefined,
  SyntaxToken | undefined,
  SyntaxToken | undefined,
  AlignedModifier | undefined,
  SyntaxToken,
  Identifier,
  [SyntaxToken, StringLiteral] | undefined,
  SyntaxToken,
]): StringDefinition {
  const [
    reservedToken,
    legacyToken,
    constToken,
    alignedModifier,
    stringVariableTypeToken,
    identifier,
    assignmentTokenAndStringLiteral,
    semicolonPunctuatorToken,
  ] = values;

  if (reservedToken && legacyToken) {
    throw new SyntacticParserError(
      "A string variable cannot be both reserved and legacy",
      reservedToken,
    );
  }

  let stringVariableKind: StringVariableKind;
  switch (stringVariableTypeToken.tokenKind) {
    case TokenKind.KEYWORD_UTF8STRING_TOKEN:
      stringVariableKind = StringVariableKind.UTF8;
      break;
    case TokenKind.KEYWORD_UTF16STRING_TOKEN:
      stringVariableKind = StringVariableKind.UTF16;
      break;
    case TokenKind.KEYWORD_UTFSTRING_TOKEN:
      stringVariableKind = StringVariableKind.UTF;
      break;
    case TokenKind.KEYWORD_UTF8LIST_TOKEN:
      stringVariableKind = StringVariableKind.UTF8_LIST;
      break;
    case TokenKind.KEYWORD_BASE64STRING_TOKEN:
      stringVariableKind = StringVariableKind.BASE64;
      break;
    default:
      throw new InternalParserError(
        `Unsupported TokenKind: ${
          TokenKind[stringVariableTypeToken.tokenKind]
        } when mapping to a StringDefinition node`,
        stringVariableTypeToken,
      );
  }

  let assignmentPunctuatorToken;
  let stringLiteral;

  if (assignmentTokenAndStringLiteral) {
    [assignmentPunctuatorToken, stringLiteral] =
      assignmentTokenAndStringLiteral;
    if (
      ((stringVariableKind ===
        StringVariableKind.BASE64) &&
        (stringLiteral.stringLiteralKind !== StringLiteralKind.BASIC)) ||
      ((stringVariableKind !==
        StringVariableKind.BASE64) &&
        (stringLiteral.stringLiteralKind !== StringLiteralKind.UTF))
    ) {
      throw new SyntacticParserError(
        `Illegal string literal type: ${
          StringLiteralKind[stringLiteral.stringLiteralKind]
        } for a string variable type of ${
          StringVariableKind[stringVariableKind]
        }`,
        stringVariableTypeToken,
      );
    }
  }

  return new StringDefinition(
    reservedToken !== undefined,
    legacyToken !== undefined,
    constToken !== undefined,
    alignedModifier,
    stringVariableKind,
    identifier,
    stringLiteral,
    reservedToken,
    legacyToken,
    constToken,
    stringVariableTypeToken,
    assignmentPunctuatorToken,
    semicolonPunctuatorToken,
  );
}

function getStringDefinitionPattern() {
  return apply(
    seq(
      opt_sc(
        getToken(TokenKind.KEYWORD_RESERVED_TOKEN),
      ),
      opt_sc(
        getToken(TokenKind.KEYWORD_LEGACY_TOKEN),
      ),
      opt_sc(
        getToken(TokenKind.KEYWORD_CONST_TOKEN),
      ),
      opt_sc(
        ALIGNED_MODIFIER_RULE,
      ),
      alt_sc(
        getToken(TokenKind.KEYWORD_UTF8STRING_TOKEN),
        getToken(TokenKind.KEYWORD_UTF16STRING_TOKEN),
        getToken(TokenKind.KEYWORD_UTFSTRING_TOKEN),
        getToken(TokenKind.KEYWORD_UTF8LIST_TOKEN),
        getToken(TokenKind.KEYWORD_BASE64STRING_TOKEN),
      ),
      IDENTIFIER_RULE,
      opt_sc(
        seq(
          getToken(TokenKind.OPERATOR_ASSIGNMENT_TOKEN),
          STRING_LITERAL_RULE,
        ),
      ),
      getToken(TokenKind.PUNCTUATOR_SEMICOLON_TOKEN),
    ),
    getStringDefinition,
  );
}

export default getStringDefinitionPattern;
