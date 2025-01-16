import { apply, opt_sc, seq } from "../../../deps.ts";
import AbstractExpression from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import AbstractNode from "../../abstract_syntax_tree/node/AbstractNode.ts";
import ComputedElementaryTypeDefinition from "../../abstract_syntax_tree/node/ComputedElementaryTypeDefinition.ts";
import ElementaryType from "../../abstract_syntax_tree/node/ElementaryType.ts";
import Identifier from "../../abstract_syntax_tree/node/Identifier.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import {
  ELEMENTARY_TYPE_RULE,
  EXPRESSION_RULE,
  IDENTIFIER_RULE,
} from "../syntax_rules.ts";

function getComputedElementaryTypeDefinition(
  values: [
    SyntaxToken,
    SyntaxToken | undefined,
    ElementaryType,
    Identifier,
    [SyntaxToken, AbstractNode] | undefined,
    SyntaxToken,
  ],
): ComputedElementaryTypeDefinition {
  const [
    computedToken,
    constToken,
    elementaryType,
    identifier,
    assignmentAndValue,
    semicolonPunctuatorToken,
  ] = values;

  let value: AbstractNode | undefined;
  let assignmentToken: SyntaxToken | undefined;

  if (assignmentAndValue) {
    assignmentToken = assignmentAndValue[0];
    value = assignmentAndValue[1];
  }

  return new ComputedElementaryTypeDefinition(
    constToken !== undefined,
    elementaryType,
    identifier,
    value,
    computedToken,
    constToken,
    assignmentToken,
    semicolonPunctuatorToken,
  );
}

function getComputedElementaryTypeDefinitionPattern() {
  return apply(
    seq(
      getToken(TokenKind.KEYWORD_COMPUTED_TOKEN),
      opt_sc(
        getToken(TokenKind.KEYWORD_CONST_TOKEN),
      ),
      ELEMENTARY_TYPE_RULE,
      IDENTIFIER_RULE,
      opt_sc(
        seq(
          getToken(TokenKind.OPERATOR_ASSIGNMENT_TOKEN),
          EXPRESSION_RULE,
        ),
      ),
      getToken(TokenKind.PUNCTUATOR_SEMICOLON_TOKEN),
    ),
    getComputedElementaryTypeDefinition,
  );
}

export default getComputedElementaryTypeDefinitionPattern;
