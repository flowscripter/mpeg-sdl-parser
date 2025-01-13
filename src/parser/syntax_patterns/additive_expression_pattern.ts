import { alt_sc, lrec_sc, seq } from "../../../deps.ts";
import AbstractExpression from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import BinaryExpression from "../../abstract_syntax_tree/node/BinaryExpression.ts";
import BinaryOperatorKind from "../../abstract_syntax_tree/node/enum/binary_operator_kind.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import { MULTIPLICATIVE_EXPRESSION_RULE } from "../syntax_rules.ts";

function getAdditiveExpression(
  leftOperand: AbstractExpression,
  operatorTokenAndRightOperand: [SyntaxToken, AbstractExpression] | undefined,
): AbstractExpression {
  if (!operatorTokenAndRightOperand) {
    return leftOperand;
  }

  const [
    binaryOperatorToken,
    rightOperand,
  ] = operatorTokenAndRightOperand;

  let binaryOperatorKind: BinaryOperatorKind;

  switch (binaryOperatorToken.tokenKind) {
    case TokenKind.OPERATOR_PLUS_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.ADD;
      break;
    case TokenKind.OPERATOR_MINUS_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.SUBTRACT;
      break;
    default:
      throw new InternalParserError(
        `Unsupported TokenKind: ${
          TokenKind[binaryOperatorToken.tokenKind]
        } when mapping to a BinaryOperatorKind`,
        binaryOperatorToken,
      );
  }

  return new BinaryExpression(
    leftOperand,
    binaryOperatorKind,
    rightOperand,
    binaryOperatorToken,
  );
}

function getAdditiveExpressionPattern() {
  return lrec_sc(
    MULTIPLICATIVE_EXPRESSION_RULE,
    seq(
      alt_sc(
        getToken(TokenKind.OPERATOR_PLUS_TOKEN),
        getToken(TokenKind.OPERATOR_MINUS_TOKEN),
      ),
      MULTIPLICATIVE_EXPRESSION_RULE,
    ),
    getAdditiveExpression,
  );
}

export default getAdditiveExpressionPattern;
