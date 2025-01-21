import { apply, seq } from "../../../deps.ts";
import type AbstractNode from "../../abstract_syntax_tree/node/AbstractNode.ts";
import PartialArrayDimension from "../../abstract_syntax_tree/node/PartialArrayDimension.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { EXPRESSION_RULE } from "../syntax_rules.ts";

function getPartialArrayDimension(
  values: [
    SyntaxToken,
    SyntaxToken,
    AbstractNode,
    SyntaxToken,
    SyntaxToken,
  ],
): PartialArrayDimension {
  const [
    openBracketToken,
    innerOpenBracketToken,
    index,
    innerCloseBracketToken,
    closeBracketToken,
  ] = values;

  return new PartialArrayDimension(
    index,
    openBracketToken,
    innerOpenBracketToken,
    innerCloseBracketToken,
    closeBracketToken,
  );
}

function getPartialArrayDimensionPattern() {
  return apply(
    seq(
      getToken(TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN),
      getToken(TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN),
      EXPRESSION_RULE,
      getToken(TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN),
      getToken(TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN),
    ),
    getPartialArrayDimension,
  );
}

export default getPartialArrayDimensionPattern;
