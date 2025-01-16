import { apply } from "../../../deps.ts";
import DoStatement from "../../abstract_syntax_tree/node/DoStatement.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";

function getDoStatement(): DoStatement {
  return new DoStatement();
}

function getDoStatementPattern() {
  return apply(
    getToken(TokenKind.KEYWORD_DO_TOKEN),
    getDoStatement,
  );
}

export default getDoStatementPattern;
