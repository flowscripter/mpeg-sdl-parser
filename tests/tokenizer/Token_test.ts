import TokenKind from "../../src/tokenizer/enum/token_kind.ts";
import SyntaxToken from "../../src/tokenizer/token/SyntaxToken.ts";
import Trivia from "../../src/tokenizer/token/TriviaToken.ts";
import { assertEquals } from "../test_deps.ts";

Deno.test("Test token", () => {
  const token = new SyntaxToken(
    TokenKind.IDENTIFIER_TOKEN,
    {
      row: 2,
      column: 0,
      position: 15,
    },
    "foo",
    [
      new Trivia(
        TokenKind.WHITESPACE_TOKEN,
        {
          row: 0,
          column: 0,
          position: 0,
        },
        "  ",
      ),
      new Trivia(
        TokenKind.COMMENT_TOKEN,
        {
          row: 0,
          column: 2,
          position: 2,
        },
        "// comment1",
      ),
      new Trivia(
        TokenKind.WHITESPACE_TOKEN,
        {
          row: 0,
          column: 0,
          position: 0,
        },
        "\n\n",
      ),
    ],
    [
      new Trivia(
        TokenKind.WHITESPACE_TOKEN,
        {
          row: 2,
          column: 3,
          position: 18,
        },
        " ",
      ),
      new Trivia(
        TokenKind.COMMENT_TOKEN,
        {
          row: 2,
          column: 4,
          position: 19,
        },
        "// comment2",
      ),
      new Trivia(
        TokenKind.WHITESPACE_TOKEN,
        {
          row: 2,
          column: 15,
          position: 30,
        },
        " ",
      ),
    ],
  );

  assertEquals(token.text, "foo");
  assertEquals(token.toString(), "  // comment1\n\nfoo // comment2 ");
});
