import NumberLiteralKind from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import UnaryOperatorKind from "../../../src/abstract_syntax_tree/node/enum/unary_operator_kind.ts";
import Identifier from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import NumberLiteral from "../../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import UnaryExpression from "../../../src/abstract_syntax_tree/node/UnaryExpression.ts";
import {
  EXPRESSION_RULE,
  UNARY_EXPRESSION_RULE,
} from "../../../src/parser/syntax_rules.ts";
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
