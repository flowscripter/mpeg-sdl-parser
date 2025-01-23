import { apply } from "typescript-parsec";
import { SwitchStatement } from "../../abstract_syntax_tree/node/SwitchStatement.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";

function getSwitchStatement(): SwitchStatement {
  return new SwitchStatement();
}

export function getSwitchStatementPattern() {
  return apply(
    getToken(TokenKind.KEYWORD_SWITCH_TOKEN),
    getSwitchStatement,
  );
}
