import { apply, seq } from "../../../deps.ts";
import AbstractExpression from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import ArrayElementAccess from "../../abstract_syntax_tree/node/ArrayElementAccess.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { EXPRESSION_RULE } from "../syntax_rules.ts";

function getArrayElementAccess(
  values: [SyntaxToken, AbstractExpression, SyntaxToken],
): AbstractExpression {
  const [openBracketToken, indexExpression, closeBracketToken] = values;

  return new ArrayElementAccess(
    indexExpression,
    openBracketToken,
    closeBracketToken,
  );
}

function getArrayElementAccessPattern() {
  return apply(
    seq(
      getToken(TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN),
      EXPRESSION_RULE,
      getToken(TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN),
    ),
    getArrayElementAccess,
  );
}

export default getArrayElementAccessPattern;
