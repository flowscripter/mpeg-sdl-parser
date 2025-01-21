import { apply, rep_sc, seq } from "../../../deps.ts";
import type AbstractStatement from "../../abstract_syntax_tree/node/AbstractStatement.ts";
import CompoundStatement from "../../abstract_syntax_tree/node/CompoundStatement.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { STATEMENT_RULE } from "../syntax_rules.ts";

function getCompoundStatement(
  values: [SyntaxToken, statements: AbstractStatement[], SyntaxToken],
): CompoundStatement {
  const [openBracePunctuatorToken, statements, closeBracePunctuatorToken] =
    values;
  return new CompoundStatement(
    statements,
    openBracePunctuatorToken,
    closeBracePunctuatorToken,
  );
}

function getCompoundStatementPattern() {
  return apply(
    seq(
      getToken(TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN),
      rep_sc(
        STATEMENT_RULE,
      ),
      getToken(TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN),
    ),
    getCompoundStatement,
  );
}

export default getCompoundStatementPattern;
