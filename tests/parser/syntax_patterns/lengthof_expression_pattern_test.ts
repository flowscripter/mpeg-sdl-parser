import { describe, test } from "bun:test";
import { Identifier } from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import { LengthOfExpression } from "../../../src/abstract_syntax_tree/node/LengthOfExpression.ts";
import { LENGTHOF_EXPRESSION_RULE } from "../../../src/parser/syntax_rules.ts";
import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

describe("Lengthof Expression Pattern Tests", () => {
  test("Test lengthof expression pattern - lengthof operator", () => {
    testSyntaxPattern(
      LENGTHOF_EXPRESSION_RULE,
      "lengthof(i)",
      new LengthOfExpression(
        new Identifier(
          "i",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            {
              row: 1,
              column: 10,
              position: 9,
            },
            "i",
            [],
            [],
          ),
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_LENGTHOF_TOKEN,
          {
            row: 1,
            column: 1,
            position: 0,
          },
          "lengthof",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          {
            row: 1,
            column: 9,
            position: 8,
          },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          {
            row: 1,
            column: 11,
            position: 10,
          },
          ")",
          [],
          [],
        ),
      ),
    );
  });
});
