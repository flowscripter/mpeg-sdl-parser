// deno-fmt-ignore-file

/* References are either to sub-clauses or rules appearing in 14496-34 */

/* Note that (?:x) matches x but does not remember the match and thus improves performance */

/* 5.1 Character set */
const NON_ZERO_DIGIT_CHARACTER_PATTERN  = '[1-9]';
const DIGIT_CHARACTER_PATTERN = '[0-9]';
const LATIN_CHARACTER_PATTERN = '[a-zA-Z]';

// escaped twice: firstly for Javascript string literal, secondly for Regex special character
const BACKSLASH_CHARACTER_PATTERN = '\\\\';

// graphic characters: NOTE does not include double quote or backslash
const GRAPHIC_CHARACTER_PATTERN = '!' + '|' + '%' + '|' + '&' + '|' + ',' + '|' + '\\.' + '|' + '/' + '|' +
    ';' + '|' + '<' + '|' + '>' + '|' + '_' + '|' + '\\{' + '|' + '\\}' + '|' + '~' + '|' + '#' + '|' + "'" + '|' +
    '\\(' + '|' + '\\)' + '|' + '\\*' + '|' + '\\+' + '|' + '-' + '|' + ':' + '|' + '=' + '|' + '\\?' + '|' + '\\[' +
    '|' + '\\]' + '|' + '\\^' + '|' + '\\|';
const BASIC_STRING_LITERAL_CHARACTER_PATTERN = DIGIT_CHARACTER_PATTERN + '|' + LATIN_CHARACTER_PATTERN + '|' + GRAPHIC_CHARACTER_PATTERN;
// NOTE does not include non-printable ASCII, BOM, line breaks, double quote, backslash, u or U
const SDL_COMPATIBLE_UCS_STRING_LITERAL_CHARACTER_PATTERN = '(?:[\\u{0020}-\\u{0021}]|[\\u{0023}-\\u{0054}]|[\\u{0056}-\\u{005B}]|[\\u{005D}-\\u{0074}]|[\\u{0076}-\\u{0084}]|[\\u{0086}-\\u{2027}]|[\\u{202A}-\\u{FEFE}]|[\\u{FF00}-\\u{10FFFF}])';
// NOTE does not include non-printable ASCII, BOM or line breaks
const SDL_COMPATIBLE_UCS_CHARACTER_PATTERN = '(?:[\\u{0020}-\\u{0084}]|[\\u{0086}-\\u{2027}]|[\\u{202A}-\\u{FEFE}]|[\\u{FF00}-\\u{10FFFF}])';
// NOTE does not include non-printable ASCII, single quote or backslash
const MULTIPLE_CHARACTER_LITERAL_CHARACTER_PATTERN = '(?:[\\u{0020}-\\u{0026}]|[\\u{0028}-\\u{005B}]|[\\u{005D}-\\u{007E}])';

/* 5.2 Whitespace */

export const WHITESPACE_PATTERN = '\\s+';

// All whitespace characters except those causing a change in row
export const NON_LINEFEED_WHITESPACE_PATTERN = '(?:\\t|\\u{0020}|\\u{00a0}|\\u{1680}|[\\u{2000}-\\u{200a}]|\\u{202f}|\\u{205f}|\\u{3000}|\\u{feff})';

/* 5.4 Comments */

/* Rule S.1: Comments */

/* Comment text can contain SDL compatible UCS characters */
/* When parsing tokens in an SDL specification the comment start characters // and the remainder of the line until the carriage return are ignored. */

// NOTE includes non-printable ASCII, BOM but not line breaks
const NON_SDL_COMPATIBLE_UCS_CHARACTER_PATTERN = '(?:[\\u{0000}-\\u{0009}]|[\\u{000E}-\\u{001F}]|\\u{0085}|\\u{2028}|\\u{2029}|\\u{FEFF})';

// Non-SDL compatible UCS characters will not break tokenization but will cause a parsing error
export const COMMENT_PATTERN = '//' + '(?:' + SDL_COMPATIBLE_UCS_CHARACTER_PATTERN + '|' + NON_SDL_COMPATIBLE_UCS_CHARACTER_PATTERN + ')*';


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
const PUNCTUATOR_DOUBLE_QUOTE_PATTERN = '"';
const PUNCTUATOR_SINGLE_QUOTE_PATTERN  = "'";

/* 5.7 Keywords */

export const KEYWORD_ABSTRACT_PATTERN = 'abstract';
export const KEYWORD_ALIGNED_PATTERN = 'aligned';
export const KEYWORD_BASE64_STRING_PATTERN = 'base64string';
export const KEYWORD_BIT_PATTERN = 'bit';
export const KEYWORD_BREAK_PATTERN = 'break';
export const KEYWORD_CASE_PATTERN = 'case';
export const KEYWORD_CLASS_PATTERN = 'class';
export const KEYWORD_COMPUTED_PATTERN = 'computed';
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
export const KEYWORD_LEGACY_PATTERN = 'legacy';
export const KEYWORD_LENGTHOF_PATTERN = 'lengthof';
export const KEYWORD_MAP_PATTERN = 'map';
export const KEYWORD_RESERVED_PATTERN = 'reserved';
export const KEYWORD_SWITCH_PATTERN = 'switch';
export const KEYWORD_UNSIGNED_PATTERN = 'unsigned';
export const KEYWORD_UTF16_STRING_PATTERN = 'utf16string';
export const KEYWORD_UTF8_STRING_PATTERN = 'utf8string';
export const KEYWORD_UTF8_LIST_PATTERN = 'utf8list';
export const KEYWORD_UTF_STRING_PATTERN = 'utfstring';
export const KEYWORD_WHILE_PATTERN = 'while';

/* 5.8 Operators */

export const OPERATOR_CLASS_MEMBER_ACCESS_PATTERN = '\\.';
// [] array element access defined as part of ARRAY_ELEMENT_ACCESS_EXPRESSION_RULE
export const OPERATOR_POSTFIX_INCREMENT_PATTERN = '\\+\\+';
export const OPERATOR_POSTFIX_DECREMENT_PATTERN = '--';
// used for both unary plus operator and binary add operator
export const OPERATOR_PLUS_PATTERN = '\\+';
// used for both unary negation operator and binary subtract operator
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

// lengthof() operator defined as part of LENGTHOF_EXPRESSION_RULE

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

/* 5.16 Multiple character literal values */

/* Rule S.4: Multiple character literal value */

// any multiple character literal character or
// a backslash followed by any multiple character literal character or
// an escaped single quote or
// an escaped backslash
export const ESCAPED_MULTIPLE_CHARACTER_LITERAL_CHARACTER_PATTERN = '(?:' + MULTIPLE_CHARACTER_LITERAL_CHARACTER_PATTERN + '|' +
    BACKSLASH_CHARACTER_PATTERN + MULTIPLE_CHARACTER_LITERAL_CHARACTER_PATTERN + '|' +
    BACKSLASH_CHARACTER_PATTERN + PUNCTUATOR_SINGLE_QUOTE_PATTERN + '|' +
    BACKSLASH_CHARACTER_PATTERN + BACKSLASH_CHARACTER_PATTERN + ')';
export const LITERAL_MULTIPLE_CHARACTER_PATTERN = PUNCTUATOR_SINGLE_QUOTE_PATTERN + ESCAPED_MULTIPLE_CHARACTER_LITERAL_CHARACTER_PATTERN + '+' + PUNCTUATOR_SINGLE_QUOTE_PATTERN;

/* 5.17 Integer, decimal and floating-point literal values */

const POSITIVE_INTEGER_PATTERN = NON_ZERO_DIGIT_CHARACTER_PATTERN + DIGIT_CHARACTER_PATTERN + '*';
export const LITERAL_INTEGER_PATTERN = '(?:0|' + POSITIVE_INTEGER_PATTERN + ')';
export const LITERAL_DECIMAL_PATTERN = LITERAL_INTEGER_PATTERN + '\\.' + DIGIT_CHARACTER_PATTERN + '+';
export const LITERAL_FLOATING_POINT_PATTERN = '(?:' + LITERAL_INTEGER_PATTERN + '|' + LITERAL_DECIMAL_PATTERN + ')e' + '(?:0|(?:' + OPERATOR_PLUS_PATTERN +  '|' + OPERATOR_MINUS_PATTERN + ')?' + POSITIVE_INTEGER_PATTERN + ')';

/* 5.18 String literal values */

const ENCODING_PREFIX_UTF_PATTERN = 'u';

// any basic string literal character or
// a backslash followed by any basic string literal character or
// an escaped double quote or
// an escaped backslash or
// a space character
const ESCAPED_BASIC_STRING_LITERAL_CHARACTER_PATTERN = '(?:' + BASIC_STRING_LITERAL_CHARACTER_PATTERN + '|' +
    BACKSLASH_CHARACTER_PATTERN + '(?:' + BASIC_STRING_LITERAL_CHARACTER_PATTERN + ')|' +
    BACKSLASH_CHARACTER_PATTERN + PUNCTUATOR_DOUBLE_QUOTE_PATTERN + '|' +
    BACKSLASH_CHARACTER_PATTERN + BACKSLASH_CHARACTER_PATTERN + '|' +
    ' ' + ')';

export const LITERAL_STRING_BASIC_PATTERN = PUNCTUATOR_DOUBLE_QUOTE_PATTERN + ESCAPED_BASIC_STRING_LITERAL_CHARACTER_PATTERN + '*' + PUNCTUATOR_DOUBLE_QUOTE_PATTERN;

const EIGHT_HEXADECIMAL_CHARACTERS_PATTERN = HEXADECIMAL_CHARACTER_PATTERN + '{8}';
const UNIVERSAL_CHARACTER_NAME_PATTERN = '(?:' + BACKSLASH_CHARACTER_PATTERN + 'u' + FOUR_HEXADECIMAL_CHARACTERS_PATTERN + '|' + BACKSLASH_CHARACTER_PATTERN + 'U' + EIGHT_HEXADECIMAL_CHARACTERS_PATTERN + ')';

// any SDL compatible UCS string literal character or
// a backslash followed by any SDL compatible UCS string literal character or
// an escaped double quote or
// an escaped backslash or
// a u character or
// a U character or
// a universal character name
const ESCAPED_SDL_COMPATIBLE_UCS_STRING_LITERAL_CHARACTER_PATTERN = '(?:' + SDL_COMPATIBLE_UCS_STRING_LITERAL_CHARACTER_PATTERN + '|' +
    BACKSLASH_CHARACTER_PATTERN + '(?:' + SDL_COMPATIBLE_UCS_STRING_LITERAL_CHARACTER_PATTERN + ')|' +
    BACKSLASH_CHARACTER_PATTERN + PUNCTUATOR_DOUBLE_QUOTE_PATTERN + '|' +
    BACKSLASH_CHARACTER_PATTERN + BACKSLASH_CHARACTER_PATTERN + '|' +
    'u|' + 
    'U|' + 
    UNIVERSAL_CHARACTER_NAME_PATTERN + ')';

export const LITERAL_STRING_UTF_PATTERN = ENCODING_PREFIX_UTF_PATTERN + PUNCTUATOR_DOUBLE_QUOTE_PATTERN + ESCAPED_SDL_COMPATIBLE_UCS_STRING_LITERAL_CHARACTER_PATTERN + '*' + PUNCTUATOR_DOUBLE_QUOTE_PATTERN;
