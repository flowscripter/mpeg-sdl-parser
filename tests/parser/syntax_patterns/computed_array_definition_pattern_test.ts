import { describe, test } from "bun:test";
import { ComputedArrayDefinition } from "../../../src/abstract_syntax_tree/node/ComputedArrayDefinition.ts";
import { ElementaryType } from "../../../src/abstract_syntax_tree/node/ElementaryType.ts";
import { ElementaryTypeKind } from "../../../src/abstract_syntax_tree/node/enum/elementary_type_kind.ts";
import { NumberLiteralKind } from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import { ExplicitArrayDimension } from "../../../src/abstract_syntax_tree/node/ExplicitArrayDimension.ts";
import { Identifier } from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import { NumberLiteral } from "../../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import { COMPUTED_ARRAY_DEFINITION_RULE } from "../../../src/parser/syntax_rules.ts";
import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

describe("Computed Array Definition Pattern Tests", () => {
  test("Test computed array definition pattern", () => {
    testSyntaxPattern(
      COMPUTED_ARRAY_DEFINITION_RULE,
      "computed int a[3];",
      new ComputedArrayDefinition(
        new ElementaryType(
          ElementaryTypeKind.INTEGER,
          undefined,
          new SyntaxToken(
            TokenKind.KEYWORD_INT_TOKEN,
            { row: 0, column: 9, position: 9 },
            "int",
            [],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                { row: 0, column: 12, position: 12 },
                " ",
              ),
            ],
          ),
        ),
        new Identifier(
          "a",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            { row: 0, column: 13, position: 13 },
            "a",
            [],
            [],
          ),
        ),
        [
          new ExplicitArrayDimension(
            new NumberLiteral(
              NumberLiteralKind.INTEGER,
              3,
              [
                new SyntaxToken(
                  TokenKind.LITERAL_INTEGER_TOKEN,
                  { row: 0, column: 15, position: 15 },
                  "3",
                  [],
                  [],
                ),
              ],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN,
              { row: 0, column: 14, position: 14 },
              "[",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN,
              { row: 0, column: 16, position: 16 },
              "]",
              [],
              [],
            ),
          ),
        ],
        new SyntaxToken(
          TokenKind.KEYWORD_COMPUTED_TOKEN,
          { row: 0, column: 0, position: 0 },
          "computed",
          [],
          [
            new Trivia(
              TokenKind.WHITESPACE_TOKEN,
              { row: 0, column: 8, position: 8 },
              " ",
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
          { row: 0, column: 17, position: 17 },
          ";",
          [],
          [],
        ),
      ),
    );
  });
});
