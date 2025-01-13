import AssignmentExpression from "../../../src/abstract_syntax_tree/node/AssignmentExpression.ts";
import BinaryExpression from "../../../src/abstract_syntax_tree/node/BinaryExpression.ts";
import BinaryOperatorKind from "../../../src/abstract_syntax_tree/node/enum/binary_operator_kind.ts";
import NumberLiteralKind from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import PostfixOperatorKind from "../../../src/abstract_syntax_tree/node/enum/postfix_operator_kind.ts";
import ExpressionStatement from "../../../src/abstract_syntax_tree/node/ExpressionStatement.ts";
import Identifier from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import NumberLiteral from "../../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import PostfixExpression from "../../../src/abstract_syntax_tree/node/PostfixExpression.ts";
import UnaryExpression from "../../../src/abstract_syntax_tree/node/UnaryExpression.ts";
import { EXPRESSION_STATEMENT_RULE } from "../../../src/parser/syntax_rules.ts";
import TokenKind from "../../../src/tokenizer/enum/token_kind.ts";
import SyntaxToken from "../../../src/tokenizer/token/SyntaxToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

Deno.test("Test expression statement pattern - expression", () => {
  testSyntaxPattern(
    EXPRESSION_STATEMENT_RULE,
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

Deno.test("Test expression statement pattern - assignment expression", () => {
  testSyntaxPattern(
    EXPRESSION_STATEMENT_RULE,
    "i=1*2;",
    new ExpressionStatement(
      new AssignmentExpression(
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
          TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
          {
            row: 0,
            column: 1,
            position: 1,
          },
          "=",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
        {
          row: 0,
          column: 5,
          position: 5,
        },
        ";",
        [],
        [],
      ),
    ),
  );
});
