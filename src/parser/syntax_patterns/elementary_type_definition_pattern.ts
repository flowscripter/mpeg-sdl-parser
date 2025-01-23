import { apply, opt_sc, seq } from "../../../deps.ts";
import type { AbstractNode } from "../../abstract_syntax_tree/node/AbstractNode.ts";
import type { AlignedModifier } from "../../abstract_syntax_tree/node/AlignedModifier.ts";
import type { ElementaryType } from "../../abstract_syntax_tree/node/ElementaryType.ts";
import { ElementaryTypeDefinition } from "../../abstract_syntax_tree/node/ElementaryTypeDefinition.ts";
import type { Identifier } from "../../abstract_syntax_tree/node/Identifier.ts";
import type { LengthAttribute } from "../../abstract_syntax_tree/node/LengthAttribute.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
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
      AbstractNode,
      [SyntaxToken, AbstractNode] | undefined,
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

  let value: AbstractNode | undefined;
  let endValue: AbstractNode | undefined;
  let assignmentToken: SyntaxToken | undefined;
  let rangeOperatorToken: SyntaxToken | undefined;

  if (assignmentAndValueOrRange) {
    assignmentToken = assignmentAndValueOrRange[0];
    value = assignmentAndValueOrRange[1];
    if (assignmentAndValueOrRange[2]) {
      rangeOperatorToken = assignmentAndValueOrRange[2][0];
      endValue = assignmentAndValueOrRange[2][1];
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
    value,
    endValue,
    reservedToken,
    legacyToken,
    constToken,
    lookaheadToken,
    assignmentToken,
    rangeOperatorToken,
    semicolonPunctuatorToken,
  );
}

export function getElementaryTypeDefinitionPattern() {
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
