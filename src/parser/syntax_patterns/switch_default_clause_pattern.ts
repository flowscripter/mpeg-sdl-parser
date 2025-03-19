import { alt_sc, apply, rep_sc, seq } from "typescript-parsec";
import type { AbstractStatement } from "../../abstract_syntax_tree/node/AbstractStatement.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { STATEMENT_RULE } from "../syntax_rules.ts";
import { SwitchDefaultClause } from "../../abstract_syntax_tree/node/SwitchDefaultClause.ts";
import { InternalParserError } from "../../util/ParserError.ts";

function getSwitchDefaultClause(
  values: [
    SyntaxToken,
    SyntaxToken,
    [SyntaxToken, AbstractStatement[], SyntaxToken] | AbstractStatement[],
  ],
): SwitchDefaultClause {
  const [
    defaultToken,
    colonToken,
    body,
  ] = values;

  if (body.length === 3) {
    const potentialOpenBraceToken = body[0] as SyntaxToken;
    const potentialCloseBraceToken = body[2] as SyntaxToken;
    if (
      (potentialOpenBraceToken.tokenKind ===
        TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN) &&
      (potentialCloseBraceToken.tokenKind !==
        TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN)
    ) {
      throw new InternalParserError(
        "Invalid open brace token",
        potentialOpenBraceToken,
      );
    }
    if (
      (potentialOpenBraceToken.tokenKind !==
        TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN) &&
      (potentialCloseBraceToken.tokenKind ===
        TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN)
    ) {
      throw new InternalParserError(
        "Invalid close brace token",
        potentialCloseBraceToken,
      );
    }
    if (
      potentialOpenBraceToken.tokenKind ===
        TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN
    ) {
      const statements = body[1] as AbstractStatement[];
      return new SwitchDefaultClause(
        statements,
        defaultToken,
        colonToken,
        potentialOpenBraceToken,
        potentialCloseBraceToken,
      );
    }
  }
  return new SwitchDefaultClause(
    body as AbstractStatement[],
    defaultToken,
    colonToken,
    undefined,
    undefined,
  );
}

export function getSwitchDefaultClausePattern() {
  return apply(
    seq(
      getToken(TokenKind.KEYWORD_DEFAULT_TOKEN),
      getToken(TokenKind.PUNCTUATOR_COLON_TOKEN),
      alt_sc(
        seq(
          getToken(TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN),
          rep_sc(
            STATEMENT_RULE,
          ),
          getToken(TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN),
        ),
        rep_sc(
          STATEMENT_RULE,
        ),
      ),
    ),
    getSwitchDefaultClause,
  );
}
