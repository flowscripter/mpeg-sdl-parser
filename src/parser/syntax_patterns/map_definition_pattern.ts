import { alt_sc, apply, opt_sc, seq } from "../../../deps.ts";
import ElementaryType from "../../abstract_syntax_tree/node/ElementaryType.ts";
import NodeKind from "../../abstract_syntax_tree/node/enum/node_kind.ts";
import Identifier from "../../abstract_syntax_tree/node/Identifier.ts";
import MapDefinition from "../../abstract_syntax_tree/node/MapDefinition.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { ELEMENTARY_TYPE_RULE, IDENTIFIER_RULE } from "../syntax_rules.ts";

function getMapDefinition(
  values: [
    SyntaxToken | undefined,
    SyntaxToken | undefined,
    ElementaryType | Identifier,
    SyntaxToken,
    Identifier,
    SyntaxToken,
    Identifier,
    SyntaxToken,
  ],
): MapDefinition {
  const [
    reservedSyntaxToken,
    legacySyntaxToken,
    elementaryTypeOrClassIdentifier,
    openParenthesisToken,
    mapIdentifier,
    closeParenthesisToken,
    identifier,
    semicolonSyntaxToken,
  ] = values;

  let elementaryType: ElementaryType | undefined;
  let classIdentifier: Identifier | undefined;
  if (elementaryTypeOrClassIdentifier.nodeKind === NodeKind.ELEMENTARY_TYPE) {
    elementaryType = elementaryTypeOrClassIdentifier as ElementaryType;
  } else {
    classIdentifier = elementaryTypeOrClassIdentifier as Identifier;
  }

  return new MapDefinition(
    reservedSyntaxToken !== undefined,
    legacySyntaxToken !== undefined,
    elementaryType,
    classIdentifier,
    mapIdentifier,
    identifier,
    reservedSyntaxToken,
    legacySyntaxToken,
    openParenthesisToken,
    closeParenthesisToken,
    semicolonSyntaxToken,
  );
}

function getMapDefinitionPattern() {
  return apply(
    seq(
      opt_sc(
        getToken(TokenKind.KEYWORD_RESERVED_TOKEN),
      ),
      opt_sc(
        getToken(TokenKind.KEYWORD_LEGACY_TOKEN),
      ),
      alt_sc(
        ELEMENTARY_TYPE_RULE,
        IDENTIFIER_RULE,
      ),
      getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
      IDENTIFIER_RULE,
      getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
      IDENTIFIER_RULE,
      getToken(TokenKind.PUNCTUATOR_SEMICOLON_TOKEN),
    ),
    getMapDefinition,
  );
}

export default getMapDefinitionPattern;
