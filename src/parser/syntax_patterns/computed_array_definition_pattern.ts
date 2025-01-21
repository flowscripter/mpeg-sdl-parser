import { apply, rep_sc, seq } from "../../../deps.ts";
import ComputedArrayDefinition from "../../abstract_syntax_tree/node/ComputedArrayDefinition.ts";
import type ElementaryType from "../../abstract_syntax_tree/node/ElementaryType.ts";
import type ExplicitArrayDimension from "../../abstract_syntax_tree/node/ExplicitArrayDimension.ts";
import type Identifier from "../../abstract_syntax_tree/node/Identifier.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import {
  ELEMENTARY_TYPE_RULE,
  EXPLICIT_ARRAY_DIMENSION_RULE,
  IDENTIFIER_RULE,
} from "../syntax_rules.ts";

function getComputedArrayDefinition(
  values: [
    SyntaxToken,
    ElementaryType,
    Identifier,
    ExplicitArrayDimension[],
    SyntaxToken,
  ],
): ComputedArrayDefinition {
  const [
    computedToken,
    elementaryType,
    identifier,
    explicitArrayDimensions,
    semicolonPunctuatorToken,
  ] = values;

  return new ComputedArrayDefinition(
    elementaryType,
    identifier,
    explicitArrayDimensions,
    computedToken,
    semicolonPunctuatorToken,
  );
}

function getComputedArrayDefinitionPattern() {
  return apply(
    seq(
      getToken(TokenKind.KEYWORD_COMPUTED_TOKEN),
      ELEMENTARY_TYPE_RULE,
      IDENTIFIER_RULE,
      rep_sc(
        EXPLICIT_ARRAY_DIMENSION_RULE,
      ),
      getToken(TokenKind.PUNCTUATOR_SEMICOLON_TOKEN),
    ),
    getComputedArrayDefinition,
  );
}

export default getComputedArrayDefinitionPattern;
