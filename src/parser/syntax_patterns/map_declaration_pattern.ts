import { alt_sc, apply, seq } from "../../../deps.ts";
import ElementaryType from "../../abstract_syntax_tree/node/ElementaryType.ts";
import NodeKind from "../../abstract_syntax_tree/node/enum/node_kind.ts";
import Identifier from "../../abstract_syntax_tree/node/Identifier.ts";
import MapDeclaration from "../../abstract_syntax_tree/node/MapDeclaration.ts";
import MapEntryList from "../../abstract_syntax_tree/node/MapEntryList.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import {
  ELEMENTARY_TYPE_RULE,
  IDENTIFIER_RULE,
  MAP_ENTRY_LIST_RULE,
} from "../syntax_rules.ts";

function getMapDeclaration(
  values: [
    SyntaxToken,
    Identifier,
    SyntaxToken,
    (Identifier | ElementaryType),
    SyntaxToken,
    MapEntryList,
  ],
): MapDeclaration {
  const [
    mapToken,
    identifier,
    openParenthesisToken,
    elementaryTypeOrClassIdentifier,
    closeParenthesisToken,
    mapEntryList,
  ] = values;

  let outputElementaryType: ElementaryType | undefined;
  let outputClassIdentifier: Identifier | undefined;
  if (elementaryTypeOrClassIdentifier.nodeKind === NodeKind.ELEMENTARY_TYPE) {
    outputElementaryType = elementaryTypeOrClassIdentifier as ElementaryType;
  } else {
    outputClassIdentifier = elementaryTypeOrClassIdentifier as Identifier;
  }

  return new MapDeclaration(
    identifier,
    outputElementaryType,
    outputClassIdentifier,
    mapEntryList,
    mapToken,
    openParenthesisToken,
    closeParenthesisToken,
  );
}

function getMapDeclarationPattern() {
  return apply(
    seq(
      getToken(TokenKind.KEYWORD_MAP_TOKEN),
      IDENTIFIER_RULE,
      getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
      alt_sc(
        IDENTIFIER_RULE,
        ELEMENTARY_TYPE_RULE,
      ),
      getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
      MAP_ENTRY_LIST_RULE,
    ),
    getMapDeclaration,
  );
}

export default getMapDeclarationPattern;
