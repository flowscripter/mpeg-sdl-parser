import TokenKind from "../../src/tokenizer/enum/token_kind.ts";
import { assertThrows } from "../test_deps.ts";
import testTokenizer from "./tokenizer_test_helper.ts";

Deno.test("Test whitespace token - 1", () => {
  const input = "\r\n\t";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [
      TokenKind.EOF_TOKEN,
      "",
      [TokenKind.WHITESPACE_TOKEN],
      ["\r\n\t"],
      [],
      [],
    ],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test whitespace token - 2", () => {
  const input = " \r \n ";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [
      TokenKind.EOF_TOKEN,
      "",
      [TokenKind.WHITESPACE_TOKEN],
      [" \r \n "],
      [],
      [],
    ],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test whitespace token - 3", () => {
  const input = " }\n";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [
      TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
      "}",
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
      [],
      [],
    ],
    [
      TokenKind.EOF_TOKEN,
      "",
      [TokenKind.WHITESPACE_TOKEN],
      ["\n"],
      [],
      [],
    ],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - basic", () => {
  const input = "// hello world";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [
      TokenKind.EOF_TOKEN,
      "",
      [TokenKind.COMMENT_TOKEN],
      ["// hello world"],
      [],
      [],
    ],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - escaped tab", () => {
  const input = "// hello\\t world ";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [
      TokenKind.EOF_TOKEN,
      "",
      [TokenKind.COMMENT_TOKEN],
      ["// hello\\t world "],
      [],
      [],
    ],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - tab in comment does not fail tokenization but will cause parsing error as not an SDL compatible UCS character", () => {
  const input = '"hello" // hello\t world';
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [
      TokenKind.LITERAL_STRING_BASIC_TOKEN,
      '"hello"',
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN, TokenKind.COMMENT_TOKEN],
      [" ", "// hello\t world"],
    ],
    [
      TokenKind.EOF_TOKEN,
      "",
      [],
      [],
      [],
      [],
    ],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - escaped tab and line breaks", () => {
  const input = "// hello\\t world \\n\n";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [
      TokenKind.EOF_TOKEN,
      "",
      [TokenKind.COMMENT_TOKEN, TokenKind.WHITESPACE_TOKEN],
      ["// hello\\t world \\n", "\n"],
      [],
      [],
    ],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - trailing whitespace and comment", () => {
  const input = "helloWorld // hello world";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.IDENTIFIER_TOKEN, "helloWorld", [], [], [
      TokenKind.WHITESPACE_TOKEN,
      TokenKind.COMMENT_TOKEN,
    ], [" ", "// hello world"]],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - line break", () => {
  const input = "// hello world \n ";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [
      TokenKind.EOF_TOKEN,
      "",
      [
        TokenKind.COMMENT_TOKEN,
        TokenKind.WHITESPACE_TOKEN,
      ],
      [
        "// hello world ",
        "\n ",
      ],
      [],
      [],
    ],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - comment within a comment", () => {
  const input =
    '// escaped carriage return \\n {} \\" // comment within a comment';
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [
      TokenKind.EOF_TOKEN,
      "",
      [
        TokenKind.COMMENT_TOKEN,
      ],
      [
        '// escaped carriage return \\n {} \\" // comment within a comment',
      ],
      [],
      [],
    ],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - two comments across line break", () => {
  const input = "// hello \n // world";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [
      TokenKind.EOF_TOKEN,
      "",
      [
        TokenKind.COMMENT_TOKEN,
        TokenKind.WHITESPACE_TOKEN,
        TokenKind.COMMENT_TOKEN,
      ],
      [
        "// hello ",
        "\n ",
        "// world",
      ],
      [],
      [],
    ],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - SDL compatible UCS", () => {
  const input = "// π hello ό";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [
      TokenKind.EOF_TOKEN,
      "",
      [
        TokenKind.COMMENT_TOKEN,
      ],
      [
        "// π hello ό",
      ],
      [],
      [],
    ],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - code point escape sequences (which are not parsed when in a comment) for SDL compatible UCS", () => {
  const input = "// π hello ό \\u1234 \\U0001F3DD";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [
      TokenKind.EOF_TOKEN,
      "",
      [
        TokenKind.COMMENT_TOKEN,
      ],
      [
        "// π hello ό \\u1234 \\U0001F3DD",
      ],
      [],
      [],
    ],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment token - code point escape sequences (which are not parsed when in a comment) for non-SDL compatible UCS", () => {
  const input = "// π hello ό \\u0085 \\U00002028";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [
      TokenKind.EOF_TOKEN,
      "",
      [TokenKind.COMMENT_TOKEN],
      ["// π hello ό \\u0085 \\U00002028"],
      [],
      [],
    ],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test comment and identifier tokens with new line", () => {
  const input = "// hello \n helloWorld";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [
      TokenKind.IDENTIFIER_TOKEN,
      "helloWorld",
      [TokenKind.COMMENT_TOKEN, TokenKind.WHITESPACE_TOKEN],
      ["// hello ", "\n "],
      [],
      [],
    ],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test identifier token", () => {
  const input = "helloWorld";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.IDENTIFIER_TOKEN, "helloWorld", [], [], [], []],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test punctuator tokens with and without whitespace", () => {
  let input = "(){}[]:;,";
  let expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN, "(", [], [], [], []],
    [TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN, ")", [], [], [], []],
    [TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN, "{", [], [], [], []],
    [TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN, "}", [], [], [], []],
    [TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN, "[", [], [], [], []],
    [TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN, "]", [], [], [], []],
    [TokenKind.PUNCTUATOR_COLON_TOKEN, ":", [], [], [], []],
    [TokenKind.PUNCTUATOR_SEMICOLON_TOKEN, ";", [], [], [], []],
    [TokenKind.PUNCTUATOR_COMMA_TOKEN, ",", [], [], [], []],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);

  input = "( ) { } [ ] : ; ,";
  expected = [
    [TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN, "(", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
      ")",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
      "{",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
      "}",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN,
      "[",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN,
      "]",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.PUNCTUATOR_COLON_TOKEN,
      ":",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
      ";",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.PUNCTUATOR_COMMA_TOKEN,
      ",",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test keyword tokens", () => {
  const input =
    "abstract aligned base64string bit break case class computed const default do else expandable extends " +
    "float for if int legacy lengthof map reserved switch unsigned utf16string utf8string utf8list utfstring while";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.KEYWORD_ABSTRACT_TOKEN, "abstract", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.KEYWORD_ALIGNED_TOKEN,
      "aligned",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_BASE64STRING_TOKEN,
      "base64string",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_BIT_TOKEN,
      "bit",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_BREAK_TOKEN,
      "break",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_CASE_TOKEN,
      "case",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_CLASS_TOKEN,
      "class",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_COMPUTED_TOKEN,
      "computed",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_CONST_TOKEN,
      "const",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_DEFAULT_TOKEN,
      "default",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_DO_TOKEN,
      "do",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_ELSE_TOKEN,
      "else",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_EXPANDABLE_TOKEN,
      "expandable",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_EXTENDS_TOKEN,
      "extends",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_FLOAT_TOKEN,
      "float",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_FOR_TOKEN,
      "for",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_IF_TOKEN,
      "if",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_INT_TOKEN,
      "int",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_LEGACY_TOKEN,
      "legacy",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_LENGTHOF_TOKEN,
      "lengthof",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_MAP_TOKEN,
      "map",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_RESERVED_TOKEN,
      "reserved",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_SWITCH_TOKEN,
      "switch",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_UNSIGNED_TOKEN,
      "unsigned",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_UTF16STRING_TOKEN,
      "utf16string",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_UTF8STRING_TOKEN,
      "utf8string",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_UTF8LIST_TOKEN,
      "utf8list",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_UTFSTRING_TOKEN,
      "utfstring",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.KEYWORD_WHILE_TOKEN,
      "while",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test operator tokens with and without whitespace", () => {
  // whitespace added where necessary to avoid operator aliasing
  let input = ".++--+-*/%<<>>< <=> >===!=&|&&||..=";
  let expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.OPERATOR_CLASS_MEMBER_ACCESS_TOKEN, ".", [], [], [], []],
    [TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN, "++", [], [], [], []],
    [TokenKind.OPERATOR_POSTFIX_DECREMENT_TOKEN, "--", [], [], [], []],
    [TokenKind.OPERATOR_PLUS_TOKEN, "+", [], [], [], []],
    [TokenKind.OPERATOR_MINUS_TOKEN, "-", [], [], [], []],
    [TokenKind.OPERATOR_MULTIPLY_TOKEN, "*", [], [], [], []],
    [TokenKind.OPERATOR_DIVIDE_TOKEN, "/", [], [], [], []],
    [TokenKind.OPERATOR_MODULUS_TOKEN, "%", [], [], [], []],
    [TokenKind.OPERATOR_SHIFT_LEFT_TOKEN, "<<", [], [], [], []],
    [TokenKind.OPERATOR_SHIFT_RIGHT_TOKEN, ">>", [], [], [], []],
    [TokenKind.OPERATOR_LESS_THAN_TOKEN, "<", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.OPERATOR_LESS_THAN_OR_EQUAL_TOKEN,
      "<=",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.OPERATOR_GREATER_THAN_TOKEN, ">", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.OPERATOR_GREATER_THAN_OR_EQUAL_TOKEN,
      ">=",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.OPERATOR_EQUAL_TOKEN, "==", [], [], [], []],
    [TokenKind.OPERATOR_NOT_EQUAL_TOKEN, "!=", [], [], [], []],
    [TokenKind.OPERATOR_BITWISE_AND_TOKEN, "&", [], [], [], []],
    [TokenKind.OPERATOR_BITWISE_OR_TOKEN, "|", [], [], [], []],
    [TokenKind.OPERATOR_LOGICAL_AND_TOKEN, "&&", [], [], [], []],
    [TokenKind.OPERATOR_LOGICAL_OR_TOKEN, "||", [], [], [], []],
    [TokenKind.OPERATOR_RANGE_TOKEN, "..", [], [], [], []],
    [TokenKind.OPERATOR_ASSIGNMENT_TOKEN, "=", [], [], [], []],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);

  input = ". ++ -- + - * / % << >> < <= > >= == != & | && || .. =";
  expected = [
    [TokenKind.OPERATOR_CLASS_MEMBER_ACCESS_TOKEN, ".", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN,
      "++",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_POSTFIX_DECREMENT_TOKEN,
      "--",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_PLUS_TOKEN,
      "+",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_MINUS_TOKEN,
      "-",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_MULTIPLY_TOKEN,
      "*",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_DIVIDE_TOKEN,
      "/",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_MODULUS_TOKEN,
      "%",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_SHIFT_LEFT_TOKEN,
      "<<",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_SHIFT_RIGHT_TOKEN,
      ">>",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_LESS_THAN_TOKEN,
      "<",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_LESS_THAN_OR_EQUAL_TOKEN,
      "<=",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_GREATER_THAN_TOKEN,
      ">",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_GREATER_THAN_OR_EQUAL_TOKEN,
      ">=",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_EQUAL_TOKEN,
      "==",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_NOT_EQUAL_TOKEN,
      "!=",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_BITWISE_AND_TOKEN,
      "&",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_BITWISE_OR_TOKEN,
      "|",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_LOGICAL_AND_TOKEN,
      "&&",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_LOGICAL_OR_TOKEN,
      "||",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_RANGE_TOKEN,
      "..",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
      "=",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test binary literal tokens", () => {
  const input = "0b0 0b0101 0b010101 0b0101.01 0b0101.0101 0b0101.0101.01";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.LITERAL_BINARY_TOKEN, "0b0", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.LITERAL_BINARY_TOKEN,
      "0b0101",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_BINARY_TOKEN,
      "0b010101",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_BINARY_TOKEN,
      "0b0101.01",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_BINARY_TOKEN,
      "0b0101.0101",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_BINARY_TOKEN,
      "0b0101.0101.01",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test hexadecimal literal tokens", () => {
  const input = "0xA 0xAB01 0xAB01AB 0xAB01.AB 0xAB01.AB01 0xAB01.AB01.AB";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.LITERAL_HEXADECIMAL_TOKEN, "0xA", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.LITERAL_HEXADECIMAL_TOKEN,
      "0xAB01",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_HEXADECIMAL_TOKEN,
      "0xAB01AB",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_HEXADECIMAL_TOKEN,
      "0xAB01.AB",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_HEXADECIMAL_TOKEN,
      "0xAB01.AB01",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_HEXADECIMAL_TOKEN,
      "0xAB01.AB01.AB",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test multiple character literal tokens", () => {
  const input = "'a' 'ABCD'";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.LITERAL_MULTIPLE_CHARACTER_TOKEN, "'a'", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.LITERAL_MULTIPLE_CHARACTER_TOKEN,
      "'ABCD'",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test integer literal tokens", () => {
  const input = "1 123 0";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [
      TokenKind.LITERAL_INTEGER_TOKEN,
      "1",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_INTEGER_TOKEN,
      "123",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_INTEGER_TOKEN,
      "0",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test decimal literal tokens", () => {
  const input = "0.1 1.1";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.LITERAL_DECIMAL_TOKEN, "0.1", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.LITERAL_DECIMAL_TOKEN,
      "1.1",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test floating point tokens", () => {
  const input = "1.1e1 1.1e-1 1.1e+1 1.1e0";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.LITERAL_FLOATING_POINT_TOKEN, "1.1e1", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.LITERAL_FLOATING_POINT_TOKEN,
      "1.1e-1",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_FLOATING_POINT_TOKEN,
      "1.1e+1",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_FLOATING_POINT_TOKEN,
      "1.1e0",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test signed integer literal tokens parsed with separate operator tokens", () => {
  const input = "+1 -123";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.OPERATOR_PLUS_TOKEN, "+", [], [], [], []],
    [
      TokenKind.LITERAL_INTEGER_TOKEN,
      "1",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_MINUS_TOKEN,
      "-",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.LITERAL_INTEGER_TOKEN, "123", [], [], [], []],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test signed integer zero literal tokens parsed with separate operator tokens", () => {
  const input = "+0 -0";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.OPERATOR_PLUS_TOKEN, "+", [], [], [], []],
    [
      TokenKind.LITERAL_INTEGER_TOKEN,
      "0",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_MINUS_TOKEN,
      "-",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.LITERAL_INTEGER_TOKEN, "0", [], [], [], []],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test signed decimal literal tokens parsed with separate operator tokens", () => {
  const input = "+0.1 -0.1 -1.1";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.OPERATOR_PLUS_TOKEN, "+", [], [], [], []],
    [TokenKind.LITERAL_DECIMAL_TOKEN, "0.1", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.OPERATOR_MINUS_TOKEN,
      "-",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.LITERAL_DECIMAL_TOKEN, "0.1", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.OPERATOR_MINUS_TOKEN,
      "-",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.LITERAL_DECIMAL_TOKEN, "1.1", [], [], [], []],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test signed decimal zero literal tokens parsed with separate operator tokens", () => {
  const input = "+0.0 -0.0";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.OPERATOR_PLUS_TOKEN, "+", [], [], [], []],
    [TokenKind.LITERAL_DECIMAL_TOKEN, "0.0", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.OPERATOR_MINUS_TOKEN,
      "-",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.LITERAL_DECIMAL_TOKEN, "0.0", [], [], [], []],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test signed floating point literal tokens parsed with separate operator tokens", () => {
  const input = "+1.1e1 -1.1e-1 -1.1e+1 +0e0 -0e0";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.OPERATOR_PLUS_TOKEN, "+", [], [], [], []],
    [TokenKind.LITERAL_FLOATING_POINT_TOKEN, "1.1e1", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.OPERATOR_MINUS_TOKEN,
      "-",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.LITERAL_FLOATING_POINT_TOKEN, "1.1e-1", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.OPERATOR_MINUS_TOKEN,
      "-",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.LITERAL_FLOATING_POINT_TOKEN, "1.1e+1", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.OPERATOR_PLUS_TOKEN,
      "+",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.LITERAL_FLOATING_POINT_TOKEN, "0e0", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.OPERATOR_MINUS_TOKEN,
      "-",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.LITERAL_FLOATING_POINT_TOKEN, "0e0", [], [], [], []],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test floating point literal tokens with invalid signed zero exponent parsed as separate identifier, operator and literal", () => {
  const input = "0e0 0e+0";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.LITERAL_FLOATING_POINT_TOKEN, "0e0", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.IDENTIFIER_TOKEN,
      "0e",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.OPERATOR_PLUS_TOKEN, "+", [], [], [], []],
    [TokenKind.LITERAL_INTEGER_TOKEN, "0", [], [], [], []],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test string literal tokens", () => {
  const input = '"" "Hello" " " "\\n" "\\\\" "\\"" "world\\\\n" "\\uFEFF"';
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '""', [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.LITERAL_STRING_BASIC_TOKEN,
      '"Hello"',
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_STRING_BASIC_TOKEN,
      '" "',
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_STRING_BASIC_TOKEN,
      '"\\n"',
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_STRING_BASIC_TOKEN,
      '"\\\\"',
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_STRING_BASIC_TOKEN,
      '"\\""',
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_STRING_BASIC_TOKEN,
      '"world\\\\n"',
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_STRING_BASIC_TOKEN,
      '"\\uFEFF"',
      [],
      [],
      [],
      [],
    ],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test string literal tokens ignoring embedded multiple character literal", () => {
  const input = "\"Hello 'abcd'\"";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, "\"Hello 'abcd'\"", [], [], [], []],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test string literal tokens with UTF prefix", () => {
  const input =
    'u"\\u1234" u"\\u03A9" u"\\U0001F3DD" u"\\U00001234" u"basic" u"Hello πό" u"Hello πό \\\\u1234world"';
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.LITERAL_STRING_UTF_TOKEN, 'u"\\u1234"', [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.LITERAL_STRING_UTF_TOKEN,
      'u"\\u03A9"',
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_STRING_UTF_TOKEN,
      'u"\\U0001F3DD"',
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_STRING_UTF_TOKEN,
      'u"\\U00001234"',
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_STRING_UTF_TOKEN,
      'u"basic"',
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_STRING_UTF_TOKEN,
      'u"Hello πό"',
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.LITERAL_STRING_UTF_TOKEN,
      'u"Hello πό \\\\u1234world"',
      [],
      [],
      [],
      [],
    ],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test string literal tokens across line breaks", () => {
  const input = '"Hello" \n "world"';
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '"Hello"', [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.LITERAL_STRING_BASIC_TOKEN,
      '"world"',
      [
        TokenKind.WHITESPACE_TOKEN,
      ],
      [
        "\n ",
      ],
      [],
      [],
    ],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test string literal tokens with non-escaped double quote fails to parse", () => {
  // should treat first two double quotes as empty string, then should fail to parse the third
  const input = '"""';
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '""', [], [], [], []],
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
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '"hello"', [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [
      " ",
    ]],
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
  let expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.IDENTIFIER_TOKEN, "u", [], [], [], []],
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '"\\u12"', [], [], [], []],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);

  // should be 8 hexadecimal characters so this is not recognised as a UTF16 string literal
  input = 'u"\\U000012"';
  expected = [
    [TokenKind.IDENTIFIER_TOKEN, "u", [], [], [], []],
    [TokenKind.LITERAL_STRING_BASIC_TOKEN, '"\\U000012"', [], [], [], []],
    [TokenKind.EOF_TOKEN, "", [], [], [], []],
  ];

  testTokenizer(input, expected);
});

Deno.test("Mixture of tokens", () => {
  const input = "for (i=0; i < size; i++) {\n";
  const expected: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][] = [
    [TokenKind.KEYWORD_FOR_TOKEN, "for", [], [], [TokenKind.WHITESPACE_TOKEN], [
      " ",
    ]],
    [
      TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
      "(",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.IDENTIFIER_TOKEN, "i", [], [], [], []],
    [TokenKind.OPERATOR_ASSIGNMENT_TOKEN, "=", [], [], [], []],
    [TokenKind.LITERAL_INTEGER_TOKEN, "0", [], [], [], []],
    [TokenKind.PUNCTUATOR_SEMICOLON_TOKEN, ";", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.IDENTIFIER_TOKEN,
      "i",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.OPERATOR_LESS_THAN_TOKEN,
      "<",
      [],
      [],
      [TokenKind.WHITESPACE_TOKEN],
      [" "],
    ],
    [
      TokenKind.IDENTIFIER_TOKEN,
      "size",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.PUNCTUATOR_SEMICOLON_TOKEN, ";", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.IDENTIFIER_TOKEN,
      "i",
      [],
      [],
      [],
      [],
    ],
    [TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN, "++", [], [], [], []],
    [TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN, ")", [], [], [
      TokenKind.WHITESPACE_TOKEN,
    ], [" "]],
    [
      TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
      "{",
      [],
      [],
      [],
      [],
    ],
    [
      TokenKind.EOF_TOKEN,
      "",
      [TokenKind.WHITESPACE_TOKEN],
      ["\n"],
      [],
      [],
    ],
  ];

  testTokenizer(input, expected);
});
