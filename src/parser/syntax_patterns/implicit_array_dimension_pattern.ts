import { apply, opt_sc, seq } from "../../../deps.ts";
import AbstractNode from "../../abstract_syntax_tree/node/AbstractNode.ts";
import ImplicitArrayDimension from "../../abstract_syntax_tree/node/ImplicitArrayDimension.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { EXPRESSION_RULE } from "../syntax_rules.ts";

function getImplicitArrayDimension(
  values: [
    SyntaxToken,
    [AbstractNode, SyntaxToken, AbstractNode] | undefined,
    SyntaxToken,
  ],
): ImplicitArrayDimension {
  const [
    openBracketToken,
    rangeAttribute,
    closeBracketToken,
  ] = values;

  let rangeStart: AbstractNode | undefined;
  let rangeOperatorToken: SyntaxToken | undefined;
  let rangeEnd: AbstractNode | undefined;

  if (rangeAttribute) {
    rangeStart = rangeAttribute[0];
    rangeOperatorToken = rangeAttribute[1];
    rangeEnd = rangeAttribute[2];
  }

  return new ImplicitArrayDimension(
    rangeStart,
    rangeEnd,
    openBracketToken,
    rangeOperatorToken,
    closeBracketToken,
  );
}

function getImplicitArrayDimensionPattern() {
  return apply(
    seq(
      getToken(TokenKind.PUNCTUATOR_OPEN_BRACKET_TOKEN),
      opt_sc(
        seq(
          EXPRESSION_RULE,
          getToken(TokenKind.OPERATOR_RANGE_TOKEN),
          EXPRESSION_RULE,
        ),
      ),
      getToken(TokenKind.PUNCTUATOR_CLOSE_BRACKET_TOKEN),
    ),
    getImplicitArrayDimension,
  );
}

export default getImplicitArrayDimensionPattern;
