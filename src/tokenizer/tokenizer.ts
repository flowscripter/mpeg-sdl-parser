// deno-fmt-ignore-file

import { buildLexer } from "../../deps.ts";
import TokenKind from "./token_kind.ts";

/* Whitespace */

const WHITESPACE_PATTERN = '\\s+';

/* Comment */

const COMMENT_PATTERN = '//.*';

/* Rule S.2: Binary value */

const BINARY_CHARACTER_PATTERN = '[01]';
const BINARY_CHARACTER_STRING_PATTERN = BINARY_CHARACTER_PATTERN + '*';
const FOUR_BINARY_CHARACTERS_PATTERN = BINARY_CHARACTER_PATTERN + '{4}';
const ONE_TO_FOUR_BINARY_CHARACTERS_PATTERN = BINARY_CHARACTER_PATTERN + '{1,4}';
const PERIOD_SEPARATED_BINARY_CHARACTER_STRING_PATTERN = FOUR_BINARY_CHARACTERS_PATTERN + '(?:\\.' + FOUR_BINARY_CHARACTERS_PATTERN + ')+(?:\\.' + ONE_TO_FOUR_BINARY_CHARACTERS_PATTERN + ')?';
const VALUE_BINARY_PATTERN = '0b(?:' + PERIOD_SEPARATED_BINARY_CHARACTER_STRING_PATTERN + '|' + BINARY_CHARACTER_STRING_PATTERN + ')';

/* Rule S.3: Hexadecimal value */

const HEXADECIMAL_CHARACTER_PATTERN = '[0-9A-F]';
const HEXADECIMAL_CHARACTER_STRING_PATTERN = HEXADECIMAL_CHARACTER_PATTERN + '*';
const FOUR_HEXADECIMAL_CHARACTERS_PATTERN = HEXADECIMAL_CHARACTER_PATTERN + '{4}';
const ONE_TO_FOUR_HEXADECIMAL_CHARACTERS_PATTERN = HEXADECIMAL_CHARACTER_PATTERN + '{1,4}';
const PERIOD_SEPARATED_HEXADECIMAL_CHARACTER_STRING_PATTERN = FOUR_HEXADECIMAL_CHARACTERS_PATTERN + '(?:\\.' + FOUR_HEXADECIMAL_CHARACTERS_PATTERN + ')+(?:\\.' + ONE_TO_FOUR_HEXADECIMAL_CHARACTERS_PATTERN + ')?';
const VALUE_HEXADECIMAL_PATTERN = '0x(?:' + PERIOD_SEPARATED_HEXADECIMAL_CHARACTER_STRING_PATTERN + '|' + HEXADECIMAL_CHARACTER_STRING_PATTERN + ')';

/* Identifiers */

const POSITIVE_DIGIT_PATTERN = '[1-9]';
const DIGIT_PATTERN = '(?:0|' + POSITIVE_DIGIT_PATTERN + ')';
const CHARACTER_PATTERN = '[a-zA-Z]';
const IDENTIFIER_CHARACTER_PATTERN = '(?:' + POSITIVE_DIGIT_PATTERN + '|' + CHARACTER_PATTERN + '|' + '_' + ')';

/* An identifier may start with and contain any identifier_character but must contain at least one character */
const IDENTIFIER_PATTERN = IDENTIFIER_CHARACTER_PATTERN + '*' + CHARACTER_PATTERN + IDENTIFIER_CHARACTER_PATTERN + '*';

/* Numbers */

const VALUE_POSITIVE_INTEGER_PATTERN = POSITIVE_DIGIT_PATTERN + DIGIT_PATTERN + '*';
const VALUE_INTEGER_PATTERN = '(?:-?(0|' + VALUE_POSITIVE_INTEGER_PATTERN + '))'
const VALUE_FLOAT_PATTERN = VALUE_INTEGER_PATTERN + '(?:\\.' + DIGIT_PATTERN + '+)?(?:e' + VALUE_INTEGER_PATTERN + ')?';

/* Expressions */

const OPERATOR_POSTFIX_INCREMENT_PATTERN = '\\+\\+';
const OPERATOR_POSTFIX_DECREMENT_PATTERN = '--';
const OPERATOR_MULTIPLY_PATTERN = '\\*';
const OPERATOR_DIVIDE_PATTERN = '/';
const OPERATOR_MODULUS_PATTERN = '%';
const OPERATOR_ADD_PATTERN = '\\+';
const OPERATOR_SUBTRACT_PATTERN = '-';
const OPERATOR_SHIFT_LEFT_PATTERN = '<<';
const OPERATOR_SHIFT_RIGHT_PATTERN = '>>';
const OPERATOR_LESS_THAN_PATTERN = '<';
const OPERATOR_LESS_THAN_OR_EQUAL_PATTERN = '<=';
const OPERATOR_GREATER_THAN_PATTERN = '>';
const OPERATOR_GREATER_THAN_OR_EQUAL_PATTERN = '>=';
const OPERATOR_EQUAL_PATTERN = '==';
const OPERATOR_NOT_EQUAL_PATTERN = '!=';
const OPERATOR_BINARY_AND_PATTERN = '&';
const OPERATOR_BINARY_OR_PATTERN = '\\|';
const OPERATOR_LOGICAL_AND_PATTERN = '&&';
const OPERATOR_LOGICAL_OR_PATTERN = '\\|\\|';

/* Assignment */

const OPERATOR_ASSIGNMENT_PATTERM = '=';

/* Rule O.1: Range operator */

const OPERATOR_RANGE_PATTERN = '\\.\\.';

/* Rule O.2: Class member access operator */

const OPERATOR_CLASS_MEMBER_ACCESS_PATTERN = '\\.';

/* Rule E.5: String data types */

// not a quote or a backslash or a backslash followed by any character
const STRING_LITERAL_CHARACTER_PATTERN = '(?:[^"\\\\]|\\\\.)';
const STRING_LITERAL_PATTERN = '"' + STRING_LITERAL_CHARACTER_PATTERN + '*"';
const ENCODING_PREFIX_UTF8_PATTERN = 'u8';
const ENCODING_PREFIX_UTF16_PATTERN = 'u';

/* Punctuators */

const PUNCTUATOR_OPEN_PARENTHESIS = '\\(';
const PUNCTUATOR_CLOSE_PARENTHESIS = '\\)';
const PUNCTUATOR_OPEN_BRACE = '\\{';
const PUNCTUATOR_CLOSE_BRACE = '\\}';
const PUNCTUATOR_OPEN_BRACKET = '\\[';
const PUNCTUATOR_CLOSE_BRACKET = '\\]';
const PUNCTUATOR_COLON = ':';
const PUNCTUATOR_SEMICOLON = ';';
const PUNCTUATOR_COMMA = ',';

/* Keywords */

const KEYWORD_ABSTRACT_PATTERN = 'abstract';
const KEYWORD_ALIGNED_PATTERN = 'aligned';
const KEYWORD_BASE64_STRING_PATTERN = 'base64string';
const KEYWORD_BIT_PATTERN = 'bit';
const KEYWORD_BREAK_PATTERN = 'break';
const KEYWORD_CASE_PATTERN = 'case';
const KEYWORD_CLASS_PATTERN = 'class';
const KEYWORD_CONST_PATTERN = 'const';
const KEYWORD_DEFAULT_PATTERN = 'default';
const KEYWORD_DO_PATTERN = 'do';
const KEYWORD_ELSE_PATTERN = 'else';
const KEYWORD_EXPANDABLE_PATTERN = 'expandable';
const KEYWORD_EXTENDS_PATTERN = 'extends';
const KEYWORD_FLOAT_PATTERN = 'float';
const KEYWORD_FOR_PATTERN = 'for';
const KEYWORD_IF_PATTERN = 'if';
const KEYWORD_INT_PATTERN = 'int';
const KEYWORD_LENGTHOF_PATTERN = 'lengthof';
const KEYWORD_MAP_PATTERN = 'map';
const KEYWORD_SWITCH_PATTERN = 'switch';
const KEYWORD_TYPE_PATTERN = 'type';
const KEYWORD_UNSIGNED_PATTERN = 'unsigned';
const KEYWORD_UTF8_STRING_PATTERN = 'utf8string';
const KEYWORD_UTF8_LIST_PATTERN = 'utf8list';
const KEYWORD_UTF_STRING_PATTERN = 'utfstring';
const KEYWORD_WHILE_PATTERN = 'while';

function getRegExp(pattern: string) {
    return new RegExp('^' + pattern, 'g');
}

export default buildLexer([
    // misc tokens
    [false, getRegExp(WHITESPACE_PATTERN), TokenKind.Whitespace],
    [true, getRegExp(COMMENT_PATTERN), TokenKind.Comment],

    // string literal tokens
    [true, getRegExp(STRING_LITERAL_PATTERN), TokenKind.StringLiteral],
    [true, getRegExp(ENCODING_PREFIX_UTF8_PATTERN), TokenKind.EncodingPrefixUtf8],
    [true, getRegExp(ENCODING_PREFIX_UTF16_PATTERN), TokenKind.EncodingPrefixUtf16],

    // value tokens
    [true, getRegExp(VALUE_BINARY_PATTERN), TokenKind.ValueBinary],
    [true, getRegExp(VALUE_HEXADECIMAL_PATTERN), TokenKind.ValueHexadecimal],
    [true, getRegExp(VALUE_POSITIVE_INTEGER_PATTERN), TokenKind.ValuePositiveInteger],
    [true, getRegExp(VALUE_INTEGER_PATTERN), TokenKind.ValueInteger],
    [true, getRegExp(VALUE_FLOAT_PATTERN), TokenKind.ValueFloat],

    // operator tokens
    [true, getRegExp(OPERATOR_POSTFIX_INCREMENT_PATTERN), TokenKind.OperatorPostfixIncrement],
    [true, getRegExp(OPERATOR_POSTFIX_DECREMENT_PATTERN), TokenKind.OperatorPostfixDecrement],
    [true, getRegExp(OPERATOR_MULTIPLY_PATTERN), TokenKind.OperatorMultiply],
    [true, getRegExp(OPERATOR_DIVIDE_PATTERN), TokenKind.OperatorDivide],
    [true, getRegExp(OPERATOR_MODULUS_PATTERN), TokenKind.OperatorModulus],
    [true, getRegExp(OPERATOR_ADD_PATTERN), TokenKind.OperatorAdd],
    [true, getRegExp(OPERATOR_SUBTRACT_PATTERN), TokenKind.OperatorSubtract],
    [true, getRegExp(OPERATOR_SHIFT_LEFT_PATTERN), TokenKind.OperatorShiftLeft],
    [true, getRegExp(OPERATOR_SHIFT_RIGHT_PATTERN), TokenKind.OperatorShiftRight],
    [true, getRegExp(OPERATOR_LESS_THAN_PATTERN), TokenKind.OperatorLessThan],
    [true, getRegExp(OPERATOR_LESS_THAN_OR_EQUAL_PATTERN), TokenKind.OperatorLessThanOrEqual],
    [true, getRegExp(OPERATOR_GREATER_THAN_PATTERN), TokenKind.OperatorGreaterThan],
    [true, getRegExp(OPERATOR_GREATER_THAN_OR_EQUAL_PATTERN), TokenKind.OperatorGreaterThanOrEqual],
    [true, getRegExp(OPERATOR_EQUAL_PATTERN), TokenKind.OperatorEqual],
    [true, getRegExp(OPERATOR_NOT_EQUAL_PATTERN), TokenKind.OperatorNotEqual],
    [true, getRegExp(OPERATOR_BINARY_AND_PATTERN), TokenKind.OperatorBinaryAnd],
    [true, getRegExp(OPERATOR_BINARY_OR_PATTERN), TokenKind.OperatorBinaryOr],
    [true, getRegExp(OPERATOR_LOGICAL_AND_PATTERN), TokenKind.OperatorLogicalAnd],
    [true, getRegExp(OPERATOR_LOGICAL_OR_PATTERN), TokenKind.OperatorLogicalOr],
    [true, getRegExp(OPERATOR_RANGE_PATTERN), TokenKind.OperatorRange],
    [true, getRegExp(OPERATOR_CLASS_MEMBER_ACCESS_PATTERN), TokenKind.OperatorClassMemberAccess],
    [true, getRegExp(OPERATOR_ASSIGNMENT_PATTERM), TokenKind.OperatorAssignment],

    // punctuator tokens
    [true, getRegExp(PUNCTUATOR_OPEN_PARENTHESIS), TokenKind.PunctuatorOpenParenthesis],
    [true, getRegExp(PUNCTUATOR_CLOSE_PARENTHESIS), TokenKind.PunctuatorCloseParenthesis],
    [true, getRegExp(PUNCTUATOR_OPEN_BRACE), TokenKind.PunctuatorOpenBrace],
    [true, getRegExp(PUNCTUATOR_CLOSE_BRACE), TokenKind.PunctuatorCloseBrace],
    [true, getRegExp(PUNCTUATOR_OPEN_BRACKET), TokenKind.PunctuatorOpenBracket],
    [true, getRegExp(PUNCTUATOR_CLOSE_BRACKET), TokenKind.PunctuatorCloseBracket],
    [true, getRegExp(PUNCTUATOR_COLON), TokenKind.PunctuatorColon],
    [true, getRegExp(PUNCTUATOR_SEMICOLON), TokenKind.PunctuatorSemicolon],
    [true, getRegExp(PUNCTUATOR_COMMA), TokenKind.PunctuatorComma],

    // keyword tokens
    [true, getRegExp(KEYWORD_ABSTRACT_PATTERN), TokenKind.KeywordAbstract],
    [true, getRegExp(KEYWORD_ALIGNED_PATTERN), TokenKind.KeywordAligned],
    [true, getRegExp(KEYWORD_BASE64_STRING_PATTERN), TokenKind.KeywordBase64String],
    [true, getRegExp(KEYWORD_BIT_PATTERN), TokenKind.KeywordBit],
    [true, getRegExp(KEYWORD_BREAK_PATTERN), TokenKind.KeywordBreak],
    [true, getRegExp(KEYWORD_CASE_PATTERN), TokenKind.KeywordCase],
    [true, getRegExp(KEYWORD_CLASS_PATTERN), TokenKind.KeywordClass],
    [true, getRegExp(KEYWORD_CONST_PATTERN), TokenKind.KeywordConst],
    [true, getRegExp(KEYWORD_DEFAULT_PATTERN), TokenKind.KeywordDefault],
    [true, getRegExp(KEYWORD_DO_PATTERN), TokenKind.KeywordDo],
    [true, getRegExp(KEYWORD_ELSE_PATTERN), TokenKind.KeywordElse],
    [true, getRegExp(KEYWORD_EXPANDABLE_PATTERN), TokenKind.KeywordExpandable],
    [true, getRegExp(KEYWORD_EXTENDS_PATTERN), TokenKind.KeywordExtends],
    [true, getRegExp(KEYWORD_FLOAT_PATTERN), TokenKind.KeywordFloat],
    [true, getRegExp(KEYWORD_FOR_PATTERN), TokenKind.KeywordFor],
    [true, getRegExp(KEYWORD_IF_PATTERN), TokenKind.KeywordIf],
    [true, getRegExp(KEYWORD_INT_PATTERN), TokenKind.KeywordInt],
    [true, getRegExp(KEYWORD_LENGTHOF_PATTERN), TokenKind.KeywordLengthof],
    [true, getRegExp(KEYWORD_MAP_PATTERN), TokenKind.KeywordMap],
    [true, getRegExp(KEYWORD_SWITCH_PATTERN), TokenKind.KeywordSwitch],
    [true, getRegExp(KEYWORD_TYPE_PATTERN), TokenKind.KeywordType],
    [true, getRegExp(KEYWORD_UNSIGNED_PATTERN), TokenKind.KeywordUnsigned],
    [true, getRegExp(KEYWORD_UTF8_STRING_PATTERN), TokenKind.KeywordUtf8String],
    [true, getRegExp(KEYWORD_UTF8_LIST_PATTERN), TokenKind.KeywordUtf8List],
    [true, getRegExp(KEYWORD_UTF_STRING_PATTERN), TokenKind.KeywordUtfString],
    [true, getRegExp(KEYWORD_WHILE_PATTERN), TokenKind.KeywordWhile],

    // identifier token
    [true, getRegExp(IDENTIFIER_PATTERN), TokenKind.Identifier]
]);
