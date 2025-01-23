import { apply } from "typescript-parsec";
import { Identifier } from "../../abstract_syntax_tree/node/Identifier.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";

function getIdentifier(
  identifierToken: SyntaxToken,
): Identifier {
  return new Identifier(identifierToken.text, identifierToken);
}

export function getIdentifierPattern() {
  return apply(getToken(TokenKind.IDENTIFIER_TOKEN), getIdentifier);
}
