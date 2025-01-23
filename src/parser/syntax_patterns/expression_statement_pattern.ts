import { alt_sc, apply, seq } from "../../../deps.ts";
import type { AbstractNode } from "../../abstract_syntax_tree/node/AbstractNode.ts";
import { ExpressionStatement } from "../../abstract_syntax_tree/node/ExpressionStatement.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import {
  ASSIGNMENT_EXPRESSION_RULE,
  EXPRESSION_RULE,
} from "../syntax_rules.ts";

function getExpressionStatement(
  values: [
    AbstractNode,
    SyntaxToken,
  ],
): ExpressionStatement {
  const [expression, semicolonToken] = values;
  return new ExpressionStatement(
    expression,
    semicolonToken,
  );
}

export function getExpressionStatementPattern() {
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
