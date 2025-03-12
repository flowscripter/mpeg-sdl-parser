import { describe, test } from "bun:test";
import { NumberLiteralKind } from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import { Identifier } from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import { NumberLiteral } from "../../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import { PrimaryExpression } from "../../../src/abstract_syntax_tree/node/PrimaryExpression.ts";
import { PRIMARY_EXPRESSION_RULE } from "../../../src/parser/syntax_rules.ts";
import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

describe("Primary Expression Pattern Tests", () => {
  test("Test primary expression pattern - number literal", () => {
    testSyntaxPattern(
      PRIMARY_EXPRESSION_RULE,
      "1",
      new NumberLiteral(
        NumberLiteralKind.INTEGER,
        1,
        [
          new SyntaxToken(
            TokenKind.LITERAL_INTEGER_TOKEN,
            {
              row: 0,
              column: 0,
              position: 0,
            },
            "1",
            [],
            [],
          ),
        ],
      ),
    );
  });

  test("Test primary expression pattern - number literal in parenthesis", () => {
    testSyntaxPattern(
      PRIMARY_EXPRESSION_RULE,
      "(1)",
      new PrimaryExpression(
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          1,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              {
                row: 0,
                column: 1,
                position: 1,
              },
              "1",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          {
            row: 0,
            column: 0,
            position: 0,
          },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          {
            row: 0,
            column: 2,
            position: 2,
          },
          ")",
          [],
          [],
        ),
      ),
    );
  });

  test("Test primary expression pattern - identifier in parenthesis", () => {
    testSyntaxPattern(
      PRIMARY_EXPRESSION_RULE,
      "(i)",
      new PrimaryExpression(
        new Identifier(
          "i",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            {
              row: 0,
              column: 1,
              position: 1,
            },
            "i",
            [],
            [],
          ),
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          {
            row: 0,
            column: 0,
            position: 0,
          },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          {
            row: 0,
            column: 2,
            position: 2,
          },
          ")",
          [],
          [],
        ),
      ),
    );
  });
});
