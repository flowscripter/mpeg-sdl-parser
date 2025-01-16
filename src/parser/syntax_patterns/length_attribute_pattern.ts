import { apply, seq } from "../../../deps.ts";
import AbstractNode from "../../abstract_syntax_tree/node/AbstractNode.ts";
import LengthAttribute from "../../abstract_syntax_tree/node/LengthAttribute.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { EXPRESSION_RULE } from "../syntax_rules.ts";

function getLengthAttribute(
  values: [SyntaxToken, AbstractNode, SyntaxToken],
): LengthAttribute {
  const [openParenthesisToken, length, closeParenthesisToken] = values;

  return new LengthAttribute(
    length,
    openParenthesisToken,
    closeParenthesisToken,
  );
}

function getLengthAttributePattern() {
  return apply(
    seq(
      getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
      EXPRESSION_RULE,
      getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
    ),
    getLengthAttribute,
  );
}

export default getLengthAttributePattern;
