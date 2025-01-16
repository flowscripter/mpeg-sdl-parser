import { LexicalParserError } from "../../mod.ts";
import ClassDeclaration from "../../src/abstract_syntax_tree/node/ClassDeclaration.ts";
import Identifier from "../../src/abstract_syntax_tree/node/Identifier.ts";
import Specification from "../../src/abstract_syntax_tree/node/Specification.ts";
import Parser from "../../src/parser/Parser.ts";
import TokenKind from "../../src/tokenizer/enum/token_kind.ts";
import SyntaxToken from "../../src/tokenizer/token/SyntaxToken.ts";
import Trivia from "../../src/tokenizer/token/TriviaToken.ts";
import { assertEquals, assertThrows, path } from "../test_deps.ts";

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
      new SyntaxToken(
        TokenKind.EOF_TOKEN,
        {
          row: 0,
          column: 10,
          position: 10,
        },
        "",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test parser - incomplete syntax", () => {
  const parser = new Parser();

  assertThrows(
    () => parser.parse("class A"),
    LexicalParserError,
    "Unable to consume token: ",
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
    '{"nodeKind":20,"location":{"position":0,"row":0,"column":0},"isComposite":true,"globals":[{"nodeKind":21,"location":{"position":0,"row":0,"column":0},"isComposite":true,"statementKind":2,"isConst":false,"elementaryType":{"nodeKind":7,"location":{"position":9,"row":0,"column":9},"isComposite":false,"elementaryTypeKind":0,"typeToken":{"tokenKind":30,"location":{"position":9,"row":0,"column":9},"text":"int","leadingTrivia":[],"trailingTrivia":[{"tokenKind":1,"location":{"position":12,"row":0,"column":12},"text":" "}]}},"identifier":{"nodeKind":11,"location":{"position":13,"row":0,"column":13},"isComposite":false,"name":"i","token":{"tokenKind":3,"location":{"position":13,"row":0,"column":13},"text":"i","leadingTrivia":[],"trailingTrivia":[]}},"semicolonPunctuatorToken":{"tokenKind":11,"location":{"position":14,"row":0,"column":14},"text":";","leadingTrivia":[],"trailingTrivia":[]},"computedToken":{"tokenKind":20,"location":{"position":0,"row":0,"column":0},"text":"computed","leadingTrivia":[],"trailingTrivia":[{"tokenKind":1,"location":{"position":8,"row":0,"column":8},"text":" "}]}}],"eofToken":{"tokenKind":0,"location":{"position":15,"row":0,"column":15},"text":"","leadingTrivia":[],"trailingTrivia":[]}}';

  assertEquals(actual, expected);
});

Deno.test("Test parser - verbatim output", async () => {
  const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
  const originalSampleSdlSpecification = await Deno.readTextFile(
    path.join(__dirname, "../sample_specifications/sample.sdl"),
  );

  const parser = new Parser();
  const parsedSpecification = parser.parse(originalSampleSdlSpecification);
  let reproducedSampleSdlSpecification = "";

  for (const syntaxToken of parsedSpecification.getSyntaxTokenIterable()) {
    reproducedSampleSdlSpecification += syntaxToken.toString();
  }

  assertEquals(
    reproducedSampleSdlSpecification,
    originalSampleSdlSpecification,
  );
});
