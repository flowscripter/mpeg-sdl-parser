import { apply } from "../../../deps.ts";
import SwitchStatement from "../../abstract_syntax_tree/node/SwitchStatement.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";

function getSwitchStatement(): SwitchStatement {
  return new SwitchStatement();
}

function getSwitchStatementPattern() {
  return apply(
    getToken(TokenKind.KEYWORD_SWITCH_TOKEN),
    getSwitchStatement,
  );
}

export default getSwitchStatementPattern;
