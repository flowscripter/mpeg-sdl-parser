import { BinaryExpression } from "../../../src/abstract_syntax_tree/node/BinaryExpression.ts";
import { CompoundStatement } from "../../../src/abstract_syntax_tree/node/CompoundStatement.ts";
import { ComputedElementaryTypeDefinition } from "../../../src/abstract_syntax_tree/node/ComputedElementaryTypeDefinition.ts";
import { ElementaryType } from "../../../src/abstract_syntax_tree/node/ElementaryType.ts";
import { BinaryOperatorKind } from "../../../src/abstract_syntax_tree/node/enum/binary_operator_kind.ts";
import { ElementaryTypeKind } from "../../../src/abstract_syntax_tree/node/enum/elementary_type_kind.ts";
import { NumberLiteralKind } from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import { PostfixOperatorKind } from "../../../src/abstract_syntax_tree/node/enum/postfix_operator_kind.ts";
import { ExpressionStatement } from "../../../src/abstract_syntax_tree/node/ExpressionStatement.ts";
import { ForStatement } from "../../../src/abstract_syntax_tree/node/ForStatement.ts";
import { Identifier } from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import { NumberLiteral } from "../../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import { PostfixExpression } from "../../../src/abstract_syntax_tree/node/PostfixExpression.ts";
import { FOR_STATEMENT_RULE } from "../../../src/parser/syntax_rules.ts";
import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

Deno.test("Test for statement pattern - expression1 is expression", () => {
  testSyntaxPattern(
    FOR_STATEMENT_RULE,
    "for (i=1;i<9;i++) {j++;}",
    new ForStatement(
      new BinaryExpression(
        new Identifier(
          "i",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            { row: 0, column: 5, position: 5 },
            "i",
            [],
            [],
          ),
        ),
        BinaryOperatorKind.ASSIGNMENT,
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          1,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              { row: 0, column: 7, position: 7 },
              "1",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
          { row: 0, column: 6, position: 6 },
          "=",
          [],
          [],
        ),
      ),
      undefined,
      new BinaryExpression(
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
        BinaryOperatorKind.LESS_THAN,
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          9,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              { row: 0, column: 11, position: 11 },
              "9",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_LESS_THAN_TOKEN,
          { row: 0, column: 10, position: 10 },
          "<",
          [],
          [],
        ),
      ),
      new PostfixExpression(
        new Identifier(
          "i",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            { row: 0, column: 13, position: 13 },
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
          { row: 0, column: 14, position: 14 },
          "++",
          [],
          [],
        ),
      ),
      new CompoundStatement(
        [
          new ExpressionStatement(
            new PostfixExpression(
              new Identifier(
                "j",
                new SyntaxToken(
                  TokenKind.IDENTIFIER_TOKEN,
                  { row: 0, column: 19, position: 19 },
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
                { row: 0, column: 20, position: 20 },
                "++",
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
        TokenKind.KEYWORD_FOR_TOKEN,
        { row: 0, column: 0, position: 0 },
        "for",
        [],
        [
          new Trivia(TokenKind.WHITESPACE_TOKEN, {
            row: 0,
            column: 3,
            position: 3,
          }, " "),
        ],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
        { row: 0, column: 4, position: 4 },
        "(",
        [],
        [],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
        { row: 0, column: 8, position: 8 },
        ";",
        [],
        [],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
        { row: 0, column: 12, position: 12 },
        ";",
        [],
        [],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
        { row: 0, column: 16, position: 16 },
        ")",
        [],
        [
          new Trivia(TokenKind.WHITESPACE_TOKEN, {
            row: 0,
            column: 17,
            position: 17,
          }, " "),
        ],
      ),
    ),
  );
});

Deno.test("Test for statement pattern - expression1 is computed elementary type definition", () => {
  testSyntaxPattern(
    FOR_STATEMENT_RULE,
    "for (computed int i=1;i<9;i++) {j++;}",
    new ForStatement(
      undefined,
      new ComputedElementaryTypeDefinition(
        false,
        new ElementaryType(
          ElementaryTypeKind.INTEGER,
          undefined,
          new SyntaxToken(
            TokenKind.KEYWORD_INT_TOKEN,
            { row: 0, column: 14, position: 14 },
            "int",
            [],
            [
              new Trivia(TokenKind.WHITESPACE_TOKEN, {
                row: 0,
                column: 17,
                position: 17,
              }, " "),
            ],
          ),
        ),
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
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          1,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              { row: 0, column: 20, position: 20 },
              "1",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_COMPUTED_TOKEN,
          { row: 0, column: 5, position: 5 },
          "computed",
          [],
          [
            new Trivia(TokenKind.WHITESPACE_TOKEN, {
              row: 0,
              column: 13,
              position: 13,
            }, " "),
          ],
        ),
        undefined,
        new SyntaxToken(
          TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
          { row: 0, column: 19, position: 19 },
          "=",
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
        BinaryOperatorKind.LESS_THAN,
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          9,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              { row: 0, column: 24, position: 24 },
              "9",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_LESS_THAN_TOKEN,
          { row: 0, column: 23, position: 23 },
          "<",
          [],
          [],
        ),
      ),
      new PostfixExpression(
        new Identifier(
          "i",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            { row: 0, column: 26, position: 26 },
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
          { row: 0, column: 27, position: 27 },
          "++",
          [],
          [],
        ),
      ),
      new CompoundStatement(
        [
          new ExpressionStatement(
            new PostfixExpression(
              new Identifier(
                "j",
                new SyntaxToken(
                  TokenKind.IDENTIFIER_TOKEN,
                  { row: 0, column: 32, position: 32 },
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
                { row: 0, column: 33, position: 33 },
                "++",
                [],
                [],
              ),
            ),
            new SyntaxToken(
              TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
              { row: 0, column: 35, position: 35 },
              ";",
              [],
              [],
            ),
          ),
        ],
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
          { row: 0, column: 31, position: 31 },
          "{",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
          { row: 0, column: 36, position: 36 },
          "}",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.KEYWORD_FOR_TOKEN,
        { row: 0, column: 0, position: 0 },
        "for",
        [],
        [
          new Trivia(TokenKind.WHITESPACE_TOKEN, {
            row: 0,
            column: 3,
            position: 3,
          }, " "),
        ],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
        { row: 0, column: 4, position: 4 },
        "(",
        [],
        [],
      ),
      undefined,
      new SyntaxToken(
        TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
        { row: 0, column: 25, position: 25 },
        ";",
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
    ),
  );
});

// Deno.test("Test for statement pattern - expression1 is empty", () => {
//   testSyntaxPattern(
//     FOR_STATEMENT_RULE,
//     "for (;i<2;i++) {j++}",
//     new ForStatement(
//       undefined,
//       undefined,
//       new BinaryExpression(),
//       new PostfixExpression(),
//       new CompoundStatement(),
//       new SyntaxToken(),
//       new SyntaxToken(),
//       new SyntaxToken(),
//       new SyntaxToken(),
//       new SyntaxToken()
//     )
//   );
// });
