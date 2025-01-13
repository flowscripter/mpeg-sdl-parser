import { LexicalParserError } from "../../mod.ts";
import ClassDeclaration from "../../src/abstract_syntax_tree/node/ClassDeclaration.ts";
import Identifier from "../../src/abstract_syntax_tree/node/Identifier.ts";
import Specification from "../../src/abstract_syntax_tree/node/Specification.ts";
import Parser from "../../src/parser/Parser.ts";
import TokenKind from "../../src/tokenizer/enum/token_kind.ts";
import SyntaxToken from "../../src/tokenizer/token/SyntaxToken.ts";
import Trivia from "../../src/tokenizer/token/TriviaToken.ts";
import { assertEquals, assertThrows } from "../test_deps.ts";

Deno.test("Test parser", () => {
  const parser = new Parser();

  assertEquals(
    parser.parse("class A {}"),
    new Specification(
      [
        new ClassDeclaration(
          undefined,
          undefined,
          false,
          new Identifier(
            "A",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              {
                row: 0,
                column: 6,
                position: 6,
              },
              "A",
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
          undefined,
          undefined,
          undefined,
          [],
          undefined,
          new SyntaxToken(
            TokenKind.KEYWORD_CLASS_TOKEN,
            {
              row: 0,
              column: 0,
              position: 0,
            },
            "class",
            [],
            [
              new Trivia(TokenKind.WHITESPACE_TOKEN, {
                row: 0,
                column: 5,
                position: 5,
              }, " "),
            ],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
            {
              row: 0,
              column: 8,
              position: 8,
            },
            "{",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
            {
              row: 0,
              column: 9,
              position: 9,
            },
            "}",
            [],
            [],
          ),
        ),
      ],
    ),
  );
});

Deno.test("Test parser - incomplete syntax", () => {
  const parser = new Parser();

  assertThrows(
    () => parser.parse("class A"),
    LexicalParserError,
    "Unable to consume token: <EOF_TOKEN>",
  );
});

Deno.test("Test parser - invalid syntax", () => {
  const parser = new Parser();

  assertThrows(
    () => parser.parse("class A }"),
    LexicalParserError,
    "LEXICAL ERROR: Unable to consume token: }",
  );
});

Deno.test("Test parser - JSON", () => {
  const parser = new Parser();
  const ast = parser.parse("computed int i;");
  const actual = JSON.stringify(ast);
  const expected =
    '{"nodeKind":41,"location":{"position":0,"row":0,"column":0},"globals":[{"nodeKind":15,"location":{"position":0,"row":0,"column":0},"isConst":false,"elementaryType":{"nodeKind":17,"location":{"position":9,"row":0,"column":9},"elementaryTypeKind":0,"typeToken":{"tokenKind":30,"location":{"position":9,"row":0,"column":9},"text":"int","leadingTrivia":[],"trailingTrivia":[{"tokenKind":1,"location":{"position":12,"row":0,"column":12},"text":" "}]}},"identifier":{"nodeKind":25,"location":{"position":13,"row":0,"column":13},"name":"i","token":{"tokenKind":3,"location":{"position":13,"row":0,"column":13},"text":"i","leadingTrivia":[],"trailingTrivia":[]}},"semicolonPunctuatorToken":{"tokenKind":11,"location":{"position":14,"row":0,"column":14},"text":";","leadingTrivia":[],"trailingTrivia":[]},"computedToken":{"tokenKind":20,"location":{"position":0,"row":0,"column":0},"text":"computed","leadingTrivia":[],"trailingTrivia":[{"tokenKind":1,"location":{"position":8,"row":0,"column":8},"text":" "}]}}]}';

  assertEquals(actual, expected);
});
