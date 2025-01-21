import { apply, seq } from "../../../deps.ts";
import type AbstractNode from "../../abstract_syntax_tree/node/AbstractNode.ts";
import type CompoundStatement from "../../abstract_syntax_tree/node/CompoundStatement.ts";
import DoStatement from "../../abstract_syntax_tree/node/DoStatement.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { COMPOUND_STATEMENT_RULE, EXPRESSION_RULE } from "../syntax_rules.ts";

function getDoStatement(
  values: [
    SyntaxToken,
    CompoundStatement,
    SyntaxToken,
    SyntaxToken,
    AbstractNode,
    SyntaxToken,
    SyntaxToken,
  ],
): DoStatement {
  const [
    doKeywordToken,
    compoundStatement,
    whileKeywordToken,
    openParenthesisToken,
    conditionExpression,
    closeParenthesisToken,
    semicolonToken,
  ] = values;
  return new DoStatement(
    compoundStatement,
    conditionExpression,
    doKeywordToken,
    whileKeywordToken,
    openParenthesisToken,
    closeParenthesisToken,
    semicolonToken,
  );
}

function getDoStatementPattern() {
  return apply(
    seq(
      getToken(TokenKind.KEYWORD_DO_TOKEN),
      COMPOUND_STATEMENT_RULE,
      getToken(TokenKind.KEYWORD_WHILE_TOKEN),
      getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
      EXPRESSION_RULE,
      getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
      getToken(TokenKind.PUNCTUATOR_SEMICOLON_TOKEN),
    ),
    getDoStatement,
  );
}

export default getDoStatementPattern;
