import { describe, test } from "bun:test";
import testSyntaxPattern from "../syntax_pattern_test_helper";
import { SWITCH_STATEMENT_RULE } from "../../../src/parser/syntax_rules";
import { SwitchStatement } from "../../../src/abstract_syntax_tree/node/SwitchStatement";
import { PostfixOperatorKind } from "../../../src/abstract_syntax_tree/node/enum/postfix_operator_kind";
import { ExpressionStatement } from "../../../src/abstract_syntax_tree/node/ExpressionStatement";
import { Identifier } from "../../../src/abstract_syntax_tree/node/Identifier";
import { PostfixExpression } from "../../../src/abstract_syntax_tree/node/PostfixExpression";
import { TokenKind } from "../../../src/tokenizer/enum/token_kind";
import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken";
import { SwitchDefaultClause } from "../../../src/abstract_syntax_tree/node/SwitchDefaultClause";
import { SwitchCaseClause } from "../../../src/abstract_syntax_tree/node/SwitchCaseClause";
import { NumberLiteral } from "../../../src/abstract_syntax_tree/node/NumberLiteral";
import { NumberLiteralKind } from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind";
import { Trivia } from "../../../src/tokenizer/token/TriviaToken";
describe("Switch Statement Pattern Tests", () => {
  test("Test switch statement pattern - single case", () => {
    testSyntaxPattern(
      SWITCH_STATEMENT_RULE,
      "switch(i){case 1:break;}",
      new SwitchStatement(
        new Identifier(
          "i",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            { row: 0, column: 7, position: 7 },
            "i",
            [],
            [],
          ),
        ),
        [
          new SwitchCaseClause(
            new NumberLiteral(
              NumberLiteralKind.INTEGER,
              1,
              [
                new SyntaxToken(
                  TokenKind.LITERAL_INTEGER_TOKEN,
                  { row: 0, column: 15, position: 15 },
                  "1",
                  [],
                  [],
                ),
              ],
            ),
            [],
            new SyntaxToken(
              TokenKind.KEYWORD_CASE_TOKEN,
              { row: 0, column: 10, position: 10 },
              "case",
              [],
              [
                new Trivia(
                  TokenKind.WHITESPACE_TOKEN,
                  {
                    row: 0,
                    column: 14,
                    position: 14,
                  },
                  " ",
                ),
              ],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_COLON_TOKEN,
              { row: 0, column: 16, position: 16 },
              ":",
              [],
              [],
            ),
            undefined,
            new SyntaxToken(
              TokenKind.KEYWORD_BREAK_TOKEN,
              { row: 0, column: 17, position: 17 },
              "break",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
              { row: 0, column: 22, position: 22 },
              ";",
              [],
              [],
            ),
            undefined,
          ),
        ],
        undefined,
        new SyntaxToken(
          TokenKind.KEYWORD_SWITCH_TOKEN,
          { row: 0, column: 0, position: 0 },
          "switch",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          { row: 0, column: 6, position: 6 },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          { row: 0, column: 8, position: 8 },
          ")",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
          { row: 0, column: 9, position: 9 },
          "{",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
          { row: 0, column: 23, position: 23 },
          "}",
          [],
          [],
        ),
      ),
    );
  });

  test("Test switch statement pattern - single case with braces", () => {
    testSyntaxPattern(
      SWITCH_STATEMENT_RULE,
      "switch(i){case 1:{break;}}",
      new SwitchStatement(
        new Identifier(
          "i",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            { row: 0, column: 7, position: 7 },
            "i",
            [],
            [],
          ),
        ),
        [
          new SwitchCaseClause(
            new NumberLiteral(
              NumberLiteralKind.INTEGER,
              1,
              [
                new SyntaxToken(
                  TokenKind.LITERAL_INTEGER_TOKEN,
                  { row: 0, column: 15, position: 15 },
                  "1",
                  [],
                  [],
                ),
              ],
            ),
            [],
            new SyntaxToken(
              TokenKind.KEYWORD_CASE_TOKEN,
              { row: 0, column: 10, position: 10 },
              "case",
              [],
              [
                new Trivia(
                  TokenKind.WHITESPACE_TOKEN,
                  {
                    row: 0,
                    column: 14,
                    position: 14,
                  },
                  " ",
                ),
              ],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_COLON_TOKEN,
              { row: 0, column: 16, position: 16 },
              ":",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
              { row: 0, column: 17, position: 17 },
              "{",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.KEYWORD_BREAK_TOKEN,
              { row: 0, column: 18, position: 18 },
              "break",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
              { row: 0, column: 23, position: 23 },
              ";",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
              { row: 0, column: 24, position: 24 },
              "}",
              [],
              [],
            ),
          ),
        ],
        undefined,
        new SyntaxToken(
          TokenKind.KEYWORD_SWITCH_TOKEN,
          { row: 0, column: 0, position: 0 },
          "switch",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          { row: 0, column: 6, position: 6 },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          { row: 0, column: 8, position: 8 },
          ")",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
          { row: 0, column: 9, position: 9 },
          "{",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
          { row: 0, column: 25, position: 25 },
          "}",
          [],
          [],
        ),
      ),
    );
  });

  test("Test switch statement pattern - no cases and default", () => {
    testSyntaxPattern(
      SWITCH_STATEMENT_RULE,
      "switch(i){default:i--;}",
      new SwitchStatement(
        new Identifier(
          "i",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            { row: 0, column: 7, position: 7 },
            "i",
            [],
            [],
          ),
        ),
        [],
        new SwitchDefaultClause(
          [
            new ExpressionStatement(
              new PostfixExpression(
                new Identifier(
                  "i",
                  new SyntaxToken(
                    TokenKind.IDENTIFIER_TOKEN,
                    { row: 0, column: 18, position: 18 },
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
                  { row: 0, column: 19, position: 19 },
                  "--",
                  [],
                  [],
                ),
              ),
              new SyntaxToken(
                TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
                { row: 0, column: 21, position: 21 },
                ";",
                [],
                [],
              ),
            ),
          ],
          new SyntaxToken(
            TokenKind.KEYWORD_DEFAULT_TOKEN,
            { row: 0, column: 10, position: 10 },
            "default",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_COLON_TOKEN,
            { row: 0, column: 17, position: 17 },
            ":",
            [],
            [],
          ),
          undefined,
          undefined,
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_SWITCH_TOKEN,
          { row: 0, column: 0, position: 0 },
          "switch",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          { row: 0, column: 6, position: 6 },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          { row: 0, column: 8, position: 8 },
          ")",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
          { row: 0, column: 9, position: 9 },
          "{",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
          { row: 0, column: 22, position: 22 },
          "}",
          [],
          [],
        ),
      ),
    );
  });

  test("Test switch statement pattern - no cases and default with braces", () => {
    testSyntaxPattern(
      SWITCH_STATEMENT_RULE,
      "switch(i){default:{i--;}}",
      new SwitchStatement(
        new Identifier(
          "i",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            { row: 0, column: 7, position: 7 },
            "i",
            [],
            [],
          ),
        ),
        [],
        new SwitchDefaultClause(
          [
            new ExpressionStatement(
              new PostfixExpression(
                new Identifier(
                  "i",
                  new SyntaxToken(
                    TokenKind.IDENTIFIER_TOKEN,
                    { row: 0, column: 19, position: 19 },
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
                  { row: 0, column: 20, position: 20 },
                  "--",
                  [],
                  [],
                ),
              ),
              new SyntaxToken(
                TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
                { row: 0, column: 22, position: 22 },
                ";",
                [],
                [],
              ),
            ),
          ],
          new SyntaxToken(
            TokenKind.KEYWORD_DEFAULT_TOKEN,
            { row: 0, column: 10, position: 10 },
            "default",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_COLON_TOKEN,
            { row: 0, column: 17, position: 17 },
            ":",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
            { row: 0, column: 18, position: 18 },
            "{",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
            { row: 0, column: 23, position: 23 },
            "}",
            [],
            [],
          ),
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_SWITCH_TOKEN,
          { row: 0, column: 0, position: 0 },
          "switch",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          { row: 0, column: 6, position: 6 },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          { row: 0, column: 8, position: 8 },
          ")",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
          { row: 0, column: 9, position: 9 },
          "{",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
          { row: 0, column: 24, position: 24 },
          "}",
          [],
          [],
        ),
      ),
    );
  });

  test("Test switch statement pattern - multiple cases", () => {
    testSyntaxPattern(
      SWITCH_STATEMENT_RULE,
      "switch(i){case 1:break;case 2:{i++;break;}}",
      new SwitchStatement(
        new Identifier(
          "i",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            { row: 0, column: 7, position: 7 },
            "i",
            [],
            [],
          ),
        ),
        [
          new SwitchCaseClause(
            new NumberLiteral(
              NumberLiteralKind.INTEGER,
              1,
              [
                new SyntaxToken(
                  TokenKind.LITERAL_INTEGER_TOKEN,
                  { row: 0, column: 15, position: 15 },
                  "1",
                  [],
                  [],
                ),
              ],
            ),
            [],
            new SyntaxToken(
              TokenKind.KEYWORD_CASE_TOKEN,
              { row: 0, column: 10, position: 10 },
              "case",
              [],
              [
                new Trivia(
                  TokenKind.WHITESPACE_TOKEN,
                  {
                    row: 0,
                    column: 14,
                    position: 14,
                  },
                  " ",
                ),
              ],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_COLON_TOKEN,
              { row: 0, column: 16, position: 16 },
              ":",
              [],
              [],
            ),
            undefined,
            new SyntaxToken(
              TokenKind.KEYWORD_BREAK_TOKEN,
              { row: 0, column: 17, position: 17 },
              "break",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
              { row: 0, column: 22, position: 22 },
              ";",
              [],
              [],
            ),
            undefined,
          ),
          new SwitchCaseClause(
            new NumberLiteral(
              NumberLiteralKind.INTEGER,
              2,
              [
                new SyntaxToken(
                  TokenKind.LITERAL_INTEGER_TOKEN,
                  { row: 0, column: 28, position: 28 },
                  "2",
                  [],
                  [],
                ),
              ],
            ),
            [
              new ExpressionStatement(
                new PostfixExpression(
                  new Identifier(
                    "i",
                    new SyntaxToken(
                      TokenKind.IDENTIFIER_TOKEN,
                      { row: 0, column: 31, position: 31 },
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
                    { row: 0, column: 32, position: 32 },
                    "++",
                    [],
                    [],
                  ),
                ),
                new SyntaxToken(
                  TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
                  { row: 0, column: 34, position: 34 },
                  ";",
                  [],
                  [],
                ),
              ),
            ],
            new SyntaxToken(
              TokenKind.KEYWORD_CASE_TOKEN,
              { row: 0, column: 23, position: 23 },
              "case",
              [],
              [
                new Trivia(
                  TokenKind.WHITESPACE_TOKEN,
                  {
                    row: 0,
                    column: 27,
                    position: 27,
                  },
                  " ",
                ),
              ],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_COLON_TOKEN,
              { row: 0, column: 29, position: 29 },
              ":",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
              { row: 0, column: 30, position: 30 },
              "{",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.KEYWORD_BREAK_TOKEN,
              { row: 0, column: 35, position: 35 },
              "break",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
              { row: 0, column: 40, position: 40 },
              ";",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
              { row: 0, column: 41, position: 41 },
              "}",
              [],
              [],
            ),
          ),
        ],
        undefined,
        new SyntaxToken(
          TokenKind.KEYWORD_SWITCH_TOKEN,
          { row: 0, column: 0, position: 0 },
          "switch",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          { row: 0, column: 6, position: 6 },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          { row: 0, column: 8, position: 8 },
          ")",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
          { row: 0, column: 9, position: 9 },
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
    );
  });

  test("Test switch statement pattern - multiple cases and default", () => {
    testSyntaxPattern(
      SWITCH_STATEMENT_RULE,
      "switch(i){case 1:break;case 2:{i++;break;}default:i--;}",
      new SwitchStatement(
        new Identifier(
          "i",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            { row: 0, column: 7, position: 7 },
            "i",
            [],
            [],
          ),
        ),
        [
          new SwitchCaseClause(
            new NumberLiteral(
              NumberLiteralKind.INTEGER,
              1,
              [
                new SyntaxToken(
                  TokenKind.LITERAL_INTEGER_TOKEN,
                  { row: 0, column: 15, position: 15 },
                  "1",
                  [],
                  [],
                ),
              ],
            ),
            [],
            new SyntaxToken(
              TokenKind.KEYWORD_CASE_TOKEN,
              { row: 0, column: 10, position: 10 },
              "case",
              [],
              [
                new Trivia(
                  TokenKind.WHITESPACE_TOKEN,
                  {
                    row: 0,
                    column: 14,
                    position: 14,
                  },
                  " ",
                ),
              ],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_COLON_TOKEN,
              { row: 0, column: 16, position: 16 },
              ":",
              [],
              [],
            ),
            undefined,
            new SyntaxToken(
              TokenKind.KEYWORD_BREAK_TOKEN,
              { row: 0, column: 17, position: 17 },
              "break",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
              { row: 0, column: 22, position: 22 },
              ";",
              [],
              [],
            ),
            undefined,
          ),
          new SwitchCaseClause(
            new NumberLiteral(
              NumberLiteralKind.INTEGER,
              2,
              [
                new SyntaxToken(
                  TokenKind.LITERAL_INTEGER_TOKEN,
                  { row: 0, column: 28, position: 28 },
                  "2",
                  [],
                  [],
                ),
              ],
            ),
            [
              new ExpressionStatement(
                new PostfixExpression(
                  new Identifier(
                    "i",
                    new SyntaxToken(
                      TokenKind.IDENTIFIER_TOKEN,
                      { row: 0, column: 31, position: 31 },
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
                    { row: 0, column: 32, position: 32 },
                    "++",
                    [],
                    [],
                  ),
                ),
                new SyntaxToken(
                  TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
                  { row: 0, column: 34, position: 34 },
                  ";",
                  [],
                  [],
                ),
              ),
            ],
            new SyntaxToken(
              TokenKind.KEYWORD_CASE_TOKEN,
              { row: 0, column: 23, position: 23 },
              "case",
              [],
              [
                new Trivia(
                  TokenKind.WHITESPACE_TOKEN,
                  {
                    row: 0,
                    column: 27,
                    position: 27,
                  },
                  " ",
                ),
              ],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_COLON_TOKEN,
              { row: 0, column: 29, position: 29 },
              ":",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
              { row: 0, column: 30, position: 30 },
              "{",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.KEYWORD_BREAK_TOKEN,
              { row: 0, column: 35, position: 35 },
              "break",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
              { row: 0, column: 40, position: 40 },
              ";",
              [],
              [],
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
              { row: 0, column: 41, position: 41 },
              "}",
              [],
              [],
            ),
          ),
        ],
        new SwitchDefaultClause(
          [
            new ExpressionStatement(
              new PostfixExpression(
                new Identifier(
                  "i",
                  new SyntaxToken(
                    TokenKind.IDENTIFIER_TOKEN,
                    { row: 0, column: 50, position: 50 },
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
                  { row: 0, column: 51, position: 51 },
                  "--",
                  [],
                  [],
                ),
              ),
              new SyntaxToken(
                TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
                { row: 0, column: 53, position: 53 },
                ";",
                [],
                [],
              ),
            ),
          ],
          new SyntaxToken(
            TokenKind.KEYWORD_DEFAULT_TOKEN,
            { row: 0, column: 42, position: 42 },
            "default",
            [],
            [],
          ),
          new SyntaxToken(
            TokenKind.PUNCTUATOR_COLON_TOKEN,
            { row: 0, column: 49, position: 49 },
            ":",
            [],
            [],
          ),
          undefined,
          undefined,
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_SWITCH_TOKEN,
          { row: 0, column: 0, position: 0 },
          "switch",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          { row: 0, column: 6, position: 6 },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          { row: 0, column: 8, position: 8 },
          ")",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
          { row: 0, column: 9, position: 9 },
          "{",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
          { row: 0, column: 54, position: 54 },
          "}",
          [],
          [],
        ),
      ),
    );
  });
});
