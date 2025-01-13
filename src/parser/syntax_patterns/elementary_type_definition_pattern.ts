import { apply, opt_sc, seq } from "../../../deps.ts";
import AbstractExpression from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import AlignedModifier from "../../abstract_syntax_tree/node/AlignedModifier.ts";
import ElementaryType from "../../abstract_syntax_tree/node/ElementaryType.ts";
import ElementaryTypeDefinition from "../../abstract_syntax_tree/node/ElementaryTypeDefinition.ts";
import Identifier from "../../abstract_syntax_tree/node/Identifier.ts";
import LengthAttribute from "../../abstract_syntax_tree/node/LengthAttribute.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { SyntacticParserError } from "../../util/ParserError.ts";
import {
  ALIGNED_MODIFIER_RULE,
  ELEMENTARY_TYPE_RULE,
  EXPRESSION_RULE,
  IDENTIFIER_RULE,
  LENGTH_ATTRIBUTE_RULE,
} from "../syntax_rules.ts";

function getElementaryTypeDefinition(
  values: [
    SyntaxToken | undefined,
    SyntaxToken | undefined,
    SyntaxToken | undefined,
    AlignedModifier | undefined,
    ElementaryType,
    LengthAttribute,
    SyntaxToken | undefined,
    Identifier,
    [
      SyntaxToken,
      AbstractExpression,
      [SyntaxToken, AbstractExpression] | undefined,
    ] | undefined,
    SyntaxToken,
  ],
): ElementaryTypeDefinition {
  const [
    reservedToken,
    legacyToken,
    constToken,
    alignedModifier,
    elementaryType,
    lengthAttribute,
    lookaheadToken,
    identifier,
    assignmentAndValueOrRange,
    semicolonPunctuatorToken,
  ] = values;

  if (reservedToken && legacyToken) {
    throw new SyntacticParserError(
      "An elementary type variable cannot be both reserved and legacy",
      reservedToken,
    );
  }

  let valueExpression: AbstractExpression | undefined;
  let endValueExpression: AbstractExpression | undefined;
  let assignmentToken: SyntaxToken | undefined;
  let rangeOperatorToken: SyntaxToken | undefined;

  if (assignmentAndValueOrRange) {
    assignmentToken = assignmentAndValueOrRange[0];
    valueExpression = assignmentAndValueOrRange[1];
    if (assignmentAndValueOrRange[2]) {
      rangeOperatorToken = assignmentAndValueOrRange[2][0];
      endValueExpression = assignmentAndValueOrRange[2][1];
    }
  }

  return new ElementaryTypeDefinition(
    reservedToken !== undefined,
    legacyToken !== undefined,
    constToken !== undefined,
    alignedModifier,
    elementaryType,
    lengthAttribute,
    lookaheadToken !== undefined,
    identifier,
    valueExpression,
    endValueExpression,
    reservedToken,
    legacyToken,
    constToken,
    lookaheadToken,
    assignmentToken,
    rangeOperatorToken,
    semicolonPunctuatorToken,
  );
}

function getElementaryTypeDefinitionPattern() {
  return apply(
    seq(
      opt_sc(
        getToken(TokenKind.KEYWORD_RESERVED_TOKEN),
      ),
      opt_sc(
        getToken(TokenKind.KEYWORD_LEGACY_TOKEN),
      ),
      opt_sc(
        getToken(TokenKind.KEYWORD_CONST_TOKEN),
      ),
      opt_sc(
        ALIGNED_MODIFIER_RULE,
      ),
      ELEMENTARY_TYPE_RULE,
      LENGTH_ATTRIBUTE_RULE,
      opt_sc(
        getToken(TokenKind.OPERATOR_MULTIPLY_TOKEN),
      ),
      IDENTIFIER_RULE,
      opt_sc(
        seq(
          getToken(TokenKind.OPERATOR_ASSIGNMENT_TOKEN),
          EXPRESSION_RULE,
          opt_sc(
            seq(
              getToken(TokenKind.OPERATOR_RANGE_TOKEN),
              EXPRESSION_RULE,
            ),
          ),
        ),
      ),
      getToken(TokenKind.PUNCTUATOR_SEMICOLON_TOKEN),
    ),
    getElementaryTypeDefinition,
  );
}

export default getElementaryTypeDefinitionPattern;
