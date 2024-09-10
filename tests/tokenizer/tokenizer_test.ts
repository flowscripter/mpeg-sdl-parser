import { assertEquals, assertNotEquals, assertThrows } from "../test_deps.ts";
import Tokenizer from "../../src/tokenizer/tokenizer.ts";
import TokenKind from "../../src/tokenizer/enum/token_kind.ts";

function testTokenizer(
  input: string,
  expectedTokens: [TokenKind, string][],
): void {
  const tokenizer = new Tokenizer();
  let token = tokenizer.parse(input);
  assertNotEquals(token, undefined);

  for (const expectedToken of expectedTokens) {
    assertNotEquals(token, undefined);
    assertEquals(
      token!.kind,
      expectedToken[0],
      `${TokenKind[token!.kind]} != ${TokenKind[expectedToken[0]]}, text: ${
        token!.text
      }`,
    );
    assertEquals(
      token!.text,
      expectedToken[1],
      `${token!.text} != ${expectedToken[1]}`,
    );
    token = token!.next;
  }
  assertEquals(token, undefined);
}

Deno.test("Test whitespace token - 1", () => {
  const input = "\r\n\t";
  const tokenizer = new Tokenizer();
  const token = tokenizer.parse(input);

  assertEquals(token, undefined);
});

Deno.test("Test whitespace token - 2", () => {
  const input = " \r \n ";
  const tokenizer = new Tokenizer();
  const token = tokenizer.parse(input);

  assertEquals(token, undefined);
});

Deno.test("Test comment token - 1", () => {
  const input = "// hello world";
  const expected: [TokenKind, string][] = [
    [TokenKind.COMMENT_TOKEN, "// hello world"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - 2", () => {
  const input = "// hello\t world \n";
  const expected: [TokenKind, string][] = [
    [TokenKind.COMMENT_TOKEN, "// hello\t world "],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - 3", () => {
  const input = "// hello\t world \n\n";
  const expected: [TokenKind, string][] = [
    [TokenKind.COMMENT_TOKEN, "// hello\t world "],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - 4", () => {
  const input = "// hello world \n ";
  const expected: [TokenKind, string][] = [
    [TokenKind.COMMENT_TOKEN, "// hello world "],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - 5", () => {
  const input =
    '// escaped carriage return \\n {} \\" // comment within a comment';
  const expected: [TokenKind, string][] = [
    [
      TokenKind.COMMENT_TOKEN,
      '// escaped carriage return \\n {} \\" // comment within a comment',
    ],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - 6", () => {
  const input = "// hello \n // world";
  const expected: [TokenKind, string][] = [
    [TokenKind.COMMENT_TOKEN, "// hello "],
    [TokenKind.COMMENT_TOKEN, "// world"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - 7", () => {
  // const input = "// hello \nhelloWorld";
  const input = "// hello \n//world";
  const expected: [TokenKind, string][] = [
    [TokenKind.COMMENT_TOKEN, "// hello "],
    [TokenKind.COMMENT_TOKEN, "//world"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test identifier token", () => {
  const input = "helloWorld";
  const expected: [TokenKind, string][] = [
    [TokenKind.IDENTIFIER_TOKEN, "helloWorld"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment and identifier tokens with new line", () => {
  // const input = "// hello \nhelloWorld";
  const input = "// hello \n helloWorld";
  const expected: [TokenKind, string][] = [
    [TokenKind.COMMENT_TOKEN, "// hello "],
    [TokenKind.IDENTIFIER_TOKEN, "helloWorld"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test punctuator tokens with and without whitespace", () => {
  let input = "(){}[]:;,";
  const expected: [TokenKind, string][] = [
    [TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN, "("],
    [TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN, ")"],
    [TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN, "{"],
    [TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN, "}"],
    [TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN, "["],
    [TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN, "]"],
    [TokenKind.PUNCTUATOR_COLON_TOKEN, ":"],
    [TokenKind.PUNCTUATOR_SEMICOLON_TOKEN, ";"],
    [TokenKind.PUNCTUATOR_COMMA_TOKEN, ","],
  ];

  testTokenizer(input, expected);

  input = "( ) { } [ ] : ; ,";

  testTokenizer(input, expected);
});

Deno.test("Test keyword tokens", () => {
  const input =
    "abstract aligned base64string bit break case class const default do else expandable extends " +
    "float for if int lengthof map switch unsigned utf8string utf8list utfstring while";
  const expected: [TokenKind, string][] = [
    [TokenKind.KEYWORD_ABSTRACT_TOKEN, "abstract"],
    [TokenKind.KEYWORD_ALIGNED_TOKEN, "aligned"],
    [TokenKind.KEYWORD_BASE64STRING_TOKEN, "base64string"],
    [TokenKind.KEYWORD_BIT_TOKEN, "bit"],
    [TokenKind.KEYWORD_BREAK_TOKEN, "break"],
    [TokenKind.KEYWORD_CASE_TOKEN, "case"],
    [TokenKind.KEYWORD_CLASS_TOKEN, "class"],
    [TokenKind.KEYWORD_CONST_TOKEN, "const"],
    [TokenKind.KEYWORD_DEFAULT_TOKEN, "default"],
    [TokenKind.KEYWORD_DO_TOKEN, "do"],
    [TokenKind.KEYWORD_ELSE_TOKEN, "else"],
    [TokenKind.KEYWORD_EXPANDABLE_TOKEN, "expandable"],
    [TokenKind.KEYWORD_EXTENDS_TOKEN, "extends"],
    [TokenKind.KEYWORD_FLOAT_TOKEN, "float"],
    [TokenKind.KEYWORD_FOR_TOKEN, "for"],
    [TokenKind.KEYWORD_IF_TOKEN, "if"],
    [TokenKind.KEYWORD_INT_TOKEN, "int"],
    [TokenKind.KEYWORD_LENGTHOF_TOKEN, "lengthof"],
    [TokenKind.KEYWORD_MAP_TOKEN, "map"],
    [TokenKind.KEYWORD_SWITCH_TOKEN, "switch"],
    [TokenKind.KEYWORD_UNSIGNED_TOKEN, "unsigned"],
    [TokenKind.KEYWORD_UTF8STRING_TOKEN, "utf8string"],
    [TokenKind.KEYWORD_UTF8LIST_TOKEN, "utf8list"],
    [TokenKind.KEYWORD_UTFSTRING_TOKEN, "utfstring"],
    [TokenKind.KEYWORD_WHILE_TOKEN, "while"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test operator tokens with and without whitespace", () => {
  // whitespace added where necessary to avoid operator aliasing
  let input = ".++--+-*/%<<>>< <=> >===!=&|&&||..=";
  const expected: [TokenKind, string][] = [
    [TokenKind.OPERATOR_CLASS_MEMBER_ACCESS_TOKEN, "."],
    [TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN, "++"],
    [TokenKind.OPERATOR_POSTFIX_DECREMENT_TOKEN, "--"],
    [TokenKind.OPERATOR_PLUS_TOKEN, "+"],
    [TokenKind.OPERATOR_MINUS_TOKEN, "-"],
    [TokenKind.OPERATOR_MULTIPLY_TOKEN, "*"],
    [TokenKind.OPERATOR_DIVIDE_TOKEN, "/"],
    [TokenKind.OPERATOR_MODULUS_TOKEN, "%"],
    [TokenKind.OPERATOR_SHIFT_LEFT_TOKEN, "<<"],
    [TokenKind.OPERATOR_SHIFT_RIGHT_TOKEN, ">>"],
    [TokenKind.OPERATOR_LESS_THAN_TOKEN, "<"],
    [TokenKind.OPERATOR_LESS_THAN_OR_EQUAL_TOKEN, "<="],
    [TokenKind.OPERATOR_GREATER_THAN_TOKEN, ">"],
    [TokenKind.OPERATOR_GREATER_THAN_OR_EQUAL_TOKEN, ">="],
    [TokenKind.OPERATOR_EQUAL_TOKEN, "=="],
    [TokenKind.OPERATOR_NOT_EQUAL_TOKEN, "!="],
    [TokenKind.OPERATOR_BINARY_AND_TOKEN, "&"],
    [TokenKind.OPERATOR_BINARY_OR_TOKEN, "|"],
    [TokenKind.OPERATOR_LOGICAL_AND_TOKEN, "&&"],
    [TokenKind.OPERATOR_LOGICAL_OR_TOKEN, "||"],
    [TokenKind.OPERATOR_RANGE_TOKEN, ".."],
    [TokenKind.OPERATOR_ASSIGNMENT_TOKEN, "="],
  ];

  testTokenizer(input, expected);

  input = ". ++ -- + - * / % << >> < <= > >= == != & | && || .. =";

  testTokenizer(input, expected);
});

Deno.test("Test binary literal tokens", () => {
  const input = "0b0 0b0101 0b010101 0b0101.01 0b0101.0101 0b0101.0101.01";
  const expected: [TokenKind, string][] = [
    [TokenKind.LITERAL_BINARY_TOKEN, "0b0"],
    [TokenKind.LITERAL_BINARY_TOKEN, "0b0101"],
    [TokenKind.LITERAL_BINARY_TOKEN, "0b010101"],
    [TokenKind.LITERAL_BINARY_TOKEN, "0b0101.01"],
    [TokenKind.LITERAL_BINARY_TOKEN, "0b0101.0101"],
    [TokenKind.LITERAL_BINARY_TOKEN, "0b0101.0101.01"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test hexadecimal literal tokens", () => {
  const input = "0xA 0xAB01 0xAB01AB 0xAB01.AB 0xAB01.AB01 0xAB01.AB01.AB ";
  const expected: [TokenKind, string][] = [
    [TokenKind.LITERAL_HEXADECIMAL_TOKEN, "0xA"],
    [TokenKind.LITERAL_HEXADECIMAL_TOKEN, "0xAB01"],
    [TokenKind.LITERAL_HEXADECIMAL_TOKEN, "0xAB01AB"],
    [TokenKind.LITERAL_HEXADECIMAL_TOKEN, "0xAB01.AB"],
    [TokenKind.LITERAL_HEXADECIMAL_TOKEN, "0xAB01.AB01"],
    [TokenKind.LITERAL_HEXADECIMAL_TOKEN, "0xAB01.AB01.AB"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test integer literal tokens", () => {
  const input = "1 123 0";
  const expected: [TokenKind, string][] = [
    [TokenKind.LITERAL_INTEGER_TOKEN, "1"],
    [TokenKind.LITERAL_INTEGER_TOKEN, "123"],
    [TokenKind.LITERAL_INTEGER_TOKEN, "0"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test decimal literal tokens", () => {
  const input = "0.1 1.1";
  const expected: [TokenKind, string][] = [
    [TokenKind.LITERAL_DECIMAL_TOKEN, "0.1"],
    [TokenKind.LITERAL_DECIMAL_TOKEN, "1.1"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test floating point tokens", () => {
  const input = "1.1e1 1.1e-1";
  const expected: [TokenKind, string][] = [
    [TokenKind.LITERAL_FLOATING_POINT_TOKEN, "1.1e1"],
    [TokenKind.LITERAL_FLOATING_POINT_TOKEN, "1.1e-1"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test integer literal tokens with unary plus and unary negation", () => {
  const input = "+1 -123";
  const expected: [TokenKind, string][] = [
    [TokenKind.OPERATOR_PLUS_TOKEN, "+"],
    [TokenKind.LITERAL_INTEGER_TOKEN, "1"],
    [TokenKind.OPERATOR_MINUS_TOKEN, "-"],
    [TokenKind.LITERAL_INTEGER_TOKEN, "123"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test decimal literal tokens with unary plus and unary negation", () => {
  const input = "+0.1 -1.1";
  const expected: [TokenKind, string][] = [
    [TokenKind.OPERATOR_PLUS_TOKEN, "+"],
    [TokenKind.LITERAL_DECIMAL_TOKEN, "0.1"],
    [TokenKind.OPERATOR_MINUS_TOKEN, "-"],
    [TokenKind.LITERAL_DECIMAL_TOKEN, "1.1"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test integer zero literal tokens with unary plus and unary negation which will be coerced to floating point", () => {
  const input = "+0 -0";
  const expected: [TokenKind, string][] = [
    [TokenKind.OPERATOR_PLUS_TOKEN, "+"],
    [TokenKind.LITERAL_INTEGER_TOKEN, "0"],
    [TokenKind.OPERATOR_MINUS_TOKEN, "-"],
    [TokenKind.LITERAL_INTEGER_TOKEN, "0"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test decimal zero literal tokens with unary plus and unary negation which will be coerced to floating point", () => {
  const input = "+0.0 -0.0";
  const expected: [TokenKind, string][] = [
    [TokenKind.OPERATOR_PLUS_TOKEN, "+"],
    [TokenKind.LITERAL_DECIMAL_TOKEN, "0.0"],
    [TokenKind.OPERATOR_MINUS_TOKEN, "-"],
    [TokenKind.LITERAL_DECIMAL_TOKEN, "0.0"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test floating point tokens with unary plus and unary negation", () => {
  const input = "+1.1e1 -1.1e-1 +0e0 -0e0";
  const expected: [TokenKind, string][] = [
    [TokenKind.OPERATOR_PLUS_TOKEN, "+"],
    [TokenKind.LITERAL_FLOATING_POINT_TOKEN, "1.1e1"],
    [TokenKind.OPERATOR_MINUS_TOKEN, "-"],
    [TokenKind.LITERAL_FLOATING_POINT_TOKEN, "1.1e-1"],
    [TokenKind.OPERATOR_PLUS_TOKEN, "+"],
    [TokenKind.LITERAL_FLOATING_POINT_TOKEN, "0e0"],
    [TokenKind.OPERATOR_MINUS_TOKEN, "-"],
    [TokenKind.LITERAL_FLOATING_POINT_TOKEN, "0e0"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test string literal tokens", () => {
  const input = '"" "Hello" " " "\\n" "\\\\" "\\"" "world\\\\n" "\\uFEFF"';
  const expected: [TokenKind, string][] = [
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '""'],
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '"Hello"'],
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '" "'],
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '"\\n"'],
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '"\\\\"'],
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '"\\""'],
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '"world\\\\n"'],
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '"\\uFEFF"'],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test string literal tokens with UTF8 prefix", () => {
  const input =
    'u8"\\u1234" u8"\\u03A9" u8"\\U0001F3DD" u8"\\U00001234" u8"basic" u8"Hello πό" u8"Hello πό \\\\u1234world"';
  const expected: [TokenKind, string][] = [
    [TokenKind.LITERAL_STRING_UTF8_TOKEN, 'u8"\\u1234"'],
    [TokenKind.LITERAL_STRING_UTF8_TOKEN, 'u8"\\u03A9"'],
    [TokenKind.LITERAL_STRING_UTF8_TOKEN, 'u8"\\U0001F3DD"'],
    [TokenKind.LITERAL_STRING_UTF8_TOKEN, 'u8"\\U00001234"'],
    [TokenKind.LITERAL_STRING_UTF8_TOKEN, 'u8"basic"'],
    [TokenKind.LITERAL_STRING_UTF8_TOKEN, 'u8"Hello πό"'],
    [TokenKind.LITERAL_STRING_UTF8_TOKEN, 'u8"Hello πό \\\\u1234world"'],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test string literal tokens with UTF16 prefix", () => {
  const input =
    'u"\\u1234" u"\\u03A9" u"\\U0001F3DD" u"\\U00001234" u"basic" u"Hello πό" u"Hello πό \\\\u1234world"';
  const expected: [TokenKind, string][] = [
    [TokenKind.LITERAL_STRING_UTF16_TOKEN, 'u"\\u1234"'],
    [TokenKind.LITERAL_STRING_UTF16_TOKEN, 'u"\\u03A9"'],
    [TokenKind.LITERAL_STRING_UTF16_TOKEN, 'u"\\U0001F3DD"'],
    [TokenKind.LITERAL_STRING_UTF16_TOKEN, 'u"\\U00001234"'],
    [TokenKind.LITERAL_STRING_UTF16_TOKEN, 'u"basic"'],
    [TokenKind.LITERAL_STRING_UTF16_TOKEN, 'u"Hello πό"'],
    [TokenKind.LITERAL_STRING_UTF16_TOKEN, 'u"Hello πό \\\\u1234world"'],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test string literal tokens across line breaks", () => {
  const input = '"Hello" \n "world"';
  const expected: [TokenKind, string][] = [
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '"Hello"'],
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '"world"'],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test string literal tokens with non-escaped double quote fails to parse", () => {
  // should treat first two double quotes as empty string, then should fail to parse the third
  const input = '"""';
  const expected: [TokenKind, string][] = [
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '""'],
  ];

  assertThrows(
    () => testTokenizer(input, expected),
    Error,
    "Unable to tokenize the rest of the input",
  );
});

Deno.test("Test string literal tokens with unicode characters in non-unicode literal fails to parse", () => {
  // second literal is considered illegal as not prefixed by u or u8
  const input = '"hello" "πό"';
  const expected: [TokenKind, string][] = [
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '"hello"'],
  ];

  assertThrows(
    () => testTokenizer(input, expected),
    Error,
    "Unable to tokenize the rest of the input",
  );
});

Deno.test("Test string literal tokens with invalid universal character name parses unexpectedly", () => {
  // should be 4 hexadecimal characters so this is not recognised as a UTF16 string literal
  let input = 'u"\\u12"';
  let expected: [TokenKind, string][] = [
    [TokenKind.IDENTIFIER_TOKEN, "u"],
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '"\\u12"'],
  ];

  testTokenizer(input, expected);

  // should be 8 hexadecimal characters so this is not recognised as a UTF16 string literal
  input = 'u"\\U000012"';
  expected = [
    [TokenKind.IDENTIFIER_TOKEN, "u"],
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '"\\U000012"'],
  ];

  testTokenizer(input, expected);
});

Deno.test("Mixture of tokens", () => {
  const input = "for (i=0; i < size; i++) {\n";
  const expected: [TokenKind, string][] = [
    [TokenKind.KEYWORD_FOR_TOKEN, "for"],
    [TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN, "("],
    [TokenKind.IDENTIFIER_TOKEN, "i"],
    [TokenKind.OPERATOR_ASSIGNMENT_TOKEN, "="],
    [TokenKind.LITERAL_INTEGER_TOKEN, "0"],
    [TokenKind.PUNCTUATOR_SEMICOLON_TOKEN, ";"],
    [TokenKind.IDENTIFIER_TOKEN, "i"],
    [TokenKind.OPERATOR_LESS_THAN_TOKEN, "<"],
    [TokenKind.IDENTIFIER_TOKEN, "size"],
    [TokenKind.PUNCTUATOR_SEMICOLON_TOKEN, ";"],
    [TokenKind.IDENTIFIER_TOKEN, "i"],
    [TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN, "++"],
    [TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN, ")"],
    [TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN, "{"],
  ];

  testTokenizer(input, expected);
});
