import { alt_sc, apply, opt_sc, seq } from "../../../deps.ts";
import AbstractExpression from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import UnaryOperatorKind from "../../abstract_syntax_tree/node/enum/unary_operator_kind.ts";
import UnaryExpression from "../../abstract_syntax_tree/node/UnaryExpression.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import {
  LENGTHOF_EXPRESSION_RULE,
  POSTFIX_EXPRESSION_RULE,
} from "../syntax_rules.ts";

function getUnaryExpression(
  values: [SyntaxToken | undefined, AbstractExpression],
): AbstractExpression {
  const [
    unaryOperatorToken,
    operand,
  ] = values;

  if (!unaryOperatorToken) {
    return operand;
  }

  let unaryOperatorKind: UnaryOperatorKind | undefined;

  if (unaryOperatorToken.tokenKind === TokenKind.OPERATOR_PLUS_TOKEN) {
    unaryOperatorKind = UnaryOperatorKind.UNARY_PLUS;
  } else if (
    unaryOperatorToken.tokenKind === TokenKind.OPERATOR_MINUS_TOKEN
  ) {
    unaryOperatorKind = UnaryOperatorKind.UNARY_NEGATION;
  } else {
    throw new InternalParserError(
      `Unexpected token kind when parsing unary operator`,
      unaryOperatorToken,
    );
  }

  return new UnaryExpression(
    unaryOperatorKind,
    operand,
    unaryOperatorToken,
  );
}

function getUnaryExpressionPattern() {
  return apply(
    seq(
      opt_sc(
        alt_sc(
          getToken(TokenKind.OPERATOR_PLUS_TOKEN),
          getToken(TokenKind.OPERATOR_MINUS_TOKEN),
        ),
      ),
      alt_sc(
        POSTFIX_EXPRESSION_RULE,
        LENGTHOF_EXPRESSION_RULE,
      ),
    ),
    getUnaryExpression,
  );
}
export default getUnaryExpressionPattern;
