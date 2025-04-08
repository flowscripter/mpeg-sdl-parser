import { describe, test } from "bun:test";
import { Identifier } from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import { IDENTIFIER_RULE } from "../../../src/parser/syntax_rules.ts";
import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

describe("Identifier Pattern Tests", () => {
  test("Test identifier pattern", () => {
    testSyntaxPattern(
      IDENTIFIER_RULE,
      "foobar",
      new Identifier(
        "foobar",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 1, column: 1, position: 0 },
          "foobar",
          [],
          [],
        ),
      ),
    );
  });

  test("Test identifier pattern - whitespace stripped", () => {
    testSyntaxPattern(
      IDENTIFIER_RULE,
      " foobar ",
      new Identifier(
        "foobar",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 1, column: 2, position: 1 },
          "foobar",
          [
            new Trivia(
              TokenKind.WHITESPACE_TOKEN,
              {
                row: 1,
                column: 1,
                position: 0,
              },
              " ",
            ),
          ],
          [
            new Trivia(
              TokenKind.WHITESPACE_TOKEN,
              {
                row: 1,
                column: 8,
                position: 7,
              },
              " ",
            ),
          ],
        ),
      ),
    );
  });
});
