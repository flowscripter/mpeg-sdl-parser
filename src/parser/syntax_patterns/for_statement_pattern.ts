import { apply } from "../../../deps.ts";
import ForStatement from "../../abstract_syntax_tree/node/ForStatement.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";

function getForStatement(): ForStatement {
  return new ForStatement();
}

function getForStatementPattern() {
  return apply(
    getToken(TokenKind.KEYWORD_FOR_TOKEN),
    getForStatement,
  );
}

export default getForStatementPattern;
