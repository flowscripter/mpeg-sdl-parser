import { apply } from "../../../deps.ts";
import IfStatement from "../../abstract_syntax_tree/node/IfStatement.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";

function getIfStatement(): IfStatement {
  return new IfStatement();
}

function getIfStatementPattern() {
  return apply(
    getToken(TokenKind.KEYWORD_IF_TOKEN),
    getIfStatement,
  );
}

export default getIfStatementPattern;
