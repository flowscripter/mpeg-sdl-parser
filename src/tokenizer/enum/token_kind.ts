/**
 * Enum representing the different kinds of tokens that can be identified by the tokenizer.
 *
 * @enum {number}
 * @readonly
 */
export enum TokenKind {
  EOF_TOKEN,
  WHITESPACE_TOKEN,
  COMMENT_TOKEN,
  IDENTIFIER_TOKEN,
  PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
  PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
  PUNCTUATOR_OPEN_BRACE_TOKEN,
  PUNCTUATOR_CLOSE_BRACE_TOKEN,
  PUNCTUATOR_OPEN_BRACKET_TOKEN,
  PUNCTUATOR_CLOSE_BRACKET_TOKEN,
  PUNCTUATOR_COLON_TOKEN,
  PUNCTUATOR_SEMICOLON_TOKEN,
  PUNCTUATOR_COMMA_TOKEN,
  KEYWORD_ABSTRACT_TOKEN,
  KEYWORD_ALIGNED_TOKEN,
  KEYWORD_BASE64STRING_TOKEN,
  KEYWORD_BIT_TOKEN,
  KEYWORD_BREAK_TOKEN,
  KEYWORD_CASE_TOKEN,
  KEYWORD_CLASS_TOKEN,
  KEYWORD_COMPUTED_TOKEN,
  KEYWORD_CONST_TOKEN,
  KEYWORD_DEFAULT_TOKEN,
  KEYWORD_DO_TOKEN,
  KEYWORD_ELSE_TOKEN,
  KEYWORD_EXPANDABLE_TOKEN,
  KEYWORD_EXTENDS_TOKEN,
  KEYWORD_FLOAT_TOKEN,
  KEYWORD_FOR_TOKEN,
  KEYWORD_IF_TOKEN,
  KEYWORD_INT_TOKEN,
  KEYWORD_LEGACY_TOKEN,
  KEYWORD_LENGTHOF_TOKEN,
  KEYWORD_MAP_TOKEN,
  KEYWORD_RESERVED_TOKEN,
  KEYWORD_SWITCH_TOKEN,
  KEYWORD_UNSIGNED_TOKEN,
  KEYWORD_UTF16STRING_TOKEN,
  KEYWORD_UTF8STRING_TOKEN,
  KEYWORD_UTF8LIST_TOKEN,
  KEYWORD_UTFSTRING_TOKEN,
  KEYWORD_WHILE_TOKEN,
  OPERATOR_CLASS_MEMBER_ACCESS_TOKEN,
  OPERATOR_POSTFIX_INCREMENT_TOKEN,
  OPERATOR_POSTFIX_DECREMENT_TOKEN,
  OPERATOR_PLUS_TOKEN,
  OPERATOR_MINUS_TOKEN,
  OPERATOR_MULTIPLY_TOKEN,
  OPERATOR_DIVIDE_TOKEN,
  OPERATOR_MODULUS_TOKEN,
  OPERATOR_SHIFT_LEFT_TOKEN,
  OPERATOR_SHIFT_RIGHT_TOKEN,
  OPERATOR_LESS_THAN_TOKEN,
  OPERATOR_LESS_THAN_OR_EQUAL_TOKEN,
  OPERATOR_GREATER_THAN_TOKEN,
  OPERATOR_GREATER_THAN_OR_EQUAL_TOKEN,
  OPERATOR_EQUAL_TOKEN,
  OPERATOR_NOT_EQUAL_TOKEN,
  OPERATOR_BITWISE_AND_TOKEN,
  OPERATOR_BITWISE_OR_TOKEN,
  OPERATOR_LOGICAL_AND_TOKEN,
  OPERATOR_LOGICAL_OR_TOKEN,
  OPERATOR_RANGE_TOKEN,
  OPERATOR_ASSIGNMENT_TOKEN,
  LITERAL_BINARY_TOKEN,
  LITERAL_HEXADECIMAL_TOKEN,
  LITERAL_MULTIPLE_CHARACTER_TOKEN,
  LITERAL_INTEGER_TOKEN,
  LITERAL_DECIMAL_TOKEN,
  LITERAL_FLOATING_POINT_TOKEN,
  LITERAL_STRING_BASIC_TOKEN,
  LITERAL_STRING_UTF_TOKEN,
}
