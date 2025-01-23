import { apply, opt_sc, seq } from "../../../deps.ts";
import { ExpandableModifier } from "../../abstract_syntax_tree/node/ExpandableModifier.ts";
import type { NumberLiteral } from "../../abstract_syntax_tree/node/NumberLiteral.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { NUMBER_LITERAL_RULE } from "../syntax_rules.ts";

function getExpandableModifier(
  values: [
    SyntaxToken,
    [SyntaxToken, NumberLiteral, SyntaxToken] | undefined,
  ],
): ExpandableModifier {
  const [
    expandableToken,
    maxClassSizeAttribute,
  ] = values;

  let openParenthesisToken: SyntaxToken | undefined;
  let maxClassSize: NumberLiteral | undefined;
  let closeParenthesisToken: SyntaxToken | undefined;

  if (maxClassSizeAttribute !== undefined) {
    [openParenthesisToken, maxClassSize, closeParenthesisToken] =
      maxClassSizeAttribute;
  }

  return new ExpandableModifier(
    maxClassSize,
    expandableToken,
    openParenthesisToken,
    closeParenthesisToken,
  );
}

export function getExpandableModifierPattern() {
  return apply(
    seq(
      getToken(TokenKind.KEYWORD_EXPANDABLE_TOKEN),
      opt_sc(
        seq(
          getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
          NUMBER_LITERAL_RULE,
          getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
        ),
      ),
    ),
    getExpandableModifier,
  );
}
