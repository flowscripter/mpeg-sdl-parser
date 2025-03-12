import { describe, expect, test } from "bun:test";
import { AlignedModifier } from "../../../src/abstract_syntax_tree/node/AlignedModifier.ts";
import { NumberLiteralKind } from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import { NumberLiteral } from "../../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import { ALIGNED_MODIFIER_RULE } from "../../../src/parser/syntax_rules.ts";
import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

describe("Aligned Modifier Pattern Tests", () => {
  test("Test aligned modifier pattern - default", () => {
    testSyntaxPattern(
      ALIGNED_MODIFIER_RULE,
      "aligned",
      new AlignedModifier(
        8,
        true,
        undefined,
        new SyntaxToken(
          TokenKind.KEYWORD_ALIGNED_TOKEN,
          {
            row: 0,
            column: 0,
            position: 0,
          },
          "aligned",
          [],
          [],
        ),
      ),
    );
  });

  test("Test aligned modifier pattern - explicit bit count equal to default", () => {
    testSyntaxPattern(
      ALIGNED_MODIFIER_RULE,
      "aligned(8)",
      new AlignedModifier(
        8,
        false,
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          8,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              {
                row: 0,
                column: 8,
                position: 8,
              },
              "8",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_ALIGNED_TOKEN,
          {
            row: 0,
            column: 0,
            position: 0,
          },
          "aligned",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          {
            row: 0,
            column: 7,
            position: 7,
          },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          {
            row: 0,
            column: 9,
            position: 9,
          },
          ")",
          [],
          [],
        ),
      ),
    );
  });

  test("Test aligned modifier pattern - explicit bit count", () => {
    testSyntaxPattern(
      ALIGNED_MODIFIER_RULE,
      "aligned(16)",
      new AlignedModifier(
        16,
        false,
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          16,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              {
                row: 0,
                column: 8,
                position: 8,
              },
              "16",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_ALIGNED_TOKEN,
          {
            row: 0,
            column: 0,
            position: 0,
          },
          "aligned",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          {
            row: 0,
            column: 7,
            position: 7,
          },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          {
            row: 0,
            column: 10,
            position: 10,
          },
          ")",
          [],
          [],
        ),
      ),
    );
  });

  test("Test aligned modifier pattern - whitespace stripped", () => {
    testSyntaxPattern(
      ALIGNED_MODIFIER_RULE,
      " aligned ( 16 ) ",
      new AlignedModifier(
        16,
        false,
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          16,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              {
                row: 0,
                column: 11,
                position: 11,
              },
              "16",
              [],
              [
                new Trivia(
                  TokenKind.WHITESPACE_TOKEN,
                  {
                    row: 0,
                    column: 13,
                    position: 13,
                  },
                  " ",
                ),
              ],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_ALIGNED_TOKEN,
          {
            row: 0,
            column: 1,
            position: 1,
          },
          "aligned",
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
                column: 8,
                position: 8,
              },
              " ",
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          {
            row: 0,
            column: 9,
            position: 9,
          },
          "(",
          [],
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
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          {
            row: 0,
            column: 14,
            position: 14,
          },
          ")",
          [],
          [
            new Trivia(
              TokenKind.WHITESPACE_TOKEN,
              {
                row: 0,
                column: 15,
                position: 15,
              },
              " ",
            ),
          ],
        ),
      ),
    );
  });

  test("Test aligned modifier pattern - illegal value fails to parse", () => {
    expect(() =>
      testSyntaxPattern(
        ALIGNED_MODIFIER_RULE,
        "aligned(17)",
        new AlignedModifier(
          17,
          false,
          new NumberLiteral(
            NumberLiteralKind.INTEGER,
            16,
            [
              new SyntaxToken(
                TokenKind.LITERAL_INTEGER_TOKEN,
                {
                  row: 0,
                  column: 11,
                  position: 11,
                },
                "17",
                [],
                [],
              ),
            ],
          ),
          new SyntaxToken(
            TokenKind.KEYWORD_ALIGNED_TOKEN,
            {
              row: 0,
              column: 0,
              position: 0,
            },
            "aligned",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
            {
              row: 0,
              column: 9,
              position: 9,
            },
            "(",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
            {
              row: 0,
              column: 14,
              position: 14,
            },
            ")",
            [],
            [],
          ),
        ),
      )
    ).toThrow(
      "Illegal aligned bit count",
    );
  });
});
