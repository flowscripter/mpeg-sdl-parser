import { BinaryExpression } from "../../../src/abstract_syntax_tree/node/BinaryExpression.ts";
import { CompoundStatement } from "../../../src/abstract_syntax_tree/node/CompoundStatement.ts";
import { DoStatement } from "../../../src/abstract_syntax_tree/node/DoStatement.ts";
import { BinaryOperatorKind } from "../../../src/abstract_syntax_tree/node/enum/binary_operator_kind.ts";
import { NumberLiteralKind } from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import { PostfixOperatorKind } from "../../../src/abstract_syntax_tree/node/enum/postfix_operator_kind.ts";
import { ExpressionStatement } from "../../../src/abstract_syntax_tree/node/ExpressionStatement.ts";
import { Identifier } from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import { NumberLiteral } from "../../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import { PostfixExpression } from "../../../src/abstract_syntax_tree/node/PostfixExpression.ts";
import { DO_STATEMENT_RULE } from "../../../src/parser/syntax_rules.ts";
import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

Deno.test("Test do statement pattern", () => {
  testSyntaxPattern(
    DO_STATEMENT_RULE,
    "do {i++;} while (i<3);",
    new DoStatement(
      new CompoundStatement(
        [
          new ExpressionStatement(
            new PostfixExpression(
              new Identifier(
                "i",
                new SyntaxToken(
                  TokenKind.IDENTIFIER_TOKEN,
                  { row: 0, column: 4, position: 4 },
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
                { row: 0, column: 5, position: 5 },
                "++",
                [],
                [],
              ),
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
              { row: 0, column: 7, position: 7 },
              ";",
              [],
              [],
            ),
          ),
        ],
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
          { row: 0, column: 3, position: 3 },
          "{",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
          { row: 0, column: 8, position: 8 },
          "}",
          [],
          [
            new Trivia(TokenKind.WHITESPACE_TOKEN, {
              row: 0,
              column: 9,
              position: 9,
            }, " "),
          ],
        ),
      ),
      new BinaryExpression(
        new Identifier(
          "i",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            { row: 0, column: 17, position: 17 },
            "i",
            [],
            [],
          ),
        ),
        BinaryOperatorKind.LESS_THAN,
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
          TokenKind.OPERATOR_LESS_THAN_TOKEN,
          { row: 0, column: 18, position: 18 },
          "<",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.KEYWORD_DO_TOKEN,
        { row: 0, column: 0, position: 0 },
        "do",
        [],
        [
          new Trivia(TokenKind.WHITESPACE_TOKEN, {
            row: 0,
            column: 2,
            position: 2,
          }, " "),
        ],
      ),
      new SyntaxToken(
        TokenKind.KEYWORD_WHILE_TOKEN,
        { row: 0, column: 10, position: 10 },
        "while",
        [],
        [
          new Trivia(TokenKind.WHITESPACE_TOKEN, {
            row: 0,
            column: 15,
            position: 15,
          }, " "),
        ],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
        { row: 0, column: 16, position: 16 },
        "(",
        [],
        [],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
        { row: 0, column: 20, position: 20 },
        ")",
        [],
        [],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
        { row: 0, column: 21, position: 21 },
        ";",
        [],
        [],
      ),
    ),
  );
});
