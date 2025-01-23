import { AlignedModifier } from "../../../src/abstract_syntax_tree/node/AlignedModifier.ts";
import { ElementaryType } from "../../../src/abstract_syntax_tree/node/ElementaryType.ts";
import { ElementaryTypeDefinition } from "../../../src/abstract_syntax_tree/node/ElementaryTypeDefinition.ts";
import { ElementaryTypeKind } from "../../../src/abstract_syntax_tree/node/enum/elementary_type_kind.ts";
import { NumberLiteralKind } from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import { Identifier } from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import { LengthAttribute } from "../../../src/abstract_syntax_tree/node/LengthAttribute.ts";
import { NumberLiteral } from "../../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import { ELEMENTARY_TYPE_DEFINITION_RULE } from "../../../src/parser/syntax_rules.ts";
import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

Deno.test("Test elementary type definition pattern", () => {
  testSyntaxPattern(
    ELEMENTARY_TYPE_DEFINITION_RULE,
    "int(3) a;",
    new ElementaryTypeDefinition(
      false,
      false,
      false,
      undefined,
      new ElementaryType(
        ElementaryTypeKind.INTEGER,
        undefined,
        new SyntaxToken(
          TokenKind.KEYWORD_INT_TOKEN,
          { row: 0, column: 0, position: 0 },
          "int",
          [],
          [],
        ),
      ),
      new LengthAttribute(
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          3,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              { row: 0, column: 4, position: 4 },
              "3",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          { row: 0, column: 3, position: 3 },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          { row: 0, column: 5, position: 5 },
          ")",
          [],
          [
            new Trivia(TokenKind.WHITESPACE_TOKEN, {
              row: 0,
              column: 6,
              position: 6,
            }, " "),
          ],
        ),
      ),
      false,
      new Identifier(
        "a",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 7, position: 7 },
          "a",
          [],
          [],
        ),
      ),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      new SyntaxToken(
        TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
        { row: 0, column: 8, position: 8 },
        ";",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test elementary type definition pattern - legacy, const, aligned, lookahead, value range", () => {
  testSyntaxPattern(
    ELEMENTARY_TYPE_DEFINITION_RULE,
    "legacy const aligned(8) unsigned int(7)* a=3..i;",
    new ElementaryTypeDefinition(
      false,
      true,
      true,
      new AlignedModifier(
        8,
        false,
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          8,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              { row: 0, column: 21, position: 21 },
              "8",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_ALIGNED_TOKEN,
          { row: 0, column: 13, position: 13 },
          "aligned",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          { row: 0, column: 20, position: 20 },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          { row: 0, column: 22, position: 22 },
          ")",
          [],
          [
            new Trivia(TokenKind.WHITESPACE_TOKEN, {
              row: 0,
              column: 23,
              position: 23,
            }, " "),
          ],
        ),
      ),
      new ElementaryType(
        ElementaryTypeKind.UNSIGNED_INTEGER,
        new SyntaxToken(
          TokenKind.KEYWORD_UNSIGNED_TOKEN,
          { row: 0, column: 24, position: 24 },
          "unsigned",
          [],
          [
            new Trivia(TokenKind.WHITESPACE_TOKEN, {
              row: 0,
              column: 32,
              position: 32,
            }, " "),
          ],
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_INT_TOKEN,
          { row: 0, column: 33, position: 33 },
          "int",
          [],
          [],
        ),
      ),
      new LengthAttribute(
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          7,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              { row: 0, column: 37, position: 37 },
              "7",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          { row: 0, column: 36, position: 36 },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          { row: 0, column: 38, position: 38 },
          ")",
          [],
          [],
        ),
      ),
      true,
      new Identifier(
        "a",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 41, position: 41 },
          "a",
          [],
          [],
        ),
      ),
      new NumberLiteral(NumberLiteralKind.INTEGER, 3, [
        new SyntaxToken(
          TokenKind.LITERAL_INTEGER_TOKEN,
          { row: 0, column: 43, position: 43 },
          "3",
          [],
          [],
        ),
      ]),
      new Identifier(
        "i",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 46, position: 46 },
          "i",
          [],
          [],
        ),
      ),
      undefined,
      new SyntaxToken(
        TokenKind.KEYWORD_LEGACY_TOKEN,
        { row: 0, column: 0, position: 0 },
        "legacy",
        [],
        [
          new Trivia(TokenKind.WHITESPACE_TOKEN, {
            row: 0,
            column: 6,
            position: 6,
          }, " "),
        ],
      ),
      new SyntaxToken(
        TokenKind.KEYWORD_CONST_TOKEN,
        { row: 0, column: 7, position: 7 },
        "const",
        [],
        [
          new Trivia(TokenKind.WHITESPACE_TOKEN, {
            row: 0,
            column: 12,
            position: 12,
          }, " "),
        ],
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_MULTIPLY_TOKEN,
        { row: 0, column: 39, position: 39 },
        "*",
        [],
        [
          new Trivia(
            TokenKind.WHITESPACE_TOKEN,
            {
              column: 40,
              position: 40,
              row: 0,
            },
            " ",
          ),
        ],
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
        { row: 0, column: 42, position: 42 },
        "=",
        [],
        [],
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_RANGE_TOKEN,
        { row: 0, column: 44, position: 44 },
        "..",
        [],
        [],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
        { row: 0, column: 47, position: 47 },
        ";",
        [],
        [],
      ),
    ),
  );
});
