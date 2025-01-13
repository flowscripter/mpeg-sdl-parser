import ElementaryType from "../../../src/abstract_syntax_tree/node/ElementaryType.ts";
import ElementaryTypeKind from "../../../src/abstract_syntax_tree/node/enum/elementary_type_kind.ts";
import Identifier from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import MapDefinition from "../../../src/abstract_syntax_tree/node/MapDefinition.ts";
import { MAP_DEFINITION_RULE } from "../../../src/parser/syntax_rules.ts";
import TokenKind from "../../../src/tokenizer/enum/token_kind.ts";
import SyntaxToken from "../../../src/tokenizer/token/SyntaxToken.ts";
import Trivia from "../../../src/tokenizer/token/TriviaToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

Deno.test("Test map definition pattern - reserved with elementary type output", () => {
  testSyntaxPattern(
    MAP_DEFINITION_RULE,
    "reserved unsigned int(Offsets) offset;",
    new MapDefinition(
      true,
      false,
      new ElementaryType(
        ElementaryTypeKind.UNSIGNED_INTEGER,
        new SyntaxToken(
          TokenKind.KEYWORD_UNSIGNED_TOKEN,
          { row: 0, column: 9, position: 9 },
          "unsigned",
          [],
          [
            new Trivia(TokenKind.WHITESPACE_TOKEN, {
              row: 0,
              column: 17,
              position: 17,
            }, " "),
          ],
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_INT_TOKEN,
          { row: 0, column: 18, position: 18 },
          "int",
          [],
          [],
        ),
      ),
      undefined,
      new Identifier(
        "Offsets",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 22, position: 22 },
          "Offsets",
          [],
          [],
        ),
      ),
      new Identifier(
        "offset",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 31, position: 31 },
          "offset",
          [],
          [],
        ),
      ),
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
        TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
        { row: 0, column: 21, position: 21 },
        "(",
        [],
        [],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
        { row: 0, column: 29, position: 29 },
        ")",
        [],
        [
          new Trivia(TokenKind.WHITESPACE_TOKEN, {
            row: 0,
            column: 30,
            position: 30,
          }, " "),
        ],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
        { row: 0, column: 37, position: 37 },
        ";",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test map definition pattern - legacy with class output", () => {
  testSyntaxPattern(
    MAP_DEFINITION_RULE,
    "legacy B(MapB) b;",
    new MapDefinition(
      false,
      true,
      undefined,
      new Identifier(
        "B",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 7, position: 7 },
          "B",
          [],
          [],
        ),
      ),
      new Identifier(
        "MapB",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 9, position: 9 },
          "MapB",
          [],
          [],
        ),
      ),
      new Identifier(
        "b",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 15, position: 15 },
          "b",
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
        TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
        { row: 0, column: 8, position: 8 },
        "(",
        [],
        [],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
        { row: 0, column: 13, position: 13 },
        ")",
        [],
        [
          new Trivia(TokenKind.WHITESPACE_TOKEN, {
            row: 0,
            column: 14,
            position: 14,
          }, " "),
        ],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
        { row: 0, column: 16, position: 16 },
        ";",
        [],
        [],
      ),
    ),
  );
});
