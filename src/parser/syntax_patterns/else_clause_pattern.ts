import { apply, seq } from "../../../deps.ts";
import type { AbstractStatement } from "../../abstract_syntax_tree/node/AbstractStatement.ts";
import { IfClause } from "../../abstract_syntax_tree/node/IfClause.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { STATEMENT_RULE } from "../syntax_rules.ts";

function getElseClause(
  values: [
    SyntaxToken,
    AbstractStatement,
  ],
): IfClause {
  const [elseToken, statement] = values;
  return new IfClause(
    undefined,
    statement,
    undefined,
    elseToken,
    undefined,
    undefined,
  );
}

export function getElseClausePattern() {
  return apply(
    seq(
      getToken(TokenKind.KEYWORD_ELSE_TOKEN),
      STATEMENT_RULE,
    ),
    getElseClause,
  );
}
