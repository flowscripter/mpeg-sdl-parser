import { ArrayDefinition } from "../../../src/abstract_syntax_tree/node/ArrayDefinition.ts";
import { ArrayElementType } from "../../../src/abstract_syntax_tree/node/ArrayElementType.ts";
import { ElementaryType } from "../../../src/abstract_syntax_tree/node/ElementaryType.ts";
import { ElementaryTypeKind } from "../../../src/abstract_syntax_tree/node/enum/elementary_type_kind.ts";
import { NumberLiteralKind } from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import { ExplicitArrayDimension } from "../../../src/abstract_syntax_tree/node/ExplicitArrayDimension.ts";
import { Identifier } from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import { ImplicitArrayDimension } from "../../../src/abstract_syntax_tree/node/ImplicitArrayDimension.ts";
import { LengthAttribute } from "../../../src/abstract_syntax_tree/node/LengthAttribute.ts";
import { NumberLiteral } from "../../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import { PartialArrayDimension } from "../../../src/abstract_syntax_tree/node/PartialArrayDimension.ts";
import { ARRAY_DEFINITION_RULE } from "../../../src/parser/syntax_rules.ts";
import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

Deno.test("Test array definition pattern", () => {
  testSyntaxPattern(
    ARRAY_DEFINITION_RULE,
    "int(3) a[3];",
    new ArrayDefinition(
      false,
      false,
      undefined,
      new ArrayElementType(
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
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                { row: 0, column: 6, position: 6 },
                " ",
              ),
            ],
          ),
        ),
        undefined,
      ),
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
      [
        new ExplicitArrayDimension(
          new NumberLiteral(
            NumberLiteralKind.INTEGER,
            3,
            [
              new SyntaxToken(
                TokenKind.LITERAL_INTEGER_TOKEN,
                { row: 0, column: 9, position: 9 },
                "3",
                [],
                [],
              ),
            ],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN,
            { row: 0, column: 8, position: 8 },
            "[",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN,
            { row: 0, column: 10, position: 10 },
            "]",
            [],
            [],
          ),
        ),
      ],
      undefined,
      undefined,
      new SyntaxToken(
        TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
        { row: 0, column: 11, position: 11 },
        ";",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test array definition pattern - reserved, multiple dimensions, mixed explicit and partial", () => {
  testSyntaxPattern(
    ARRAY_DEFINITION_RULE,
    "reserved MyClass a[3][[2]];",
    new ArrayDefinition(
      true,
      false,
      undefined,
      new ArrayElementType(
        undefined,
        undefined,
        new Identifier(
          "MyClass",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            { row: 0, column: 9, position: 9 },
            "MyClass",
            [],
            [
              new Trivia(TokenKind.WHITESPACE_TOKEN, {
                row: 0,
                column: 16,
                position: 16,
              }, " "),
            ],
          ),
        ),
      ),
      new Identifier(
        "a",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 17, position: 17 },
          "a",
          [],
          [],
        ),
      ),
      undefined,
      [
        new ExplicitArrayDimension(
          new NumberLiteral(
            NumberLiteralKind.INTEGER,
            3,
            [
              new SyntaxToken(
                TokenKind.LITERAL_INTEGER_TOKEN,
                { row: 0, column: 19, position: 19 },
                "3",
                [],
                [],
              ),
            ],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN,
            { row: 0, column: 18, position: 18 },
            "[",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN,
            { row: 0, column: 20, position: 20 },
            "]",
            [],
            [],
          ),
        ),
        new PartialArrayDimension(
          new NumberLiteral(
            NumberLiteralKind.INTEGER,
            2,
            [
              new SyntaxToken(
                TokenKind.LITERAL_INTEGER_TOKEN,
                { row: 0, column: 23, position: 23 },
                "2",
                [],
                [],
              ),
            ],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN,
            { row: 0, column: 21, position: 21 },
            "[",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN,
            { row: 0, column: 22, position: 22 },
            "[",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN,
            { row: 0, column: 24, position: 24 },
            "]",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN,
            { row: 0, column: 25, position: 25 },
            "]",
            [],
            [],
          ),
        ),
      ],
      new SyntaxToken(
        TokenKind.KEYWORD_RESERVED_TOKEN,
        { row: 0, column: 0, position: 0 },
        "reserved",
        [],
        [
          new Trivia(TokenKind.WHITESPACE_TOKEN, {
            row: 0,
            column: 8,
            position: 8,
          }, " "),
        ],
      ),
      undefined,
      new SyntaxToken(
        TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
        { row: 0, column: 26, position: 26 },
        ";",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test array definition pattern - implicit", () => {
  testSyntaxPattern(
    ARRAY_DEFINITION_RULE,
    "MyClass a[1..3];",
    new ArrayDefinition(
      false,
      false,
      undefined,
      new ArrayElementType(
        undefined,
        undefined,
        new Identifier(
          "MyClass",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            { row: 0, column: 0, position: 0 },
            "MyClass",
            [],
            [
              new Trivia(TokenKind.WHITESPACE_TOKEN, {
                row: 0,
                column: 7,
                position: 7,
              }, " "),
            ],
          ),
        ),
      ),
      new Identifier(
        "a",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 8, position: 8 },
          "a",
          [],
          [],
        ),
      ),
      new ImplicitArrayDimension(
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          1,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              { row: 0, column: 10, position: 10 },
              "1",
              [],
              [],
            ),
          ],
        ),
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          3,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              { row: 0, column: 13, position: 13 },
              "3",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN,
          { row: 0, column: 9, position: 9 },
          "[",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_RANGE_TOKEN,
          { row: 0, column: 11, position: 11 },
          "..",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN,
          { row: 0, column: 14, position: 14 },
          "]",
          [],
          [],
        ),
      ),
      undefined,
      undefined,
      undefined,
      new SyntaxToken(
        TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
        { row: 0, column: 15, position: 15 },
        ";",
        [],
        [],
      ),
    ),
  );
});
