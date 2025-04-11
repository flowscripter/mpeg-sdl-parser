import { alt_sc, apply, opt_sc, rep_sc, seq } from "typescript-parsec";
import type { AbstractStatement } from "../../abstract_syntax_tree/node/AbstractStatement.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { SwitchCaseClause } from "../../abstract_syntax_tree/node/SwitchCaseClause.ts";
import type { NumberLiteral } from "../../abstract_syntax_tree/node/NumberLiteral.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { NUMBER_LITERAL_RULE } from "../syntax_rules.ts";
import { STATEMENT_RULE } from "../syntax_rules.ts";

function getSwitchCaseClause(
  values: [
    SyntaxToken,
    NumberLiteral,
    SyntaxToken,
    | [
      SyntaxToken,
      AbstractStatement[],
      [SyntaxToken, SyntaxToken] | undefined,
      SyntaxToken,
    ]
    | [AbstractStatement[], [SyntaxToken, SyntaxToken] | undefined],
  ],
): SwitchCaseClause {
  const [
    caseToken,
    value,
    colonToken,
    body,
  ] = values;

  if (body.length === 4) {
    const [
      openBraceToken,
      statements,
      breakAndSemicolonTokens,
      closeBraceToken,
    ] = body;

    let breakToken: SyntaxToken | undefined;
    let semicolonToken: SyntaxToken | undefined;

    if (breakAndSemicolonTokens) {
      [breakToken, semicolonToken] = breakAndSemicolonTokens;
    }

    return new SwitchCaseClause(
      value,
      statements,
      caseToken,
      colonToken,
      openBraceToken,
      breakToken,
      semicolonToken,
      closeBraceToken,
    );
  } else {
    const [
      statements,
      breakAndSemicolonTokens,
    ] = body;

    let breakToken: SyntaxToken | undefined;
    let semicolonToken: SyntaxToken | undefined;

    if (breakAndSemicolonTokens) {
      [breakToken, semicolonToken] = breakAndSemicolonTokens;
    }

    return new SwitchCaseClause(
      value,
      statements,
      caseToken,
      colonToken,
      undefined,
      breakToken,
      semicolonToken,
      undefined,
    );
  }
}

export function getSwitchCaseClausePattern() {
  return apply(
    seq(
      getToken(TokenKind.KEYWORD_CASE_TOKEN),
      NUMBER_LITERAL_RULE,
      getToken(TokenKind.PUNCTUATOR_COLON_TOKEN),
      alt_sc(
        seq(
          getToken(TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN),
          rep_sc(
            STATEMENT_RULE,
          ),
          opt_sc(
            seq(
              getToken(TokenKind.KEYWORD_BREAK_TOKEN),
              getToken(TokenKind.PUNCTUATOR_SEMICOLON_TOKEN),
            ),
          ),
          getToken(TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN),
        ),
        seq(
          rep_sc(
            STATEMENT_RULE,
          ),
          opt_sc(
            seq(
              getToken(TokenKind.KEYWORD_BREAK_TOKEN),
              getToken(TokenKind.PUNCTUATOR_SEMICOLON_TOKEN),
            ),
          ),
        ),
      ),
    ),
    getSwitchCaseClause,
  );
}
