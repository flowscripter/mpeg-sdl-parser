import { apply, seq } from "../../../deps.ts";
import type { AbstractNode } from "../../abstract_syntax_tree/node/AbstractNode.ts";
import type { AbstractStatement } from "../../abstract_syntax_tree/node/AbstractStatement.ts";
import { IfClause } from "../../abstract_syntax_tree/node/IfClause.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { EXPRESSION_RULE, STATEMENT_RULE } from "../syntax_rules.ts";

function getElseIfClause(
  values: [
    SyntaxToken,
    SyntaxToken,
    SyntaxToken,
    AbstractNode,
    SyntaxToken,
    AbstractStatement,
  ],
): IfClause {
  const [
    elseToken,
    ifToken,
    openParenthesisToken,
    condition,
    closeParenthesisToken,
    statement,
  ] = values;
  return new IfClause(
    condition,
    statement,
    ifToken,
    elseToken,
    openParenthesisToken,
    closeParenthesisToken,
  );
}

export function getElseIfClausePattern() {
  return apply(
    seq(
      getToken(TokenKind.KEYWORD_ELSE_TOKEN),
      getToken(TokenKind.KEYWORD_IF_TOKEN),
      getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
      EXPRESSION_RULE,
      getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
      STATEMENT_RULE,
    ),
    getElseIfClause,
  );
}
