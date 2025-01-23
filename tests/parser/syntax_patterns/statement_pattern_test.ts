import { CompoundStatement } from "../../../src/abstract_syntax_tree/node/CompoundStatement.ts";
import { PostfixOperatorKind } from "../../../src/abstract_syntax_tree/node/enum/postfix_operator_kind.ts";
import { StringVariableKind } from "../../../src/abstract_syntax_tree/node/enum/string_variable_kind.ts";
import { ExpressionStatement } from "../../../src/abstract_syntax_tree/node/ExpressionStatement.ts";
import { Identifier } from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import { PostfixExpression } from "../../../src/abstract_syntax_tree/node/PostfixExpression.ts";
import { StringDefinition } from "../../../src/abstract_syntax_tree/node/StringDefinition.ts";
import { STATEMENT_RULE } from "../../../src/parser/syntax_rules.ts";
import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

Deno.test("Test statement pattern - string definition", () => {
  testSyntaxPattern(
    STATEMENT_RULE,
    "utf8string foo;",
    new StringDefinition(
      false,
      false,
      false,
      undefined,
      StringVariableKind.UTF8,
      new Identifier(
        "foo",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          {
            row: 0,
            column: 11,
            position: 11,
          },
          "foo",
          [],
          [],
        ),
      ),
      undefined,
      undefined,
      undefined,
      undefined,
      new SyntaxToken(
        TokenKind.KEYWORD_UTF8STRING_TOKEN,
        {
          row: 0,
          column: 0,
          position: 0,
        },
        "utf8string",
        [],
        [
          new Trivia(
            TokenKind.WHITESPACE_TOKEN,
            {
              row: 0,
              column: 10,
              position: 10,
            },
            " ",
          ),
        ],
      ),
      undefined,
      new SyntaxToken(
        TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
        {
          row: 0,
          column: 14,
          position: 14,
        },
        ";",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test statement pattern - expression statement", () => {
  testSyntaxPattern(
    STATEMENT_RULE,
    "i++;",
    new ExpressionStatement(
      new PostfixExpression(
        new Identifier(
          "i",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            {
              row: 0,
              column: 0,
              position: 0,
            },
            "i",
            [],
            [],
          ),
        ),
        undefined,
        undefined,
        PostfixOperatorKind.POSTFIX_INCREMENT,
        new SyntaxToken(
          TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN,
          {
            row: 0,
            column: 1,
            position: 1,
          },
          "++",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
        {
          row: 0,
          column: 3,
          position: 3,
        },
        ";",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test statement pattern - compound statement", () => {
  testSyntaxPattern(
    STATEMENT_RULE,
    "{utf8string foo;utf8string bar;}",
    new CompoundStatement(
      [
        new StringDefinition(
          false,
          false,
          false,
          undefined,
          StringVariableKind.UTF8,
          new Identifier(
            "foo",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              {
                row: 0,
                column: 12,
                position: 12,
              },
              "foo",
              [],
              [],
            ),
          ),
          undefined,
          undefined,
          undefined,
          undefined,
          new SyntaxToken(
            TokenKind.KEYWORD_UTF8STRING_TOKEN,
            {
              row: 0,
              column: 1,
              position: 1,
            },
            "utf8string",
            [],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                {
                  row: 0,
                  column: 11,
                  position: 11,
                },
                " ",
              ),
            ],
          ),
          undefined,
          new SyntaxToken(
            TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
            {
              row: 0,
              column: 15,
              position: 15,
            },
            ";",
            [],
            [],
          ),
        ),
        new StringDefinition(
          false,
          false,
          false,
          undefined,
          StringVariableKind.UTF8,
          new Identifier(
            "bar",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              {
                row: 0,
                column: 27,
                position: 27,
              },
              "bar",
              [],
              [],
            ),
          ),
          undefined,
          undefined,
          undefined,
          undefined,
          new SyntaxToken(
            TokenKind.KEYWORD_UTF8STRING_TOKEN,
            {
              row: 0,
              column: 16,
              position: 16,
            },
            "utf8string",
            [],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                {
                  row: 0,
                  column: 26,
                  position: 26,
                },
                " ",
              ),
            ],
          ),
          undefined,
          new SyntaxToken(
            TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
            {
              row: 0,
              column: 30,
              position: 30,
            },
            ";",
            [],
            [],
          ),
        ),
      ],
      new SyntaxToken(
        TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
        {
          row: 0,
          column: 0,
          position: 0,
        },
        "{",
        [],
        [],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
        {
          row: 0,
          column: 31,
          position: 31,
        },
        "}",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test statement pattern - nested compound statements", () => {
  testSyntaxPattern(
    STATEMENT_RULE,
    "{utf8string foo;{ utf8string bar1;utf8string bar2;}}",
    new CompoundStatement(
      [
        new StringDefinition(
          false,
          false,
          false,
          undefined,
          StringVariableKind.UTF8,
          new Identifier(
            "foo",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              {
                row: 0,
                column: 12,
                position: 12,
              },
              "foo",
              [],
              [],
            ),
          ),
          undefined,
          undefined,
          undefined,
          undefined,
          new SyntaxToken(
            TokenKind.KEYWORD_UTF8STRING_TOKEN,
            {
              row: 0,
              column: 1,
              position: 1,
            },
            "utf8string",
            [],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                {
                  row: 0,
                  column: 11,
                  position: 11,
                },
                " ",
              ),
            ],
          ),
          undefined,
          new SyntaxToken(
            TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
            {
              row: 0,
              column: 15,
              position: 15,
            },
            ";",
            [],
            [],
          ),
        ),
        new CompoundStatement(
          [
            new StringDefinition(
              false,
              false,
              false,
              undefined,
              StringVariableKind.UTF8,
              new Identifier(
                "bar1",
                new SyntaxToken(
                  TokenKind.IDENTIFIER_TOKEN,
                  {
                    row: 0,
                    column: 29,
                    position: 29,
                  },
                  "bar1",
                  [],
                  [],
                ),
              ),
              undefined,
              undefined,
              undefined,
              undefined,
              new SyntaxToken(
                TokenKind.KEYWORD_UTF8STRING_TOKEN,
                {
                  row: 0,
                  column: 18,
                  position: 18,
                },
                "utf8string",
                [],
                [
                  new Trivia(
                    TokenKind.WHITESPACE_TOKEN,
                    {
                      row: 0,
                      column: 28,
                      position: 28,
                    },
                    " ",
                  ),
                ],
              ),
              undefined,
              new SyntaxToken(
                TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
                {
                  row: 0,
                  column: 33,
                  position: 33,
                },
                ";",
                [],
                [],
              ),
            ),
            new StringDefinition(
              false,
              false,
              false,
              undefined,
              StringVariableKind.UTF8,
              new Identifier(
                "bar2",
                new SyntaxToken(
                  TokenKind.IDENTIFIER_TOKEN,
                  {
                    row: 0,
                    column: 45,
                    position: 45,
                  },
                  "bar2",
                  [],
                  [],
                ),
              ),
              undefined,
              undefined,
              undefined,
              undefined,
              new SyntaxToken(
                TokenKind.KEYWORD_UTF8STRING_TOKEN,
                {
                  row: 0,
                  column: 34,
                  position: 34,
                },
                "utf8string",
                [],
                [
                  new Trivia(
                    TokenKind.WHITESPACE_TOKEN,
                    {
                      row: 0,
                      column: 44,
                      position: 44,
                    },
                    " ",
                  ),
                ],
              ),
              undefined,
              new SyntaxToken(
                TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
                {
                  row: 0,
                  column: 49,
                  position: 49,
                },
                ";",
                [],
                [],
              ),
            ),
          ],
          new SyntaxToken(
            TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
            {
              row: 0,
              column: 16,
              position: 16,
            },
            "{",
            [],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                {
                  row: 0,
                  column: 17,
                  position: 17,
                },
                " ",
              ),
            ],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
            {
              row: 0,
              column: 50,
              position: 50,
            },
            "}",
            [],
            [],
          ),
        ),
      ],
      new SyntaxToken(
        TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
        {
          row: 0,
          column: 0,
          position: 0,
        },
        "{",
        [],
        [],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
        {
          row: 0,
          column: 51,
          position: 51,
        },
        "}",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test statement pattern - compound statement with commented statement", () => {
  testSyntaxPattern(
    STATEMENT_RULE,
    "{ \n utf8string bar; // bar\n }",
    new CompoundStatement(
      [
        new StringDefinition(
          false,
          false,
          false,
          undefined,
          StringVariableKind.UTF8,
          new Identifier(
            "bar",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              {
                row: 1,
                column: 12,
                position: 15,
              },
              "bar",
              [],
              [],
            ),
          ),
          undefined,
          undefined,
          undefined,
          undefined,
          new SyntaxToken(
            TokenKind.KEYWORD_UTF8STRING_TOKEN,
            {
              row: 1,
              column: 1,
              position: 4,
            },
            "utf8string",
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                {
                  row: 0,
                  column: 2,
                  position: 2,
                },
                "\n ",
              ),
            ],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                {
                  row: 1,
                  column: 11,
                  position: 14,
                },
                " ",
              ),
            ],
          ),
          undefined,
          new SyntaxToken(
            TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
            {
              row: 1,
              column: 15,
              position: 18,
            },
            ";",
            [],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                {
                  row: 1,
                  column: 16,
                  position: 19,
                },
                " ",
              ),
              new Trivia(
                TokenKind.COMMENT_TOKEN,
                {
                  row: 1,
                  column: 17,
                  position: 20,
                },
                "// bar",
              ),
            ],
          ),
        ),
      ],
      new SyntaxToken(
        TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
        {
          row: 0,
          column: 0,
          position: 0,
        },
        "{",
        [],
        [
          new Trivia(
            TokenKind.WHITESPACE_TOKEN,
            {
              row: 0,
              column: 1,
              position: 1,
            },
            " ",
          ),
        ],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
        {
          row: 2,
          column: 1,
          position: 28,
        },
        "}",
        [
          new Trivia(
            TokenKind.WHITESPACE_TOKEN,
            {
              row: 1,
              column: 23,
              position: 26,
            },
            "\n ",
          ),
        ],
        [],
      ),
    ),
  );
});
