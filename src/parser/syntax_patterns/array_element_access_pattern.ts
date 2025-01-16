import { apply, seq } from "../../../deps.ts";
import AbstractNode from "../../abstract_syntax_tree/node/AbstractNode.ts";
import ArrayElementAccess from "../../abstract_syntax_tree/node/ArrayElementAccess.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { EXPRESSION_RULE } from "../syntax_rules.ts";

function getArrayElementAccess(
  values: [SyntaxToken, AbstractNode, SyntaxToken],
): AbstractNode {
  const [openBracketToken, index, closeBracketToken] = values;

  return new ArrayElementAccess(
    index,
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
