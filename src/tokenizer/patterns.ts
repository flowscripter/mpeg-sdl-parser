// deno-fmt-ignore-file

/* References are either to sub-clauses or rules appearing in 14496-34 */

/* Note that (?:x) matches x but does not remember the match and thus improves performance */

/* 5.1 Character set */
const NON_ZERO_DIGIT_CHARACTER_PATTERN  = '[1-9]';
const DIGIT_CHARACTER_PATTERN = '[0-9]';
const LATIN_CHARACTER_PATTERN = '[a-zA-Z]';
const DOUBLE_QUOTE_CHARACTER_PATTERN = '"';

// escaped twice: firstly for Javascript string literal, secondly for Regex special character
const BACKSLASH_CHARACTER_PATTERN = '\\\\';

// graphic characters not including double quote and backslash
const GRAPHIC_CHARACTER_PATTERN = '!' + '|' + '%' + '|' + '&' + '|' + ',' + '|' + '\\.' + '|' + '/' + '|' +
    ';' + '|' + '<' + '|' + '>' + '|' + '_' + '|' + '\\{' + '|' + '\\}' + '|' + '~' + '|' + '#' + '|' + "'" + '|' +
    '\\(' + '|' + '\\)' + '|' + '\\*' + '|' + '\\+' + '|' + '-' + '|' + ':' + '|' + '=' + '|' + '\\?' + '|' + '\\[' +
    '|' + '\\]' + '|' + '\\^' + '|' + '\\|';
const BASIC_CHARACTER_PATTERN = DIGIT_CHARACTER_PATTERN + '|' + LATIN_CHARACTER_PATTERN + '|' +
    GRAPHIC_CHARACTER_PATTERN;
const BASIC_CHARACTER_SET_PATTERN = BASIC_CHARACTER_PATTERN + '|' + DOUBLE_QUOTE_CHARACTER_PATTERN + '|' +
    BACKSLASH_CHARACTER_PATTERN;

/* 5.2 Whitespace */

export const WHITESPACE_PATTERN = '\\s+';

/* 5.4 Comments */

/* Rule S.1: Comments - until the end of the line */

export const COMMENT_PATTERN = '//' + '(?: |\t|' + BASIC_CHARACTER_SET_PATTERN + ')*';

/* 5.5 Identifiers */

const IDENTIFIER_CHARACTER_PATTERN = '(?:' + DIGIT_CHARACTER_PATTERN + '|' + LATIN_CHARACTER_PATTERN + '|' + '_' + ')';

/* An identifier shall include at least one alphabetic character. */
export const IDENTIFIER_PATTERN = IDENTIFIER_CHARACTER_PATTERN + '*' + LATIN_CHARACTER_PATTERN + IDENTIFIER_CHARACTER_PATTERN + '*';

/* 5.6 Punctuators */

export const PUNCTUATOR_OPEN_PARENTHESIS_PATTERN = '\\(';
export const PUNCTUATOR_CLOSE_PARENTHESIS_PATTERN = '\\)';
export const PUNCTUATOR_OPEN_BRACE_PATTERN = '\\{';
export const PUNCTUATOR_CLOSE_BRACE_PATTERN = '\\}';
export const PUNCTUATOR_OPEN_BRACKET_PATTERN = '\\[';
export const PUNCTUATOR_CLOSE_BRACKET_PATTERN = '\\]';
export const PUNCTUATOR_COLON_PATTERN = ':';
export const PUNCTUATOR_SEMICOLON_PATTERN = ';';
export const PUNCTUATOR_COMMA_PATTERN = ',';

/* 5.7 Keywords */

export const KEYWORD_ABSTRACT_PATTERN = 'abstract';
export const KEYWORD_ALIGNED_PATTERN = 'aligned';
export const KEYWORD_BASE64_STRING_PATTERN = 'base64string';
export const KEYWORD_BIT_PATTERN = 'bit';
export const KEYWORD_BREAK_PATTERN = 'break';
export const KEYWORD_CASE_PATTERN = 'case';
export const KEYWORD_CLASS_PATTERN = 'class';
export const KEYWORD_CONST_PATTERN = 'const';
export const KEYWORD_DEFAULT_PATTERN = 'default';
export const KEYWORD_DO_PATTERN = 'do';
export const KEYWORD_ELSE_PATTERN = 'else';
export const KEYWORD_EXPANDABLE_PATTERN = 'expandable';
export const KEYWORD_EXTENDS_PATTERN = 'extends';
export const KEYWORD_FLOAT_PATTERN = 'float';
export const KEYWORD_FOR_PATTERN = 'for';
export const KEYWORD_IF_PATTERN = 'if';
export const KEYWORD_INT_PATTERN = 'int';
export const KEYWORD_LENGTHOF_PATTERN = 'lengthof';
export const KEYWORD_MAP_PATTERN = 'map';
export const KEYWORD_SWITCH_PATTERN = 'switch';
export const KEYWORD_UNSIGNED_PATTERN = 'unsigned';
export const KEYWORD_UTF8_STRING_PATTERN = 'utf8string';
export const KEYWORD_UTF8_LIST_PATTERN = 'utf8list';
export const KEYWORD_UTF_STRING_PATTERN = 'utfstring';
export const KEYWORD_WHILE_PATTERN = 'while';

/* 5.8 Operators */

export const OPERATOR_CLASS_MEMBER_ACCESS_PATTERN = '\\.';
// [] array element access defined as part of ARRAY_ELEMENT_ACCESS_EXPRESSION_RULE
export const OPERATOR_POSTFIX_INCREMENT_PATTERN = '\\+\\+';
export const OPERATOR_POSTFIX_DECREMENT_PATTERN = '--';
// used for both unary plus and binary add
export const OPERATOR_PLUS_PATTERN = '\\+';
// used for both unary negation and binary subtract
export const OPERATOR_MINUS_PATTERN = '-';
export const OPERATOR_MULTIPLY_PATTERN = '\\*';
export const OPERATOR_DIVIDE_PATTERN = '/';
export const OPERATOR_MODULUS_PATTERN = '%';
export const OPERATOR_SHIFT_LEFT_PATTERN = '<<';
export const OPERATOR_SHIFT_RIGHT_PATTERN = '>>';
export const OPERATOR_LESS_THAN_PATTERN = '<';
export const OPERATOR_LESS_THAN_OR_EQUAL_PATTERN = '<=';
export const OPERATOR_GREATER_THAN_PATTERN = '>';
export const OPERATOR_GREATER_THAN_OR_EQUAL_PATTERN = '>=';
export const OPERATOR_EQUAL_PATTERN = '==';
export const OPERATOR_NOT_EQUAL_PATTERN = '!=';
export const OPERATOR_BINARY_AND_PATTERN = '&';
export const OPERATOR_BINARY_OR_PATTERN = '\\|';
export const OPERATOR_LOGICAL_AND_PATTERN = '&&';
export const OPERATOR_LOGICAL_OR_PATTERN = '\\|\\|';
export const OPERATOR_ASSIGNMENT_PATTERN = '=';

/* 5.11 Built-in operators */

/* Rule O.2: Range operator */

export const OPERATOR_RANGE_PATTERN = '\\.\\.';

/* 5.14 Binary literal values */

/* Rule S.2: Binary literal value */

const BINARY_CHARACTER_PATTERN = '[0-1]';
const BINARY_CHARACTER_STRING_PATTERN = BINARY_CHARACTER_PATTERN + '+';
const FOUR_BINARY_CHARACTERS_PATTERN = BINARY_CHARACTER_PATTERN + '{4}';
const ONE_TO_FOUR_BINARY_CHARACTERS_PATTERN = BINARY_CHARACTER_PATTERN + '{1,4}';
const PERIOD_SEPARATED_BINARY_CHARACTER_STRING_PATTERN = FOUR_BINARY_CHARACTERS_PATTERN + '\\.(?:' + FOUR_BINARY_CHARACTERS_PATTERN + '\\.)*' + ONE_TO_FOUR_BINARY_CHARACTERS_PATTERN;
export const LITERAL_BINARY_PATTERN = '0b(?:' + PERIOD_SEPARATED_BINARY_CHARACTER_STRING_PATTERN + '|' + BINARY_CHARACTER_STRING_PATTERN + ')';

/* 5.15 Hexadecimal literal values */

/* Rule S.3: Hexadecimal literal value */

const HEXADECIMAL_CHARACTER_PATTERN = '[0-9A-F]';
const HEXADECIMAL_CHARACTER_STRING_PATTERN = HEXADECIMAL_CHARACTER_PATTERN + '*';
const FOUR_HEXADECIMAL_CHARACTERS_PATTERN = HEXADECIMAL_CHARACTER_PATTERN + '{4}';
const ONE_TO_FOUR_HEXADECIMAL_CHARACTERS_PATTERN = HEXADECIMAL_CHARACTER_PATTERN + '{1,4}';
const PERIOD_SEPARATED_HEXADECIMAL_CHARACTER_STRING_PATTERN = FOUR_HEXADECIMAL_CHARACTERS_PATTERN + '\\.(?:' + FOUR_HEXADECIMAL_CHARACTERS_PATTERN + '\\.)*' + ONE_TO_FOUR_HEXADECIMAL_CHARACTERS_PATTERN;
export const LITERAL_HEXADECIMAL_PATTERN = '0x(?:' + PERIOD_SEPARATED_HEXADECIMAL_CHARACTER_STRING_PATTERN + '|' + HEXADECIMAL_CHARACTER_STRING_PATTERN + ')';

/* 5.16 Integer, decimal and floating-point literal values */

const POSITIVE_INTEGER_PATTERN = NON_ZERO_DIGIT_CHARACTER_PATTERN + DIGIT_CHARACTER_PATTERN + '*';
export const LITERAL_INTEGER_PATTERN = '(?:0|' + POSITIVE_INTEGER_PATTERN + ')';
export const LITERAL_DECIMAL_PATTERN = LITERAL_INTEGER_PATTERN + '\\.' + DIGIT_CHARACTER_PATTERN + '*';
export const LITERAL_FLOATING_POINT_PATTERN = '(?:' + LITERAL_INTEGER_PATTERN + '|' + LITERAL_DECIMAL_PATTERN + ')e(?:' + OPERATOR_PLUS_PATTERN +  '|' + OPERATOR_MINUS_PATTERN + ')?' + LITERAL_INTEGER_PATTERN;

/* 5.17 String literal values */

const ENCODING_PREFIX_UTF8_PATTERN = 'u8';
const ENCODING_PREFIX_UTF16_PATTERN = 'u';

// any basic character (excluding double quote and backslash) or
// an escaped basic character (excluding double quote and backslash) or
// an escaped double quote or
// an escaped backslash or
// a space character
const LITERAL_CHARACTER_PATTERN = '(?:' + BASIC_CHARACTER_PATTERN + '|' +
    BACKSLASH_CHARACTER_PATTERN + '(?:' + BASIC_CHARACTER_PATTERN + ')' + '|' +
    BACKSLASH_CHARACTER_PATTERN + BACKSLASH_CHARACTER_PATTERN + '|' +
    BACKSLASH_CHARACTER_PATTERN + DOUBLE_QUOTE_CHARACTER_PATTERN + '|' +
    ' ' + ')';

// TODO: Basic literal string values may contain the space character but shall not contain other white space characters
//  such as tab or carriage return. UTF literal string values can contain other white space characters as long as they
//  do not cause the string literal to be multiline. If such whitespace is required, a universal character name can be used.
// utf characters (excluding double quote, backslash and #xFEFF)
const UTF_CHARACTER_SUBSET_1_PATTERN = '(?:[\\u{0000}-\\u{0021}]|[\\u{0023}-\\u{005B}]|[\\u{005D}-\\u{FEFE}]|[\\u{FF00}-\\u{10FFFF}])';

// utf characters (excluding double quote, backslash, #xFEFF, u and U)
const UTF_CHARACTER_SUBSET_2_PATTERN = '(?:[\\u{0000}-\\u{0021}]|[\\u{0023}-\\u{0054}]|[\\u{0056}-\\u{005B}]|[\\u{005D}-\\u{0074}]|[\\u{0076}-\\u{FEFE}]|[\\u{FF00}-\\u{10FFFF}])';

const EIGHT_HEXADECIMAL_CHARACTERS_PATTERN = HEXADECIMAL_CHARACTER_PATTERN + '{8}';
const UNIVERSAL_CHARACTER_NAME_PATTERN = '(?:\\\\u' + FOUR_HEXADECIMAL_CHARACTERS_PATTERN + '|\\\\U' + EIGHT_HEXADECIMAL_CHARACTERS_PATTERN + ')';

// a universal character name or
// any utf character (excluding double quote, backslash and #xFEFF) or
// an escaped utf character (excluding double quote, backslash and #xFEF) or
// an escaped double quote or
// an escaped backslash
const LITERAL_UTF_CHARACTER_PATTERN = '(?:' + UNIVERSAL_CHARACTER_NAME_PATTERN + '|' +
    UTF_CHARACTER_SUBSET_1_PATTERN + '|' +
    BACKSLASH_CHARACTER_PATTERN + '(?:' + UTF_CHARACTER_SUBSET_2_PATTERN + ')' + '|' +
    BACKSLASH_CHARACTER_PATTERN + BACKSLASH_CHARACTER_PATTERN + '|' +
    BACKSLASH_CHARACTER_PATTERN + DOUBLE_QUOTE_CHARACTER_PATTERN + ')';

export const LITERAL_STRING_BASIC_PATTERN = DOUBLE_QUOTE_CHARACTER_PATTERN + LITERAL_CHARACTER_PATTERN + '*' + DOUBLE_QUOTE_CHARACTER_PATTERN;
export const LITERAL_STRING_UTF8_PATTERN = ENCODING_PREFIX_UTF8_PATTERN + DOUBLE_QUOTE_CHARACTER_PATTERN + LITERAL_UTF_CHARACTER_PATTERN + '*' + DOUBLE_QUOTE_CHARACTER_PATTERN;
export const LITERAL_STRING_UTF16_PATTERN = ENCODING_PREFIX_UTF16_PATTERN + DOUBLE_QUOTE_CHARACTER_PATTERN + LITERAL_UTF_CHARACTER_PATTERN + '*' + DOUBLE_QUOTE_CHARACTER_PATTERN;
