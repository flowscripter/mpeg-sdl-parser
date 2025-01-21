import { alt_sc, apply, seq } from "../../../deps.ts";
import type AbstractExpression from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import type AbstractNode from "../../abstract_syntax_tree/node/AbstractNode.ts";
import type AbstractStatement from "../../abstract_syntax_tree/node/AbstractStatement.ts";
import type CompoundStatement from "../../abstract_syntax_tree/node/CompoundStatement.ts";
import type ComputedElementaryTypeDefinition from "../../abstract_syntax_tree/node/ComputedElementaryTypeDefinition.ts";
import NodeKind from "../../abstract_syntax_tree/node/enum/node_kind.ts";
import ForStatement from "../../abstract_syntax_tree/node/ForStatement.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import {
  ASSIGNMENT_EXPRESSION_RULE,
  COMPOUND_STATEMENT_RULE,
  COMPUTED_ELEMENTARY_TYPE_DEFINITION_RULE,
  EXPRESSION_RULE,
} from "../syntax_rules.ts";

function getForStatement(
  values: [
    SyntaxToken,
    SyntaxToken,
    (
      | [AbstractExpression, SyntaxToken]
      | AbstractStatement
      | SyntaxToken
    ),
    AbstractNode,
    SyntaxToken,
    AbstractNode,
    SyntaxToken,
    CompoundStatement,
  ],
): ForStatement {
  const [
    forKeywordToken,
    openParenthesisToken,
    expression1OrComputedElementaryDefinitionOrSemicolon1Token,
    expression2,
    semicolonToken2,
    expression3,
    closeParenthesisToken,
    compoundStatement,
  ] = values;

  let expression1;
  let computedElementaryDefinition;
  let semicolonToken1;
  if (
    Array.isArray(expression1OrComputedElementaryDefinitionOrSemicolon1Token)
  ) {
    [expression1, semicolonToken1] =
      expression1OrComputedElementaryDefinitionOrSemicolon1Token;
  } else if (
    (expression1OrComputedElementaryDefinitionOrSemicolon1Token as ComputedElementaryTypeDefinition)
      .nodeKind === NodeKind.STATEMENT
  ) {
    computedElementaryDefinition =
      expression1OrComputedElementaryDefinitionOrSemicolon1Token as ComputedElementaryTypeDefinition;
  } else {
    semicolonToken1 =
      expression1OrComputedElementaryDefinitionOrSemicolon1Token as SyntaxToken;
  }

  return new ForStatement(
    expression1,
    computedElementaryDefinition,
    expression2 as AbstractExpression,
    expression3 as AbstractExpression,
    compoundStatement,
    forKeywordToken,
    openParenthesisToken,
    semicolonToken1,
    semicolonToken2,
    closeParenthesisToken,
  );
}

function getForStatementPattern() {
  return apply(
    seq(
      getToken(TokenKind.KEYWORD_FOR_TOKEN),
      getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
      alt_sc(
        seq(
          ASSIGNMENT_EXPRESSION_RULE,
          getToken(TokenKind.PUNCTUATOR_SEMICOLON_TOKEN),
        ),
        COMPUTED_ELEMENTARY_TYPE_DEFINITION_RULE,
        getToken(TokenKind.PUNCTUATOR_SEMICOLON_TOKEN),
      ),
      EXPRESSION_RULE,
      getToken(TokenKind.PUNCTUATOR_SEMICOLON_TOKEN),
      EXPRESSION_RULE,
      getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
      COMPOUND_STATEMENT_RULE,
    ),
    getForStatement,
  );
}

export default getForStatementPattern;
