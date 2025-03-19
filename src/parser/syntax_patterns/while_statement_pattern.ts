import { apply, seq } from "typescript-parsec";
import { WhileStatement } from "../../abstract_syntax_tree/node/WhileStatement.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import { COMPOUND_STATEMENT_RULE, EXPRESSION_RULE } from "../syntax_rules.ts";
import type { CompoundStatement } from "../../abstract_syntax_tree/node/CompoundStatement.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import type { AbstractNode } from "../../abstract_syntax_tree/node/AbstractNode.ts";
import type { AbstractExpression } from "../../abstract_syntax_tree/node/AbstractExpression.ts";

function getWhileStatement(
  values: [
    SyntaxToken,
    SyntaxToken,
    AbstractNode,
    SyntaxToken,
    CompoundStatement,
  ],
): WhileStatement {
  const [
    whileKeywordToken,
    openParenthesisToken,
    expression,
    closeParenthesisToken,
    compoundStatement,
  ] = values;

  return new WhileStatement(
    expression as AbstractExpression,
    compoundStatement,
    whileKeywordToken,
    openParenthesisToken,
    closeParenthesisToken,
  );
}

export function getWhileStatementPattern() {
  return apply(
    seq(
      getToken(TokenKind.KEYWORD_WHILE_TOKEN),
      getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
      EXPRESSION_RULE,
      getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
      COMPOUND_STATEMENT_RULE,
    ),
    getWhileStatement,
  );
}
