import { apply, seq } from "typescript-parsec";
import type { AbstractNode } from "../../abstract_syntax_tree/node/AbstractNode.ts";
import { ExplicitArrayDimension } from "../../abstract_syntax_tree/node/ExplicitArrayDimension.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { EXPRESSION_RULE } from "../syntax_rules.ts";

function getExplicitArrayDimension(
  values: [
    SyntaxToken,
    AbstractNode,
    SyntaxToken,
  ],
): ExplicitArrayDimension {
  const [
    openBracketToken,
    size,
    closeBracketToken,
  ] = values;

  return new ExplicitArrayDimension(
    size,
    openBracketToken,
    closeBracketToken,
  );
}

export function getExplicitArrayDimensionPattern() {
  return apply(
    seq(
      getToken(TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN),
      EXPRESSION_RULE,
      getToken(TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN),
    ),
    getExplicitArrayDimension,
  );
}
