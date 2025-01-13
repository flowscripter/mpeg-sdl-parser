import { alt_sc, apply, seq } from "../../../deps.ts";
import AbstractExpression from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import ExpressionStatement from "../../abstract_syntax_tree/node/ExpressionStatement.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import {
  ASSIGNMENT_EXPRESSION_RULE,
  EXPRESSION_RULE,
} from "../syntax_rules.ts";

function getExpressionStatement(
  values: [
    AbstractExpression,
    SyntaxToken,
  ],
): ExpressionStatement {
  const [abstractExpression, semicolonToken] = values;
  return new ExpressionStatement(
    abstractExpression,
    semicolonToken,
  );
}

function getExpressionStatementPattern() {
  return apply(
    seq(
      alt_sc(
        ASSIGNMENT_EXPRESSION_RULE,
        EXPRESSION_RULE,
      ),
      getToken(TokenKind.PUNCTUATOR_SEMICOLON_TOKEN),
    ),
    getExpressionStatement,
  );
}

export default getExpressionStatementPattern;
