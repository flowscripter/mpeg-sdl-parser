import { describe, expect, test } from "bun:test";
import { TokenKind } from "../../src/tokenizer/enum/token_kind.ts";
import { SyntaxToken } from "../../src/tokenizer/token/SyntaxToken.ts";
import { Trivia } from "../../src/tokenizer/token/TriviaToken.ts";

describe("Token Tests", () => {
  test("Test token", () => {
    const token = new SyntaxToken(
      TokenKind.IDENTIFIER_TOKEN,
      {
        row: 3,
        column: 1,
        position: 15,
      },
      "foo",
      [
        new Trivia(
          TokenKind.WHITESPACE_TOKEN,
          {
            row: 1,
            column: 1,
            position: 0,
          },
          "  ",
        ),
        new Trivia(
          TokenKind.COMMENT_TOKEN,
          {
            row: 1,
            column: 3,
            position: 2,
          },
          "// comment1",
        ),
        new Trivia(
          TokenKind.WHITESPACE_TOKEN,
          {
            row: 1,
            column: 1,
            position: 0,
          },
          "\n\n",
        ),
      ],
      [
        new Trivia(
          TokenKind.WHITESPACE_TOKEN,
          {
            row: 3,
            column: 4,
            position: 18,
          },
          " ",
        ),
        new Trivia(
          TokenKind.COMMENT_TOKEN,
          {
            row: 3,
            column: 5,
            position: 19,
          },
          "// comment2",
        ),
        new Trivia(
          TokenKind.WHITESPACE_TOKEN,
          {
            row: 3,
            column: 16,
            position: 30,
          },
          " ",
        ),
      ],
    );

    expect(token.text).toEqual("foo");
    expect(token.toString()).toEqual("  // comment1\n\nfoo // comment2 ");
  });
});
