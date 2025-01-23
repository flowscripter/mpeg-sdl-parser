import { apply, seq } from "typescript-parsec";
import type { AbstractNode } from "../../abstract_syntax_tree/node/AbstractNode.ts";
import { LengthOfExpression } from "../../abstract_syntax_tree/node/LengthOfExpression.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { EXPRESSION_RULE } from "../syntax_rules.ts";

function getLengthofExpression(
  values: [
    SyntaxToken,
    SyntaxToken,
    AbstractNode,
    SyntaxToken,
  ],
): LengthOfExpression {
  const [
    lengthofToken,
    openParenthesisToken,
    operand,
    closeParenthesisToken,
  ] = values;
  return new LengthOfExpression(
    operand,
    lengthofToken,
    openParenthesisToken,
    closeParenthesisToken,
  );
}

export function getLengthofExpressionPattern() {
  return apply(
    seq(
      getToken(TokenKind.KEYWORD_LENGTHOF_TOKEN),
      getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
      EXPRESSION_RULE,
      getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
    ),
    getLengthofExpression,
  );
}
