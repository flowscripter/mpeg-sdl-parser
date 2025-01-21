import {
  default as BinaryExpression,
  default as Expression,
} from "../../../src/abstract_syntax_tree/node/BinaryExpression.ts";
import BinaryOperatorKind from "../../../src/abstract_syntax_tree/node/enum/binary_operator_kind.ts";
import NumberLiteralKind from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import PostfixOperatorKind from "../../../src/abstract_syntax_tree/node/enum/postfix_operator_kind.ts";
import UnaryOperatorKind from "../../../src/abstract_syntax_tree/node/enum/unary_operator_kind.ts";
import Identifier from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import LengthOfExpression from "../../../src/abstract_syntax_tree/node/LengthOfExpression.ts";
import NumberLiteral from "../../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import PostfixExpression from "../../../src/abstract_syntax_tree/node/PostfixExpression.ts";
import PrimaryExpression from "../../../src/abstract_syntax_tree/node/PrimaryExpression.ts";
import UnaryExpression from "../../../src/abstract_syntax_tree/node/UnaryExpression.ts";
import { EXPRESSION_RULE } from "../../../src/parser/syntax_rules.ts";
import TokenKind from "../../../src/tokenizer/enum/token_kind.ts";
import SyntaxToken from "../../../src/tokenizer/token/SyntaxToken.ts";
import Trivia from "../../../src/tokenizer/token/TriviaToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

Deno.test("Test binary expression pattern - multiplication of two literals", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "1*2",
    new Expression(
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
      BinaryOperatorKind.MULTIPLY,
      new NumberLiteral(
        NumberLiteralKind.INTEGER,
        2,
        [
          new SyntaxToken(
            TokenKind.LITERAL_INTEGER_TOKEN,
            {
              row: 0,
              column: 2,
              position: 2,
            },
            "2",
            [],
            [],
          ),
        ],
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_MULTIPLY_TOKEN,
        {
          row: 0,
          column: 1,
          position: 1,
        },
        "*",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - multiplication of two literals with unary operators", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "+1*-2",
    new Expression(
      new UnaryExpression(
        UnaryOperatorKind.UNARY_PLUS,
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
          TokenKind.OPERATOR_PLUS_TOKEN,
          {
            row: 0,
            column: 0,
            position: 0,
          },
          "+",
          [],
          [],
        ),
      ),
      BinaryOperatorKind.MULTIPLY,
      new UnaryExpression(
        UnaryOperatorKind.UNARY_NEGATION,
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          2,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              {
                row: 0,
                column: 4,
                position: 4,
              },
              "2",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_MINUS_TOKEN,
          {
            row: 0,
            column: 3,
            position: 3,
          },
          "-",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_MULTIPLY_TOKEN,
        {
          row: 0,
          column: 2,
          position: 2,
        },
        "*",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - multiplication of three literals", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "1*2*3",
    new Expression(
      new Expression(
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
        BinaryOperatorKind.MULTIPLY,
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          2,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              {
                row: 0,
                column: 2,
                position: 2,
              },
              "2",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_MULTIPLY_TOKEN,
          {
            row: 0,
            column: 1,
            position: 1,
          },
          "*",
          [],
          [],
        ),
      ),
      BinaryOperatorKind.MULTIPLY,
      new NumberLiteral(
        NumberLiteralKind.INTEGER,
        3,
        [
          new SyntaxToken(
            TokenKind.LITERAL_INTEGER_TOKEN,
            {
              row: 0,
              column: 4,
              position: 4,
            },
            "3",
            [],
            [],
          ),
        ],
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_MULTIPLY_TOKEN,
        {
          row: 0,
          column: 3,
          position: 3,
        },
        "*",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - binary expression in parenthesis", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "(1*2)",
    new PrimaryExpression(
      new Expression(
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
        BinaryOperatorKind.MULTIPLY,
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          2,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              {
                row: 0,
                column: 3,
                position: 3,
              },
              "2",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_MULTIPLY_TOKEN,
          {
            row: 0,
            column: 2,
            position: 2,
          },
          "*",
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
          column: 4,
          position: 4,
        },
        ")",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - binary expression in parenthesis with postfix operator - invalid syntax", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "(1*2)++",
    new PostfixExpression(
      new PrimaryExpression(
        new BinaryExpression(
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
          BinaryOperatorKind.MULTIPLY,
          new NumberLiteral(
            NumberLiteralKind.INTEGER,
            2,
            [
              new SyntaxToken(
                TokenKind.LITERAL_INTEGER_TOKEN,
                {
                  row: 0,
                  column: 3,
                  position: 3,
                },
                "2",
                [],
                [],
              ),
            ],
          ),
          new SyntaxToken(
            TokenKind.OPERATOR_MULTIPLY_TOKEN,
            {
              row: 0,
              column: 2,
              position: 2,
            },
            "*",
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
            column: 4,
            position: 4,
          },
          ")",
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
          column: 5,
          position: 5,
        },
        "++",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - multiplicative operators - left-to-right associativity", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "1/2*3",
    new Expression(
      new Expression(
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
        BinaryOperatorKind.DIVIDE,
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          2,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              {
                row: 0,
                column: 2,
                position: 2,
              },
              "2",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_DIVIDE_TOKEN,
          {
            row: 0,
            column: 1,
            position: 1,
          },
          "/",
          [],
          [],
        ),
      ),
      BinaryOperatorKind.MULTIPLY,
      new NumberLiteral(
        NumberLiteralKind.INTEGER,
        3,
        [
          new SyntaxToken(
            TokenKind.LITERAL_INTEGER_TOKEN,
            {
              row: 0,
              column: 4,
              position: 4,
            },
            "3",
            [],
            [],
          ),
        ],
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_MULTIPLY_TOKEN,
        {
          row: 0,
          column: 3,
          position: 3,
        },
        "*",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - multiplicative and additive operators - precedence", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "1+2*3",
    new Expression(
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
      BinaryOperatorKind.ADD,
      new Expression(
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          2,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              {
                row: 0,
                column: 2,
                position: 2,
              },
              "2",
              [],
              [],
            ),
          ],
        ),
        BinaryOperatorKind.MULTIPLY,
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          3,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              {
                row: 0,
                column: 4,
                position: 4,
              },
              "3",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_MULTIPLY_TOKEN,
          {
            row: 0,
            column: 3,
            position: 3,
          },
          "*",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_PLUS_TOKEN,
        {
          row: 0,
          column: 1,
          position: 1,
        },
        "+",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - multiplicative and additive operators - precedence overridden by parenthesis", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "(1+2)*3",
    new Expression(
      new PrimaryExpression(
        new Expression(
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
          BinaryOperatorKind.ADD,
          new NumberLiteral(
            NumberLiteralKind.INTEGER,
            2,
            [
              new SyntaxToken(
                TokenKind.LITERAL_INTEGER_TOKEN,
                {
                  row: 0,
                  column: 3,
                  position: 3,
                },
                "2",
                [],
                [],
              ),
            ],
          ),
          new SyntaxToken(
            TokenKind.OPERATOR_PLUS_TOKEN,
            {
              row: 0,
              column: 2,
              position: 2,
            },
            "+",
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
            column: 4,
            position: 4,
          },
          ")",
          [],
          [],
        ),
      ),
      BinaryOperatorKind.MULTIPLY,
      new NumberLiteral(
        NumberLiteralKind.INTEGER,
        3,
        [
          new SyntaxToken(
            TokenKind.LITERAL_INTEGER_TOKEN,
            {
              row: 0,
              column: 6,
              position: 6,
            },
            "3",
            [],
            [],
          ),
        ],
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_MULTIPLY_TOKEN,
        {
          row: 0,
          column: 5,
          position: 5,
        },
        "*",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - logical operators", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "i||j && k",
    new Expression(
      new Expression(
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
        BinaryOperatorKind.LOGICAL_OR,
        new Identifier(
          "j",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            {
              row: 0,
              column: 3,
              position: 3,
            },
            "j",
            [],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                {
                  row: 0,
                  column: 4,
                  position: 4,
                },
                " ",
              ),
            ],
          ),
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_LOGICAL_OR_TOKEN,
          {
            row: 0,
            column: 1,
            position: 1,
          },
          "||",
          [],
          [],
        ),
      ),
      BinaryOperatorKind.LOGICAL_AND,
      new Identifier(
        "k",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          {
            row: 0,
            column: 8,
            position: 8,
          },
          "k",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_LOGICAL_AND_TOKEN,
        {
          row: 0,
          column: 5,
          position: 5,
        },
        "&&",
        [],
        [
          new Trivia(
            TokenKind.WHITESPACE_TOKEN,
            {
              row: 0,
              column: 7,
              position: 7,
            },
            " ",
          ),
        ],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - additive operators", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "i+j - k",
    new Expression(
      new Expression(
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
        BinaryOperatorKind.ADD,
        new Identifier(
          "j",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            {
              row: 0,
              column: 2,
              position: 2,
            },
            "j",
            [],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                {
                  row: 0,
                  column: 3,
                  position: 3,
                },
                " ",
              ),
            ],
          ),
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_PLUS_TOKEN,
          {
            row: 0,
            column: 1,
            position: 1,
          },
          "+",
          [],
          [],
        ),
      ),
      BinaryOperatorKind.SUBTRACT,
      new Identifier(
        "k",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          {
            row: 0,
            column: 6,
            position: 6,
          },
          "k",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_MINUS_TOKEN,
        {
          row: 0,
          column: 4,
          position: 4,
        },
        "-",
        [],
        [
          new Trivia(
            TokenKind.WHITESPACE_TOKEN,
            {
              row: 0,
              column: 5,
              position: 5,
            },
            " ",
          ),
        ],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - shift operators", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "i<<j >> k",
    new Expression(
      new Expression(
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
        BinaryOperatorKind.SHIFT_LEFT,
        new Identifier(
          "j",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            {
              row: 0,
              column: 3,
              position: 3,
            },
            "j",
            [],
            [
              new Trivia(TokenKind.WHITESPACE_TOKEN, {
                column: 4,
                position: 4,
                row: 0,
              }, " "),
            ],
          ),
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_SHIFT_LEFT_TOKEN,
          {
            row: 0,
            column: 1,
            position: 1,
          },
          "<<",
          [],
          [],
        ),
      ),
      BinaryOperatorKind.SHIFT_RIGHT,
      new Identifier(
        "k",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          {
            row: 0,
            column: 8,
            position: 8,
          },
          "k",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_SHIFT_RIGHT_TOKEN,
        {
          row: 0,
          column: 5,
          position: 5,
        },
        ">>",
        [],
        [
          new Trivia(TokenKind.WHITESPACE_TOKEN, {
            column: 7,
            position: 7,
            row: 0,
          }, " "),
        ],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - relational operators", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "i<j<=k>l>=m",
    new Expression(
      new Expression(
        new Expression(
          new Expression(
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
            BinaryOperatorKind.LESS_THAN,
            new Identifier(
              "j",
              new SyntaxToken(
                TokenKind.IDENTIFIER_TOKEN,
                {
                  row: 0,
                  column: 2,
                  position: 2,
                },
                "j",
                [],
                [],
              ),
            ),
            new SyntaxToken(
              TokenKind.OPERATOR_LESS_THAN_TOKEN,
              {
                row: 0,
                column: 1,
                position: 1,
              },
              "<",
              [],
              [],
            ),
          ),
          BinaryOperatorKind.LESS_THAN_OR_EQUAL,
          new Identifier(
            "k",
            new SyntaxToken(
              TokenKind.IDENTIFIER_TOKEN,
              {
                row: 0,
                column: 5,
                position: 5,
              },
              "k",
              [],
              [],
            ),
          ),
          new SyntaxToken(
            TokenKind.OPERATOR_LESS_THAN_OR_EQUAL_TOKEN,
            {
              row: 0,
              column: 3,
              position: 3,
            },
            "<=",
            [],
            [],
          ),
        ),
        BinaryOperatorKind.GREATER_THAN,
        new Identifier(
          "l",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            {
              row: 0,
              column: 7,
              position: 7,
            },
            "l",
            [],
            [],
          ),
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_GREATER_THAN_TOKEN,
          {
            row: 0,
            column: 6,
            position: 6,
          },
          ">",
          [],
          [],
        ),
      ),
      BinaryOperatorKind.GREATER_THAN_OR_EQUAL,
      new Identifier(
        "m",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          {
            row: 0,
            column: 10,
            position: 10,
          },
          "m",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_GREATER_THAN_OR_EQUAL_TOKEN,
        {
          row: 0,
          column: 8,
          position: 8,
        },
        ">=",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - equality operators", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "i==j != k",
    new Expression(
      new Expression(
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
        BinaryOperatorKind.EQUAL,
        new Identifier(
          "j",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            {
              row: 0,
              column: 3,
              position: 3,
            },
            "j",
            [],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                {
                  row: 0,
                  column: 4,
                  position: 4,
                },
                " ",
              ),
            ],
          ),
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_EQUAL_TOKEN,
          {
            row: 0,
            column: 1,
            position: 1,
          },
          "==",
          [],
          [],
        ),
      ),
      BinaryOperatorKind.NOT_EQUAL,
      new Identifier(
        "k",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          {
            row: 0,
            column: 8,
            position: 8,
          },
          "k",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_NOT_EQUAL_TOKEN,
        {
          row: 0,
          column: 5,
          position: 5,
        },
        "!=",
        [],
        [
          new Trivia(
            TokenKind.WHITESPACE_TOKEN,
            {
              row: 0,
              column: 7,
              position: 7,
            },
            " ",
          ),
        ],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - bitwise operators", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "i&j | k",
    new Expression(
      new Expression(
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
        BinaryOperatorKind.BITWISE_AND,
        new Identifier(
          "j",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            {
              row: 0,
              column: 2,
              position: 2,
            },
            "j",
            [],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                {
                  row: 0,
                  column: 3,
                  position: 3,
                },
                " ",
              ),
            ],
          ),
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_BITWISE_AND_TOKEN,
          {
            row: 0,
            column: 1,
            position: 1,
          },
          "&",
          [],
          [],
        ),
      ),
      BinaryOperatorKind.BITWISE_OR,
      new Identifier(
        "k",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          {
            row: 0,
            column: 6,
            position: 6,
          },
          "k",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_BITWISE_OR_TOKEN,
        {
          row: 0,
          column: 4,
          position: 4,
        },
        "|",
        [],
        [
          new Trivia(
            TokenKind.WHITESPACE_TOKEN,
            {
              row: 0,
              column: 5,
              position: 5,
            },
            " ",
          ),
        ],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - all precedence rules", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "8&&7|6==5>4>>3+2*1",
    new Expression(
      new NumberLiteral(
        NumberLiteralKind.INTEGER,
        8,
        [
          new SyntaxToken(
            TokenKind.LITERAL_INTEGER_TOKEN,
            {
              row: 0,
              column: 0,
              position: 0,
            },
            "8",
            [],
            [],
          ),
        ],
      ),
      BinaryOperatorKind.LOGICAL_AND,
      new Expression(
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          7,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              {
                row: 0,
                column: 3,
                position: 3,
              },
              "7",
              [],
              [],
            ),
          ],
        ),
        BinaryOperatorKind.BITWISE_OR,
        new Expression(
          new NumberLiteral(
            NumberLiteralKind.INTEGER,
            6,
            [
              new SyntaxToken(
                TokenKind.LITERAL_INTEGER_TOKEN,
                {
                  row: 0,
                  column: 5,
                  position: 5,
                },
                "6",
                [],
                [],
              ),
            ],
          ),
          BinaryOperatorKind.EQUAL,
          new Expression(
            new NumberLiteral(
              NumberLiteralKind.INTEGER,
              5,
              [
                new SyntaxToken(
                  TokenKind.LITERAL_INTEGER_TOKEN,
                  {
                    row: 0,
                    column: 8,
                    position: 8,
                  },
                  "5",
                  [],
                  [],
                ),
              ],
            ),
            BinaryOperatorKind.GREATER_THAN,
            new Expression(
              new NumberLiteral(
                NumberLiteralKind.INTEGER,
                4,
                [
                  new SyntaxToken(
                    TokenKind.LITERAL_INTEGER_TOKEN,
                    {
                      row: 0,
                      column: 10,
                      position: 10,
                    },
                    "4",
                    [],
                    [],
                  ),
                ],
              ),
              BinaryOperatorKind.SHIFT_RIGHT,
              new Expression(
                new NumberLiteral(
                  NumberLiteralKind.INTEGER,
                  3,
                  [
                    new SyntaxToken(
                      TokenKind.LITERAL_INTEGER_TOKEN,
                      {
                        row: 0,
                        column: 13,
                        position: 13,
                      },
                      "3",
                      [],
                      [],
                    ),
                  ],
                ),
                BinaryOperatorKind.ADD,
                new Expression(
                  new NumberLiteral(
                    NumberLiteralKind.INTEGER,
                    2,
                    [
                      new SyntaxToken(
                        TokenKind.LITERAL_INTEGER_TOKEN,
                        {
                          row: 0,
                          column: 15,
                          position: 15,
                        },
                        "2",
                        [],
                        [],
                      ),
                    ],
                  ),
                  BinaryOperatorKind.MULTIPLY,
                  new NumberLiteral(
                    NumberLiteralKind.INTEGER,
                    1,
                    [
                      new SyntaxToken(
                        TokenKind.LITERAL_INTEGER_TOKEN,
                        {
                          row: 0,
                          column: 17,
                          position: 17,
                        },
                        "1",
                        [],
                        [],
                      ),
                    ],
                  ),
                  new SyntaxToken(
                    TokenKind.OPERATOR_MULTIPLY_TOKEN,
                    {
                      row: 0,
                      column: 16,
                      position: 16,
                    },
                    "*",
                    [],
                    [],
                  ),
                ),
                new SyntaxToken(
                  TokenKind.OPERATOR_PLUS_TOKEN,
                  {
                    row: 0,
                    column: 14,
                    position: 14,
                  },
                  "+",
                  [],
                  [],
                ),
              ),
              new SyntaxToken(
                TokenKind.OPERATOR_SHIFT_RIGHT_TOKEN,
                {
                  row: 0,
                  column: 11,
                  position: 11,
                },
                ">>",
                [],
                [],
              ),
            ),
            new SyntaxToken(
              TokenKind.OPERATOR_GREATER_THAN_TOKEN,
              {
                row: 0,
                column: 9,
                position: 9,
              },
              ">",
              [],
              [],
            ),
          ),
          new SyntaxToken(
            TokenKind.OPERATOR_EQUAL_TOKEN,
            {
              row: 0,
              column: 6,
              position: 6,
            },
            "==",
            [],
            [],
          ),
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_BITWISE_OR_TOKEN,
          {
            row: 0,
            column: 4,
            position: 4,
          },
          "|",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_LOGICAL_AND_TOKEN,
        {
          row: 0,
          column: 1,
          position: 1,
        },
        "&&",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - mixed unary and binary", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "i++ * lengthof(j)",
    new BinaryExpression(
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
          [
            new Trivia(
              TokenKind.WHITESPACE_TOKEN,
              {
                row: 0,
                column: 3,
                position: 3,
              },
              " ",
            ),
          ],
        ),
      ),
      BinaryOperatorKind.MULTIPLY,
      new LengthOfExpression(
        new Identifier(
          "j",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            {
              row: 0,
              column: 15,
              position: 15,
            },
            "j",
            [],
            [],
          ),
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_LENGTHOF_TOKEN,
          {
            row: 0,
            column: 6,
            position: 6,
          },
          "lengthof",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          {
            row: 0,
            column: 14,
            position: 14,
          },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          {
            row: 0,
            column: 16,
            position: 16,
          },
          ")",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_MULTIPLY_TOKEN,
        {
          row: 0,
          column: 4,
          position: 4,
        },
        "*",
        [],
        [
          new Trivia(
            TokenKind.WHITESPACE_TOKEN,
            {
              row: 0,
              column: 5,
              position: 5,
            },
            " ",
          ),
        ],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - nested parenthesis", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "((1*2)+3)/(2*3)",
    new BinaryExpression(
      new PrimaryExpression(
        new BinaryExpression(
          new PrimaryExpression(
            new BinaryExpression(
              new NumberLiteral(
                NumberLiteralKind.INTEGER,
                1,
                [
                  new SyntaxToken(
                    TokenKind.LITERAL_INTEGER_TOKEN,
                    {
                      row: 0,
                      column: 2,
                      position: 2,
                    },
                    "1",
                    [],
                    [],
                  ),
                ],
              ),
              BinaryOperatorKind.MULTIPLY,
              new NumberLiteral(
                NumberLiteralKind.INTEGER,
                2,
                [
                  new SyntaxToken(
                    TokenKind.LITERAL_INTEGER_TOKEN,
                    {
                      row: 0,
                      column: 4,
                      position: 4,
                    },
                    "2",
                    [],
                    [],
                  ),
                ],
              ),
              new SyntaxToken(
                TokenKind.OPERATOR_MULTIPLY_TOKEN,
                {
                  row: 0,
                  column: 3,
                  position: 3,
                },
                "*",
                [],
                [],
              ),
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
              {
                row: 0,
                column: 1,
                position: 1,
              },
              "(",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
              {
                row: 0,
                column: 5,
                position: 5,
              },
              ")",
              [],
              [],
            ),
          ),
          BinaryOperatorKind.ADD,
          new NumberLiteral(
            NumberLiteralKind.INTEGER,
            3,
            [
              new SyntaxToken(
                TokenKind.LITERAL_INTEGER_TOKEN,
                {
                  row: 0,
                  column: 7,
                  position: 7,
                },
                "3",
                [],
                [],
              ),
            ],
          ),
          new SyntaxToken(
            TokenKind.OPERATOR_PLUS_TOKEN,
            {
              row: 0,
              column: 6,
              position: 6,
            },
            "+",
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
            column: 8,
            position: 8,
          },
          ")",
          [],
          [],
        ),
      ),
      BinaryOperatorKind.DIVIDE,
      new PrimaryExpression(
        new BinaryExpression(
          new NumberLiteral(
            NumberLiteralKind.INTEGER,
            2,
            [
              new SyntaxToken(
                TokenKind.LITERAL_INTEGER_TOKEN,
                {
                  row: 0,
                  column: 11,
                  position: 11,
                },
                "2",
                [],
                [],
              ),
            ],
          ),
          BinaryOperatorKind.MULTIPLY,
          new NumberLiteral(
            NumberLiteralKind.INTEGER,
            3,
            [
              new SyntaxToken(
                TokenKind.LITERAL_INTEGER_TOKEN,
                {
                  row: 0,
                  column: 13,
                  position: 13,
                },
                "3",
                [],
                [],
              ),
            ],
          ),
          new SyntaxToken(
            TokenKind.OPERATOR_MULTIPLY_TOKEN,
            {
              row: 0,
              column: 12,
              position: 12,
            },
            "*",
            [],
            [],
          ),
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          {
            row: 0,
            column: 10,
            position: 10,
          },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          {
            row: 0,
            column: 14,
            position: 14,
          },
          ")",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_DIVIDE_TOKEN,
        {
          row: 0,
          column: 9,
          position: 9,
        },
        "/",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test binary expression pattern - three levels of precedence", () => {
  testSyntaxPattern(
    EXPRESSION_RULE,
    "1+2*3<<2",
    new BinaryExpression(
      new BinaryExpression(
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
        BinaryOperatorKind.ADD,
        new BinaryExpression(
          new NumberLiteral(
            NumberLiteralKind.INTEGER,
            2,
            [
              new SyntaxToken(
                TokenKind.LITERAL_INTEGER_TOKEN,
                {
                  row: 0,
                  column: 2,
                  position: 2,
                },
                "2",
                [],
                [],
              ),
            ],
          ),
          BinaryOperatorKind.MULTIPLY,
          new NumberLiteral(
            NumberLiteralKind.INTEGER,
            3,
            [
              new SyntaxToken(
                TokenKind.LITERAL_INTEGER_TOKEN,
                {
                  row: 0,
                  column: 4,
                  position: 4,
                },
                "3",
                [],
                [],
              ),
            ],
          ),
          new SyntaxToken(
            TokenKind.OPERATOR_MULTIPLY_TOKEN,
            {
              row: 0,
              column: 3,
              position: 3,
            },
            "*",
            [],
            [],
          ),
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_PLUS_TOKEN,
          {
            row: 0,
            column: 1,
            position: 1,
          },
          "+",
          [],
          [],
        ),
      ),
      BinaryOperatorKind.SHIFT_LEFT,
      new NumberLiteral(
        NumberLiteralKind.INTEGER,
        2,
        [
          new SyntaxToken(
            TokenKind.LITERAL_INTEGER_TOKEN,
            {
              row: 0,
              column: 7,
              position: 7,
            },
            "2",
            [],
            [],
          ),
        ],
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_SHIFT_LEFT_TOKEN,
        {
          row: 0,
          column: 5,
          position: 5,
        },
        "<<",
        [],
        [],
      ),
    ),
  );
});
