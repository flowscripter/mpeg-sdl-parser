import { alt_sc, apply, seq } from "../../../deps.ts";
import { ElementaryType } from "../../abstract_syntax_tree/node/ElementaryType.ts";
import { ElementaryTypeKind } from "../../abstract_syntax_tree/node/enum/elementary_type_kind.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";

function getElementaryType(
  values: [
    SyntaxToken,
    SyntaxToken,
  ] | SyntaxToken,
): ElementaryType {
  if (Array.isArray(values)) {
    const [unsignedQualifierToken, typeToken] = values;

    return new ElementaryType(
      ElementaryTypeKind.UNSIGNED_INTEGER,
      unsignedQualifierToken,
      typeToken,
    );
  }

  const typeToken = values;
  let elementaryTypeKind = ElementaryTypeKind.FLOATING_POINT;

  if (typeToken.tokenKind === TokenKind.KEYWORD_INT_TOKEN) {
    elementaryTypeKind = ElementaryTypeKind.INTEGER;
  } else if (typeToken.tokenKind === TokenKind.KEYWORD_BIT_TOKEN) {
    elementaryTypeKind = ElementaryTypeKind.BIT;
  }

  return new ElementaryType(
    elementaryTypeKind,
    undefined,
    typeToken,
  );
}

export function getElementaryTypePattern() {
  return apply(
    alt_sc(
      seq(
        getToken(TokenKind.KEYWORD_UNSIGNED_TOKEN),
        getToken(TokenKind.KEYWORD_INT_TOKEN),
      ),
      getToken(TokenKind.KEYWORD_INT_TOKEN),
      getToken(TokenKind.KEYWORD_BIT_TOKEN),
      getToken(TokenKind.KEYWORD_FLOAT_TOKEN),
    ),
    getElementaryType,
  );
}
