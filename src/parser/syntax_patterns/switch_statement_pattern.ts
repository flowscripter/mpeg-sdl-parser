import { apply, opt_sc, rep_sc, seq } from "typescript-parsec";
import { SwitchStatement } from "../../abstract_syntax_tree/node/SwitchStatement.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import {
  EXPRESSION_RULE,
  SWITCH_CASE_CLAUSE_RULE,
  SWITCH_DEFAULT_CLAUSE_RULE,
} from "../syntax_rules.ts";
import { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { SwitchCaseClause } from "../../abstract_syntax_tree/node/SwitchCaseClause.ts";
import { SwitchDefaultClause } from "../../abstract_syntax_tree/node/SwitchDefaultClause.ts";
import { AbstractExpression } from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import { AbstractNode } from "../../abstract_syntax_tree/node/AbstractNode.ts";

function getSwitchStatement(
  values: [
    SyntaxToken,
    SyntaxToken,
    AbstractNode,
    SyntaxToken,
    SyntaxToken,
    SwitchCaseClause[],
    SwitchDefaultClause | undefined,
    SyntaxToken,
  ],
): SwitchStatement {
  const [
    switchKeywordToken,
    openParenthesisToken,
    expression,
    closeParenthesisToken,
    openBraceToken,
    switchCaseClauses,
    switchDefaultClause,
    closeBraceToken,
  ] = values;
  return new SwitchStatement(
    expression as AbstractExpression,
    switchCaseClauses,
    switchDefaultClause,
    switchKeywordToken,
    openParenthesisToken,
    closeParenthesisToken,
    openBraceToken,
    closeBraceToken,
  );
}

export function getSwitchStatementPattern() {
  return apply(
    seq(
      getToken(TokenKind.KEYWORD_SWITCH_TOKEN),
      getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
      EXPRESSION_RULE,
      getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
      getToken(TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN),
      rep_sc(
        SWITCH_CASE_CLAUSE_RULE,
      ),
      opt_sc(
        SWITCH_DEFAULT_CLAUSE_RULE,
      ),
      getToken(TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN),
    ),
    getSwitchStatement,
  );
}
