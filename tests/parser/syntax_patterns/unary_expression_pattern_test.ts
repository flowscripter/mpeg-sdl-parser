import NumberLiteralKind from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import UnaryOperatorKind from "../../../src/abstract_syntax_tree/node/enum/unary_operator_kind.ts";
import Identifier from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import LengthOfExpression from "../../../src/abstract_syntax_tree/node/LengthOfExpression.ts";
import NumberLiteral from "../../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import UnaryExpression from "../../../src/abstract_syntax_tree/node/UnaryExpression.ts";
import { UNARY_EXPRESSION_RULE } from "../../../src/parser/syntax_rules.ts";
import TokenKind from "../../../src/tokenizer/enum/token_kind.ts";
import SyntaxToken from "../../../src/tokenizer/token/SyntaxToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

Deno.test("Test unary expression pattern - number literal with unary plus operator", () => {
  testSyntaxPattern(
    UNARY_EXPRESSION_RULE,
    "+1",
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
  );
});

Deno.test("Test unary expression pattern - identifier with unary minus operator", () => {
  testSyntaxPattern(
    UNARY_EXPRESSION_RULE,
    "-i",
    new UnaryExpression(
      UnaryOperatorKind.UNARY_NEGATION,
      new Identifier(
        "i",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          {
            row: 0,
            column: 1,
            position: 1,
          },
          "i",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_MINUS_TOKEN,
        {
          row: 0,
          column: 0,
          position: 0,
        },
        "-",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test unary expression pattern - lengthof operator with unary minus", () => {
  testSyntaxPattern(
    UNARY_EXPRESSION_RULE,
    "-lengthof(i)",
    new UnaryExpression(
      UnaryOperatorKind.UNARY_NEGATION,
      new LengthOfExpression(
        new Identifier(
          "i",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            {
              row: 0,
              column: 10,
              position: 10,
            },
            "i",
            [],
            [],
          ),
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_LENGTHOF_TOKEN,
          {
            row: 0,
            column: 1,
            position: 1,
          },
          "lengthof",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          {
            row: 0,
            column: 9,
            position: 9,
          },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          {
            row: 0,
            column: 11,
            position: 11,
          },
          ")",
          [],
          [],
        ),
      ),
      new SyntaxToken(
        TokenKind.OPERATOR_MINUS_TOKEN,
        {
          row: 0,
          column: 0,
          position: 0,
        },
        "-",
        [],
        [],
      ),
    ),
  );
});
