import { alt_sc, lrec_sc, seq } from "../../../deps.ts";
import AbstractNode from "../../abstract_syntax_tree/node/AbstractNode.ts";
import BinaryExpression from "../../abstract_syntax_tree/node/BinaryExpression.ts";
import BinaryOperatorKind from "../../abstract_syntax_tree/node/enum/binary_operator_kind.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import { BITWISE_EXPRESSION_RULE } from "../syntax_rules.ts";

function getLogicalExpression(
  leftOperand: AbstractNode,
  operatorTokenAndRightOperand: [SyntaxToken, AbstractNode] | undefined,
): AbstractNode {
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
    case TokenKind.OPERATOR_MULTIPLY_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.MULTIPLY;
      break;
    case TokenKind.OPERATOR_DIVIDE_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.DIVIDE;
      break;
    case TokenKind.OPERATOR_MODULUS_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.MODULUS;
      break;
    case TokenKind.OPERATOR_SHIFT_LEFT_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.SHIFT_LEFT;
      break;
    case TokenKind.OPERATOR_SHIFT_RIGHT_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.SHIFT_RIGHT;
      break;
    case TokenKind.OPERATOR_LESS_THAN_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.LESS_THAN;
      break;
    case TokenKind.OPERATOR_LESS_THAN_OR_EQUAL_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.LESS_THAN_OR_EQUAL;
      break;
    case TokenKind.OPERATOR_GREATER_THAN_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.GREATER_THAN;
      break;
    case TokenKind.OPERATOR_GREATER_THAN_OR_EQUAL_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.GREATER_THAN_OR_EQUAL;
      break;
    case TokenKind.OPERATOR_EQUAL_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.EQUAL;
      break;
    case TokenKind.OPERATOR_NOT_EQUAL_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.NOT_EQUAL;
      break;
    case TokenKind.OPERATOR_BITWISE_AND_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.BITWISE_AND;
      break;
    case TokenKind.OPERATOR_BITWISE_OR_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.BITWISE_OR;
      break;
    case TokenKind.OPERATOR_LOGICAL_AND_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.LOGICAL_AND;
      break;
    case TokenKind.OPERATOR_LOGICAL_OR_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.LOGICAL_OR;
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

function getExpressionPattern() {
  return lrec_sc(
    BITWISE_EXPRESSION_RULE,
    seq(
      alt_sc(
        getToken(TokenKind.OPERATOR_LOGICAL_AND_TOKEN),
        getToken(TokenKind.OPERATOR_LOGICAL_OR_TOKEN),
      ),
      BITWISE_EXPRESSION_RULE,
    ),
    getLogicalExpression,
  );
}

export default getExpressionPattern;
