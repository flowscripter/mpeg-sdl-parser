import { alt_sc, apply, opt_sc, rep_sc, seq } from "../../../deps.ts";
import type AlignedModifier from "../../abstract_syntax_tree/node/AlignedModifier.ts";
import ArrayDefinition from "../../abstract_syntax_tree/node/ArrayDefinition.ts";
import type ArrayElementType from "../../abstract_syntax_tree/node/ArrayElementType.ts";
import type ExplicitArrayDimension from "../../abstract_syntax_tree/node/ExplicitArrayDimension.ts";
import type Identifier from "../../abstract_syntax_tree/node/Identifier.ts";
import type ImplicitArrayDimension from "../../abstract_syntax_tree/node/ImplicitArrayDimension.ts";
import type PartialArrayDimension from "../../abstract_syntax_tree/node/PartialArrayDimension.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import {
  InternalParserError,
  SyntacticParserError,
} from "../../util/ParserError.ts";
import {
  ALIGNED_MODIFIER_RULE,
  ARRAY_ELEMENT_TYPE_RULE,
  EXPLICIT_ARRAY_DIMENSION_RULE,
  IDENTIFIER_RULE,
  IMPLICIT_ARRAY_DIMENSION_RULE,
  PARTIAL_ARRAY_DIMENSION_RULE,
} from "../syntax_rules.ts";

function getArrayDefinition(
  values: [
    SyntaxToken | undefined,
    SyntaxToken | undefined,
    AlignedModifier | undefined,
    ArrayElementType,
    Identifier,
    ImplicitArrayDimension | undefined,
    (ExplicitArrayDimension | PartialArrayDimension)[],
    SyntaxToken,
  ],
): ArrayDefinition {
  const [
    reservedToken,
    legacyToken,
    alignedModifier,
    arrayElementType,
    identifier,
    implicitArrayDimension,
    dimensions,
    semicolonPunctuatorToken,
  ] = values;

  if ((implicitArrayDimension !== undefined) && (dimensions.length > 0)) {
    throw new SyntacticParserError(
      "An array cannot define both implict and explicit dimensions",
      implicitArrayDimension.openBracketToken,
    );
  }

  if (implicitArrayDimension === undefined && (dimensions.length === 0)) {
    throw new InternalParserError(
      "Array parsed with no dimensions defined",
      identifier.token,
    );
  }

  return new ArrayDefinition(
    reservedToken !== undefined,
    legacyToken !== undefined,
    alignedModifier,
    arrayElementType,
    identifier,
    implicitArrayDimension,
    dimensions.length > 0 ? dimensions : undefined,
    reservedToken,
    legacyToken,
    semicolonPunctuatorToken,
  );
}

function getArrayDefinitionPattern() {
  return apply(
    seq(
      opt_sc(
        getToken(TokenKind.KEYWORD_RESERVED_TOKEN),
      ),
      opt_sc(
        getToken(TokenKind.KEYWORD_LEGACY_TOKEN),
      ),
      opt_sc(
        ALIGNED_MODIFIER_RULE,
      ),
      ARRAY_ELEMENT_TYPE_RULE,
      IDENTIFIER_RULE,
      opt_sc(
        IMPLICIT_ARRAY_DIMENSION_RULE,
      ),
      // rep_sc parses empty array which is equivalent to wrapping in opt_sc
      rep_sc(
        alt_sc(
          EXPLICIT_ARRAY_DIMENSION_RULE,
          PARTIAL_ARRAY_DIMENSION_RULE,
        ),
      ),
      getToken(TokenKind.PUNCTUATOR_SEMICOLON_TOKEN),
    ),
    getArrayDefinition,
  );
}

export default getArrayDefinitionPattern;
