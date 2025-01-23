import { NumberLiteralKind } from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import { NumberLiteral } from "../../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import { NUMBER_LITERAL_RULE } from "../../../src/parser/syntax_rules.ts";
import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

Deno.test("Test number literal pattern - integer", () => {
  testSyntaxPattern(
    NUMBER_LITERAL_RULE,
    "123",
    new NumberLiteral(
      NumberLiteralKind.INTEGER,
      123,
      [
        new SyntaxToken(
          TokenKind.LITERAL_INTEGER_TOKEN,
          { row: 0, column: 0, position: 0 },
          "123",
          [],
          [],
        ),
      ],
    ),
  );
});

Deno.test("Test number literal pattern - decimal", () => {
  testSyntaxPattern(
    NUMBER_LITERAL_RULE,
    "123.1",
    new NumberLiteral(
      NumberLiteralKind.DECIMAL,
      123.1,
      [
        new SyntaxToken(
          TokenKind.LITERAL_DECIMAL_TOKEN,
          { row: 0, column: 0, position: 0 },
          "123.1",
          [],
          [],
        ),
      ],
    ),
  );
});

Deno.test("Test number literal pattern - floating point", () => {
  testSyntaxPattern(
    NUMBER_LITERAL_RULE,
    "123.1e123",
    new NumberLiteral(
      NumberLiteralKind.FLOATING_POINT,
      123.1e123,
      [
        new SyntaxToken(
          TokenKind.LITERAL_FLOATING_POINT_TOKEN,
          { row: 0, column: 0, position: 0 },
          "123.1e123",
          [],
          [],
        ),
      ],
    ),
  );
});

Deno.test("Test number literal pattern - binary literal", () => {
  testSyntaxPattern(
    NUMBER_LITERAL_RULE,
    "0b11",
    new NumberLiteral(
      NumberLiteralKind.BINARY,
      3,
      [
        new SyntaxToken(
          TokenKind.LITERAL_BINARY_TOKEN,
          { row: 0, column: 0, position: 0 },
          "0b11",
          [],
          [],
        ),
      ],
    ),
  );
});

Deno.test("Test number literal pattern - binary literal with separator", () => {
  testSyntaxPattern(
    NUMBER_LITERAL_RULE,
    "0b0000.101",
    new NumberLiteral(
      NumberLiteralKind.BINARY,
      5,
      [
        new SyntaxToken(
          TokenKind.LITERAL_BINARY_TOKEN,
          { row: 0, column: 0, position: 0 },
          "0b0000.101",
          [],
          [],
        ),
      ],
    ),
  );
});

Deno.test("Test number literal pattern - hexadecimal literal", () => {
  testSyntaxPattern(
    NUMBER_LITERAL_RULE,
    "0x0F",
    new NumberLiteral(
      NumberLiteralKind.HEXADECIMAL,
      15,
      [
        new SyntaxToken(
          TokenKind.LITERAL_HEXADECIMAL_TOKEN,
          { row: 0, column: 0, position: 0 },
          "0x0F",
          [],
          [],
        ),
      ],
    ),
  );
});

Deno.test("Test number literal pattern - hexadecimal literal with separator", () => {
  testSyntaxPattern(
    NUMBER_LITERAL_RULE,
    "0x0000.FF",
    new NumberLiteral(
      NumberLiteralKind.HEXADECIMAL,
      255,
      [
        new SyntaxToken(
          TokenKind.LITERAL_HEXADECIMAL_TOKEN,
          { row: 0, column: 0, position: 0 },
          "0x0000.FF",
          [],
          [],
        ),
      ],
    ),
  );
});

Deno.test("Test number literal pattern - hexadecimal literal with separator, whitespace stripped", () => {
  testSyntaxPattern(
    NUMBER_LITERAL_RULE,
    " 0x0000.FF ",
    new NumberLiteral(
      NumberLiteralKind.HEXADECIMAL,
      255,
      [
        new SyntaxToken(
          TokenKind.LITERAL_HEXADECIMAL_TOKEN,
          { row: 0, column: 1, position: 1 },
          "0x0000.FF",
          [
            new Trivia(
              TokenKind.WHITESPACE_TOKEN,
              {
                row: 0,
                column: 0,
                position: 0,
              },
              " ",
            ),
          ],
          [
            new Trivia(
              TokenKind.WHITESPACE_TOKEN,
              {
                row: 0,
                column: 10,
                position: 10,
              },
              " ",
            ),
          ],
        ),
      ],
    ),
  );
});

Deno.test("Test number literal pattern - multiple character literal", () => {
  testSyntaxPattern(
    NUMBER_LITERAL_RULE,
    "'pasp'",
    new NumberLiteral(
      NumberLiteralKind.MULTIPLE_CHARACTER,
      0x70617370,
      [
        new SyntaxToken(
          TokenKind.LITERAL_MULTIPLE_CHARACTER_TOKEN,
          { row: 0, column: 0, position: 0 },
          "'pasp'",
          [],
          [],
        ),
      ],
    ),
  );
});

Deno.test("Test number literal pattern - multiple character literal with escaping", () => {
  testSyntaxPattern(
    NUMBER_LITERAL_RULE,
    "'pasp\\\\'",
    new NumberLiteral(
      NumberLiteralKind.MULTIPLE_CHARACTER,
      0x6173705C,
      [
        new SyntaxToken(
          TokenKind.LITERAL_MULTIPLE_CHARACTER_TOKEN,
          { row: 0, column: 0, position: 0 },
          "'pasp\\\\'",
          [],
          [],
        ),
      ],
    ),
  );
});

Deno.test("Test number literal pattern - multiple character literal concatenation", () => {
  testSyntaxPattern(
    NUMBER_LITERAL_RULE,
    "'pa' 'sp'",
    new NumberLiteral(
      NumberLiteralKind.MULTIPLE_CHARACTER,
      0x70617370,
      [
        new SyntaxToken(
          TokenKind.LITERAL_MULTIPLE_CHARACTER_TOKEN,
          { row: 0, column: 0, position: 0 },
          "'pa'",
          [],
          [
            new Trivia(
              TokenKind.WHITESPACE_TOKEN,
              {
                row: 0,
                column: 4,
                position: 4,
              },
              " ",
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.LITERAL_MULTIPLE_CHARACTER_TOKEN,
          { row: 0, column: 5, position: 5 },
          "'sp'",
          [],
          [],
        ),
      ],
    ),
  );
});
