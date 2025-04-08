import { describe, test } from "bun:test";
import { ArrayElementAccess } from "../../../src/abstract_syntax_tree/node/ArrayElementAccess.ts";
import { ClassMemberAccess } from "../../../src/abstract_syntax_tree/node/ClassMemberAccess.ts";
import { NumberLiteralKind } from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import { PostfixOperatorKind } from "../../../src/abstract_syntax_tree/node/enum/postfix_operator_kind.ts";
import { Identifier } from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import { NumberLiteral } from "../../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import { PostfixExpression } from "../../../src/abstract_syntax_tree/node/PostfixExpression.ts";
import { PrimaryExpression } from "../../../src/abstract_syntax_tree/node/PrimaryExpression.ts";
import { POSTFIX_EXPRESSION_RULE } from "../../../src/parser/syntax_rules.ts";
import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

describe("Postfix Expression Pattern Tests", () => {
  test("Test expression pattern - postfix operator", () => {
    testSyntaxPattern(
      POSTFIX_EXPRESSION_RULE,
      "i++",
      new PostfixExpression(
        new Identifier(
          "i",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            {
              row: 1,
              column: 1,
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
            row: 1,
            column: 2,
            position: 1,
          },
          "++",
          [],
          [],
        ),
      ),
    );
  });

  test("Test postfix expression pattern - class member access expression", () => {
    testSyntaxPattern(
      POSTFIX_EXPRESSION_RULE,
      "a.b",
      new PostfixExpression(
        new Identifier(
          "a",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            {
              row: 1,
              column: 1,
              position: 0,
            },
            "a",
            [],
            [],
          ),
        ),
        undefined,
        new ClassMemberAccess(
          new Identifier(
            "b",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              {
                row: 1,
                column: 3,
                position: 2,
              },
              "b",
              [],
              [],
            ),
          ),
          new SyntaxToken(
            TokenKind.OPERATOR_CLASS_MEMBER_ACCESS_TOKEN,
            {
              row: 1,
              column: 2,
              position: 1,
            },
            ".",
            [],
            [],
          ),
        ),
        undefined,
        undefined,
      ),
    );
  });

  test("Test postfix expression pattern - class member access expression, multiple", () => {
    testSyntaxPattern(
      POSTFIX_EXPRESSION_RULE,
      "a.b.c",
      new PostfixExpression(
        new PostfixExpression(
          new Identifier(
            "a",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              {
                row: 1,
                column: 1,
                position: 0,
              },
              "a",
              [],
              [],
            ),
          ),
          undefined,
          new ClassMemberAccess(
            new Identifier(
              "b",
              new SyntaxToken(
                TokenKind.IDENTIFIER_TOKEN,
                {
                  row: 1,
                  column: 3,
                  position: 2,
                },
                "b",
                [],
                [],
              ),
            ),
            new SyntaxToken(
              TokenKind.OPERATOR_CLASS_MEMBER_ACCESS_TOKEN,
              {
                row: 1,
                column: 2,
                position: 1,
              },
              ".",
              [],
              [],
            ),
          ),
          undefined,
          undefined,
        ),
        undefined,
        new ClassMemberAccess(
          new Identifier(
            "c",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              {
                row: 1,
                column: 5,
                position: 4,
              },
              "c",
              [],
              [],
            ),
          ),
          new SyntaxToken(
            TokenKind.OPERATOR_CLASS_MEMBER_ACCESS_TOKEN,
            {
              row: 1,
              column: 4,
              position: 3,
            },
            ".",
            [],
            [],
          ),
        ),
        undefined,
        undefined,
      ),
    );
  });

  test("Test postfix expression pattern - array element access expression", () => {
    testSyntaxPattern(
      POSTFIX_EXPRESSION_RULE,
      "a[1]",
      new PostfixExpression(
        new Identifier(
          "a",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            {
              row: 1,
              column: 1,
              position: 0,
            },
            "a",
            [],
            [],
          ),
        ),
        new ArrayElementAccess(
          new NumberLiteral(
            NumberLiteralKind.INTEGER,
            1,
            [
              new SyntaxToken(
                TokenKind.LITERAL_INTEGER_TOKEN,
                {
                  row: 1,
                  column: 3,
                  position: 2,
                },
                "1",
                [],
                [],
              ),
            ],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN,
            {
              row: 1,
              column: 2,
              position: 1,
            },
            "[",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN,
            {
              row: 1,
              column: 4,
              position: 3,
            },
            "]",
            [],
            [],
          ),
        ),
        undefined,
        undefined,
        undefined,
      ),
    );
  });

  test("Test postfix expression pattern - array element access expression, multiple", () => {
    testSyntaxPattern(
      POSTFIX_EXPRESSION_RULE,
      "a[1][2]",
      new PostfixExpression(
        new PostfixExpression(
          new Identifier(
            "a",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              {
                row: 1,
                column: 1,
                position: 0,
              },
              "a",
              [],
              [],
            ),
          ),
          new ArrayElementAccess(
            new NumberLiteral(
              NumberLiteralKind.INTEGER,
              1,
              [
                new SyntaxToken(
                  TokenKind.LITERAL_INTEGER_TOKEN,
                  {
                    row: 1,
                    column: 3,
                    position: 2,
                  },
                  "1",
                  [],
                  [],
                ),
              ],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN,
              {
                row: 1,
                column: 2,
                position: 1,
              },
              "[",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN,
              {
                row: 1,
                column: 4,
                position: 3,
              },
              "]",
              [],
              [],
            ),
          ),
          undefined,
          undefined,
          undefined,
        ),
        new ArrayElementAccess(
          new NumberLiteral(
            NumberLiteralKind.INTEGER,
            2,
            [
              new SyntaxToken(
                TokenKind.LITERAL_INTEGER_TOKEN,
                {
                  row: 1,
                  column: 6,
                  position: 5,
                },
                "2",
                [],
                [],
              ),
            ],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN,
            {
              row: 1,
              column: 5,
              position: 4,
            },
            "[",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN,
            {
              row: 1,
              column: 7,
              position: 6,
            },
            "]",
            [],
            [],
          ),
        ),
        undefined,
        undefined,
        undefined,
      ),
    );
  });

  test("Test postfix expression pattern - class member access expression with postfix operator", () => {
    testSyntaxPattern(
      POSTFIX_EXPRESSION_RULE,
      "a.b++",
      new PostfixExpression(
        new PostfixExpression(
          new Identifier(
            "a",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              {
                row: 1,
                column: 1,
                position: 0,
              },
              "a",
              [],
              [],
            ),
          ),
          undefined,
          new ClassMemberAccess(
            new Identifier(
              "b",
              new SyntaxToken(
                TokenKind.IDENTIFIER_TOKEN,
                {
                  row: 1,
                  column: 3,
                  position: 2,
                },
                "b",
                [],
                [],
              ),
            ),
            new SyntaxToken(
              TokenKind.OPERATOR_CLASS_MEMBER_ACCESS_TOKEN,
              {
                row: 1,
                column: 2,
                position: 1,
              },
              ".",
              [],
              [],
            ),
          ),
          undefined,
          undefined,
        ),
        undefined,
        undefined,
        PostfixOperatorKind.POSTFIX_INCREMENT,
        new SyntaxToken(
          TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN,
          {
            row: 1,
            column: 4,
            position: 3,
          },
          "++",
          [],
          [],
        ),
      ),
    );
  });

  test("Test postfix expression pattern - array element access expression with postfix operator", () => {
    testSyntaxPattern(
      POSTFIX_EXPRESSION_RULE,
      "a[1]++",
      new PostfixExpression(
        new PostfixExpression(
          new Identifier(
            "a",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              {
                row: 1,
                column: 1,
                position: 0,
              },
              "a",
              [],
              [],
            ),
          ),
          new ArrayElementAccess(
            new NumberLiteral(
              NumberLiteralKind.INTEGER,
              1,
              [
                new SyntaxToken(
                  TokenKind.LITERAL_INTEGER_TOKEN,
                  {
                    row: 1,
                    column: 3,
                    position: 2,
                  },
                  "1",
                  [],
                  [],
                ),
              ],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN,
              {
                row: 1,
                column: 2,
                position: 1,
              },
              "[",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN,
              {
                row: 1,
                column: 4,
                position: 3,
              },
              "]",
              [],
              [],
            ),
          ),
          undefined,
          undefined,
          undefined,
        ),
        undefined,
        undefined,
        PostfixOperatorKind.POSTFIX_INCREMENT,
        new SyntaxToken(
          TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN,
          {
            row: 1,
            column: 5,
            position: 4,
          },
          "++",
          [],
          [],
        ),
      ),
    );
  });

  test("Test postfix expression pattern - array element access expression", () => {
    testSyntaxPattern(
      POSTFIX_EXPRESSION_RULE,
      "a[1].b",
      new PostfixExpression(
        new PostfixExpression(
          new Identifier(
            "a",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              {
                row: 1,
                column: 1,
                position: 0,
              },
              "a",
              [],
              [],
            ),
          ),
          new ArrayElementAccess(
            new NumberLiteral(
              NumberLiteralKind.INTEGER,
              1,
              [
                new SyntaxToken(
                  TokenKind.LITERAL_INTEGER_TOKEN,
                  {
                    row: 1,
                    column: 3,
                    position: 2,
                  },
                  "1",
                  [],
                  [],
                ),
              ],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN,
              {
                row: 1,
                column: 2,
                position: 1,
              },
              "[",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN,
              {
                row: 1,
                column: 4,
                position: 3,
              },
              "]",
              [],
              [],
            ),
          ),
          undefined,
          undefined,
          undefined,
        ),
        undefined,
        new ClassMemberAccess(
          new Identifier(
            "b",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              {
                row: 1,
                column: 6,
                position: 5,
              },
              "b",
              [],
              [],
            ),
          ),
          new SyntaxToken(
            TokenKind.OPERATOR_CLASS_MEMBER_ACCESS_TOKEN,
            {
              row: 1,
              column: 5,
              position: 4,
            },
            ".",
            [],
            [],
          ),
        ),
        undefined,
        undefined,
      ),
    );
  });

  test("Test postfix expression pattern - class member and array element access expression, multiple mixed", () => {
    testSyntaxPattern(
      POSTFIX_EXPRESSION_RULE,
      "a[1][2].b.c",
      new PostfixExpression(
        new PostfixExpression(
          new PostfixExpression(
            new PostfixExpression(
              new Identifier(
                "a",
                new SyntaxToken(
                  TokenKind.IDENTIFIER_TOKEN,
                  {
                    row: 1,
                    column: 1,
                    position: 0,
                  },
                  "a",
                  [],
                  [],
                ),
              ),
              new ArrayElementAccess(
                new NumberLiteral(
                  NumberLiteralKind.INTEGER,
                  1,
                  [
                    new SyntaxToken(
                      TokenKind.LITERAL_INTEGER_TOKEN,
                      {
                        row: 1,
                        column: 3,
                        position: 2,
                      },
                      "1",
                      [],
                      [],
                    ),
                  ],
                ),
                new SyntaxToken(
                  TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN,
                  {
                    row: 1,
                    column: 2,
                    position: 1,
                  },
                  "[",
                  [],
                  [],
                ),
                new SyntaxToken(
                  TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN,
                  {
                    row: 1,
                    column: 4,
                    position: 3,
                  },
                  "]",
                  [],
                  [],
                ),
              ),
              undefined,
              undefined,
              undefined,
            ),
            new ArrayElementAccess(
              new NumberLiteral(
                NumberLiteralKind.INTEGER,
                2,
                [
                  new SyntaxToken(
                    TokenKind.LITERAL_INTEGER_TOKEN,
                    {
                      row: 1,
                      column: 6,
                      position: 5,
                    },
                    "2",
                    [],
                    [],
                  ),
                ],
              ),
              new SyntaxToken(
                TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN,
                {
                  row: 1,
                  column: 5,
                  position: 4,
                },
                "[",
                [],
                [],
              ),
              new SyntaxToken(
                TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN,
                {
                  row: 1,
                  column: 7,
                  position: 6,
                },
                "]",
                [],
                [],
              ),
            ),
            undefined,
            undefined,
            undefined,
          ),
          undefined,
          new ClassMemberAccess(
            new Identifier(
              "b",
              new SyntaxToken(
                TokenKind.IDENTIFIER_TOKEN,
                {
                  row: 1,
                  column: 9,
                  position: 8,
                },
                "b",
                [],
                [],
              ),
            ),
            new SyntaxToken(
              TokenKind.OPERATOR_CLASS_MEMBER_ACCESS_TOKEN,
              {
                row: 1,
                column: 8,
                position: 7,
              },
              ".",
              [],
              [],
            ),
          ),
          undefined,
          undefined,
        ),
        undefined,
        new ClassMemberAccess(
          new Identifier(
            "c",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              {
                row: 1,
                column: 11,
                position: 10,
              },
              "c",
              [],
              [],
            ),
          ),
          new SyntaxToken(
            TokenKind.OPERATOR_CLASS_MEMBER_ACCESS_TOKEN,
            {
              row: 1,
              column: 10,
              position: 9,
            },
            ".",
            [],
            [],
          ),
        ),
        undefined,
        undefined,
      ),
    );
  });

  test("Test postfix expression pattern - expression in parenthesis with postfix operator and whitespace", () => {
    testSyntaxPattern(
      POSTFIX_EXPRESSION_RULE,
      "( i ) ++",
      new PostfixExpression(
        new PrimaryExpression(
          new Identifier(
            "i",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              {
                row: 1,
                column: 3,
                position: 2,
              },
              "i",
              [],
              [
                new Trivia(
                  TokenKind.WHITESPACE_TOKEN,
                  {
                    row: 1,
                    column: 4,
                    position: 3,
                  },
                  " ",
                ),
              ],
            ),
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
            {
              row: 1,
              column: 1,
              position: 0,
            },
            "(",
            [],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                {
                  row: 1,
                  column: 2,
                  position: 1,
                },
                " ",
              ),
            ],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
            {
              row: 1,
              column: 5,
              position: 4,
            },
            ")",
            [],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                {
                  row: 1,
                  column: 6,
                  position: 5,
                },
                " ",
              ),
            ],
          ),
        ),
        undefined,
        undefined,
        PostfixOperatorKind.POSTFIX_INCREMENT,
        new SyntaxToken(
          TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN,
          {
            row: 1,
            column: 7,
            position: 6,
          },
          "++",
          [],
          [],
        ),
      ),
    );
  });
});
