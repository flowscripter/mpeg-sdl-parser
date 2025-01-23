import { apply } from "../../../deps.ts";
import { WhileStatement } from "../../abstract_syntax_tree/node/WhileStatement.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";

function getWhileStatement(): WhileStatement {
  return new WhileStatement();
}

export function getWhileStatementPattern() {
  return apply(
    getToken(TokenKind.KEYWORD_WHILE_TOKEN),
    getWhileStatement,
  );
}
