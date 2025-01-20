import BinaryExpression from "../../../src/abstract_syntax_tree/node/BinaryExpression.ts";
import CompoundStatement from "../../../src/abstract_syntax_tree/node/CompoundStatement.ts";
import BinaryOperatorKind from "../../../src/abstract_syntax_tree/node/enum/binary_operator_kind.ts";
import NumberLiteralKind from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import PostfixOperatorKind from "../../../src/abstract_syntax_tree/node/enum/postfix_operator_kind.ts";
import ExpressionStatement from "../../../src/abstract_syntax_tree/node/ExpressionStatement.ts";
import Identifier from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import IfClause from "../../../src/abstract_syntax_tree/node/IfClause.ts";
import IfStatement from "../../../src/abstract_syntax_tree/node/IfStatement.ts";
import NumberLiteral from "../../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import PostfixExpression from "../../../src/abstract_syntax_tree/node/PostfixExpression.ts";
import { IF_STATEMENT_RULE } from "../../../src/parser/syntax_rules.ts";
import TokenKind from "../../../src/tokenizer/enum/token_kind.ts";
import SyntaxToken from "../../../src/tokenizer/token/SyntaxToken.ts";
import Trivia from "../../../src/tokenizer/token/TriviaToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

Deno.test("Test if statement pattern - with braces in clauses", () => {
  testSyntaxPattern(
    IF_STATEMENT_RULE,
    "if(i==1){i++;}else if(i==2){i--;}else{j++;}",
    new IfStatement(
      [
        new IfClause(
          new BinaryExpression(
            new Identifier(
              "i",
              new SyntaxToken(
                TokenKind.IDENTIFIER_TOKEN,
                { row: 0, column: 3, position: 3 },
                "i",
                [],
                [],
              ),
            ),
            BinaryOperatorKind.EQUAL,
            new NumberLiteral(
              NumberLiteralKind.INTEGER,
              1,
              [
                new SyntaxToken(
                  TokenKind.LITERAL_INTEGER_TOKEN,
                  { row: 0, column: 6, position: 6 },
                  "1",
                  [],
                  [],
                ),
              ],
            ),
            new SyntaxToken(
              TokenKind.OPERATOR_EQUAL_TOKEN,
              { row: 0, column: 4, position: 4 },
              "==",
              [],
              [],
            ),
          ),
          new CompoundStatement(
            [
              new ExpressionStatement(
                new PostfixExpression(
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
                  undefined,
                  undefined,
                  PostfixOperatorKind.POSTFIX_INCREMENT,
                  new SyntaxToken(
                    TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN,
                    { row: 0, column: 10, position: 10 },
                    "++",
                    [],
                    [],
                  ),
                ),
                new SyntaxToken(
                  TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
                  { row: 0, column: 12, position: 12 },
                  ";",
                  [],
                  [],
                ),
              ),
            ],
            new SyntaxToken(
              TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
              { row: 0, column: 8, position: 8 },
              "{",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
              { row: 0, column: 13, position: 13 },
              "}",
              [],
              [],
            ),
          ),
          new SyntaxToken(
            TokenKind.KEYWORD_IF_TOKEN,
            { row: 0, column: 0, position: 0 },
            "if",
            [],
            [],
          ),
          undefined,
          new SyntaxToken(
            TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
            { row: 0, column: 2, position: 2 },
            "(",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
            { row: 0, column: 7, position: 7 },
            ")",
            [],
            [],
          ),
        ),
        new IfClause(
          new BinaryExpression(
            new Identifier(
              "i",
              new SyntaxToken(
                TokenKind.IDENTIFIER_TOKEN,
                { row: 0, column: 22, position: 22 },
                "i",
                [],
                [],
              ),
            ),
            BinaryOperatorKind.EQUAL,
            new NumberLiteral(
              NumberLiteralKind.INTEGER,
              2,
              [
                new SyntaxToken(
                  TokenKind.LITERAL_INTEGER_TOKEN,
                  { row: 0, column: 25, position: 25 },
                  "2",
                  [],
                  [],
                ),
              ],
            ),
            new SyntaxToken(
              TokenKind.OPERATOR_EQUAL_TOKEN,
              { row: 0, column: 23, position: 23 },
              "==",
              [],
              [],
            ),
          ),
          new CompoundStatement(
            [
              new ExpressionStatement(
                new PostfixExpression(
                  new Identifier(
                    "i",
                    new SyntaxToken(
                      TokenKind.IDENTIFIER_TOKEN,
                      { row: 0, column: 28, position: 28 },
                      "i",
                      [],
                      [],
                    ),
                  ),
                  undefined,
                  undefined,
                  PostfixOperatorKind.POSTFIX_DECREMENT,
                  new SyntaxToken(
                    TokenKind.OPERATOR_POSTFIX_DECREMENT_TOKEN,
                    { row: 0, column: 29, position: 29 },
                    "--",
                    [],
                    [],
                  ),
                ),
                new SyntaxToken(
                  TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
                  { row: 0, column: 31, position: 31 },
                  ";",
                  [],
                  [],
                ),
              ),
            ],
            new SyntaxToken(
              TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
              { row: 0, column: 27, position: 27 },
              "{",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
              { row: 0, column: 32, position: 32 },
              "}",
              [],
              [],
            ),
          ),
          new SyntaxToken(
            TokenKind.KEYWORD_IF_TOKEN,
            { row: 0, column: 19, position: 19 },
            "if",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.KEYWORD_ELSE_TOKEN,
            { row: 0, column: 14, position: 14 },
            "else",
            [],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                { row: 0, column: 18, position: 18 },
                " ",
              ),
            ],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
            { row: 0, column: 21, position: 21 },
            "(",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
            { row: 0, column: 26, position: 26 },
            ")",
            [],
            [],
          ),
        ),
        new IfClause(
          undefined,
          new CompoundStatement(
            [
              new ExpressionStatement(
                new PostfixExpression(
                  new Identifier(
                    "j",
                    new SyntaxToken(
                      TokenKind.IDENTIFIER_TOKEN,
                      { row: 0, column: 38, position: 38 },
                      "j",
                      [],
                      [],
                    ),
                  ),
                  undefined,
                  undefined,
                  PostfixOperatorKind.POSTFIX_INCREMENT,
                  new SyntaxToken(
                    TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN,
                    { row: 0, column: 39, position: 39 },
                    "++",
                    [],
                    [],
                  ),
                ),
                new SyntaxToken(
                  TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
                  { row: 0, column: 41, position: 41 },
                  ";",
                  [],
                  [],
                ),
              ),
            ],
            new SyntaxToken(
              TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
              { row: 0, column: 37, position: 37 },
              "{",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
              { row: 0, column: 42, position: 42 },
              "}",
              [],
              [],
            ),
          ),
          undefined,
          new SyntaxToken(
            TokenKind.KEYWORD_ELSE_TOKEN,
            { row: 0, column: 33, position: 33 },
            "else",
            [],
            [],
          ),
          undefined,
          undefined,
        ),
      ],
    ),
  );
});

Deno.test("Test if statement pattern - no braces and no else if clause", () => {
  testSyntaxPattern(
    IF_STATEMENT_RULE,
    "if(i==1)i++;else j++;",
    new IfStatement(
      [
        new IfClause(
          new BinaryExpression(
            new Identifier(
              "i",
              new SyntaxToken(
                TokenKind.IDENTIFIER_TOKEN,
                { row: 0, column: 3, position: 3 },
                "i",
                [],
                [],
              ),
            ),
            BinaryOperatorKind.EQUAL,
            new NumberLiteral(
              NumberLiteralKind.INTEGER,
              1,
              [
                new SyntaxToken(
                  TokenKind.LITERAL_INTEGER_TOKEN,
                  { row: 0, column: 6, position: 6 },
                  "1",
                  [],
                  [],
                ),
              ],
            ),
            new SyntaxToken(
              TokenKind.OPERATOR_EQUAL_TOKEN,
              { row: 0, column: 4, position: 4 },
              "==",
              [],
              [],
            ),
          ),
          new ExpressionStatement(
            new PostfixExpression(
              new Identifier(
                "i",
                new SyntaxToken(
                  TokenKind.IDENTIFIER_TOKEN,
                  { row: 0, column: 8, position: 8 },
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
                { row: 0, column: 9, position: 9 },
                "++",
                [],
                [],
              ),
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
              { row: 0, column: 11, position: 11 },
              ";",
              [],
              [],
            ),
          ),
          new SyntaxToken(
            TokenKind.KEYWORD_IF_TOKEN,
            { row: 0, column: 0, position: 0 },
            "if",
            [],
            [],
          ),
          undefined,
          new SyntaxToken(
            TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
            { row: 0, column: 2, position: 2 },
            "(",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
            { row: 0, column: 7, position: 7 },
            ")",
            [],
            [],
          ),
        ),
        new IfClause(
          undefined,
          new ExpressionStatement(
            new PostfixExpression(
              new Identifier(
                "j",
                new SyntaxToken(
                  TokenKind.IDENTIFIER_TOKEN,
                  { row: 0, column: 17, position: 17 },
                  "j",
                  [],
                  [],
                ),
              ),
              undefined,
              undefined,
              PostfixOperatorKind.POSTFIX_INCREMENT,
              new SyntaxToken(
                TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN,
                { row: 0, column: 18, position: 18 },
                "++",
                [],
                [],
              ),
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
              { row: 0, column: 20, position: 20 },
              ";",
              [],
              [],
            ),
          ),
          undefined,
          new SyntaxToken(
            TokenKind.KEYWORD_ELSE_TOKEN,
            { row: 0, column: 12, position: 12 },
            "else",
            [],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                { row: 0, column: 16, position: 16 },
                " ",
              ),
            ],
          ),
          undefined,
          undefined,
        ),
      ],
    ),
  );
});
