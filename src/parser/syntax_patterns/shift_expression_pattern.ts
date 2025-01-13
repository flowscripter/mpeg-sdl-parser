import { alt_sc, lrec_sc, seq } from "../../../deps.ts";
import AbstractExpression from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import BinaryExpression from "../../abstract_syntax_tree/node/BinaryExpression.ts";
import BinaryOperatorKind from "../../abstract_syntax_tree/node/enum/binary_operator_kind.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import { ADDITIVE_EXPRESSION_RULE } from "../syntax_rules.ts";

function getShiftExpression(
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
    case TokenKind.OPERATOR_SHIFT_LEFT_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.SHIFT_LEFT;
      break;
    case TokenKind.OPERATOR_SHIFT_RIGHT_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.SHIFT_RIGHT;
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

function getShiftExpressionPattern() {
  return lrec_sc(
    ADDITIVE_EXPRESSION_RULE,
    seq(
      alt_sc(
        getToken(TokenKind.OPERATOR_SHIFT_LEFT_TOKEN),
        getToken(TokenKind.OPERATOR_SHIFT_RIGHT_TOKEN),
      ),
      ADDITIVE_EXPRESSION_RULE,
    ),
    getShiftExpression,
  );
}

export default getShiftExpressionPattern;
