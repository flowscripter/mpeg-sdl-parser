import { SyntacticParserError } from "../../../mod.ts";
import ClassDefinition from "../../../src/abstract_syntax_tree/node/ClassDefinition.ts";
import NumberLiteralKind from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import Identifier from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import NumberLiteral from "../../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import ParameterValueList from "../../../src/abstract_syntax_tree/node/ParameterValueList.ts";
import { CLASS_DEFINITION_RULE } from "../../../src/parser/syntax_rules.ts";
import TokenKind from "../../../src/tokenizer/enum/token_kind.ts";
import SyntaxToken from "../../../src/tokenizer/token/SyntaxToken.ts";
import Trivia from "../../../src/tokenizer/token/TriviaToken.ts";
import { assertThrows } from "../../test_deps.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

Deno.test("Test class definition pattern", () => {
  testSyntaxPattern(
    CLASS_DEFINITION_RULE,
    "ClassA a;",
    new ClassDefinition(
      false,
      new Identifier(
        "ClassA",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 0, position: 0 },
          "ClassA",
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

Deno.test("Test class definition pattern - legacy and one parameter value", () => {
  testSyntaxPattern(
    CLASS_DEFINITION_RULE,
    "legacy ClassB b(3);",
    new ClassDefinition(
      true,
      new Identifier(
        "ClassB",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 7, position: 7 },
          "ClassB",
          [],
          [
            new Trivia(TokenKind.WHITESPACE_TOKEN, {
              row: 0,
              column: 13,
              position: 13,
            }, " "),
          ],
        ),
      ),
      new Identifier(
        "b",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 14, position: 14 },
          "b",
          [],
          [],
        ),
      ),
      new ParameterValueList(
        [
          new NumberLiteral(NumberLiteralKind.INTEGER, 3, [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              { row: 0, column: 16, position: 16 },
              "3",
              [],
              [],
            ),
          ]),
        ],
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          { row: 0, column: 15, position: 15 },
          "(",
          [],
          [],
        ),
        undefined,
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          { row: 0, column: 17, position: 17 },
          ")",
          [],
          [],
        ),
      ),
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
        TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
        { row: 0, column: 18, position: 18 },
        ";",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test class definition pattern - multiple parameter values", () => {
  testSyntaxPattern(
    CLASS_DEFINITION_RULE,
    "ClassC c(i, 3);",
    new ClassDefinition(
      false,
      new Identifier(
        "ClassC",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 0, position: 0 },
          "ClassC",
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
      new Identifier(
        "c",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 7, position: 7 },
          "c",
          [],
          [],
        ),
      ),
      new ParameterValueList(
        [
          new Identifier(
            "i",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              { row: 0, column: 9, position: 9 },
              "i",
              [],
              [],
            ),
          ),
          new NumberLiteral(NumberLiteralKind.INTEGER, 3, [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              { row: 0, column: 12, position: 12 },
              "3",
              [],
              [],
            ),
          ]),
        ],
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          { row: 0, column: 8, position: 8 },
          "(",
          [],
          [],
        ),
        [
          new SyntaxToken(
            TokenKind.PUNCTUATOR_COMMA_TOKEN,
            { row: 0, column: 10, position: 10 },
            ",",
            [],
            [
              new Trivia(TokenKind.WHITESPACE_TOKEN, {
                row: 0,
                column: 11,
                position: 11,
              }, " "),
            ],
          ),
        ],
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          { row: 0, column: 13, position: 13 },
          ")",
          [],
          [],
        ),
      ),
      undefined,
      new SyntaxToken(
        TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
        { row: 0, column: 14, position: 14 },
        ";",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test class definitionx pattern - no parameter values in parenthesis fails to parse", () => {
  assertThrows(
    () =>
      testSyntaxPattern(
        CLASS_DEFINITION_RULE,
        "ClassD d();",
        new ClassDefinition(
          false,
          new Identifier(
            "ClassD",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              { row: 0, column: 0, position: 0 },
              "ClassD",
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
          new Identifier(
            "d",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              { row: 0, column: 7, position: 7 },
              "d",
              [],
              [],
            ),
          ),
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
      ),
    SyntacticParserError,
    "SYNTACTIC ERROR: Empty parameter value list",
  );
});

Deno.test("Test class definition pattern - trailing comma in parameter values fails to parse", () => {
  assertThrows(
    () =>
      testSyntaxPattern(
        CLASS_DEFINITION_RULE,
        "ClassD d(3,);",
        new ClassDefinition(
          false,
          new Identifier(
            "ClassD",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              { row: 0, column: 0, position: 0 },
              "ClassD",
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
          new Identifier(
            "d",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              { row: 0, column: 7, position: 7 },
              "d",
              [],
              [],
            ),
          ),
          new ParameterValueList(
            [
              new NumberLiteral(NumberLiteralKind.INTEGER, 3, [
                new SyntaxToken(
                  TokenKind.LITERAL_INTEGER_TOKEN,
                  { row: 0, column: 9, position: 9 },
                  "3",
                  [],
                  [],
                ),
              ]),
            ],
            new SyntaxToken(
              TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
              { row: 0, column: 8, position: 8 },
              "(",
              [],
              [],
            ),
            [
              new SyntaxToken(
                TokenKind.PUNCTUATOR_COMMA_TOKEN,
                { row: 9, column: 10, position: 10 },
                ",",
                [],
                [],
              ),
            ],
            new SyntaxToken(
              TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
              { row: 0, column: 11, position: 11 },
              ")",
              [],
              [],
            ),
          ),
          undefined,
          new SyntaxToken(
            TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
            { row: 0, column: 12, position: 12 },
            ";",
            [],
            [],
          ),
        ),
      ),
    SyntacticParserError,
    "SYNTACTIC ERROR: Trailing comma in parameter value list",
  );
});
