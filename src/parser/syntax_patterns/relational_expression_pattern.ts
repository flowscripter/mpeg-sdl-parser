import { alt_sc, lrec_sc, seq } from "../../../deps.ts";
import AbstractNode from "../../abstract_syntax_tree/node/AbstractNode.ts";
import BinaryExpression from "../../abstract_syntax_tree/node/BinaryExpression.ts";
import BinaryOperatorKind from "../../abstract_syntax_tree/node/enum/binary_operator_kind.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import { SHIFT_EXPRESSION_RULE } from "../syntax_rules.ts";

function getRelationalExpression(
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

function getRelationalExpressionPattern() {
  return lrec_sc(
    SHIFT_EXPRESSION_RULE,
    seq(
      alt_sc(
        getToken(TokenKind.OPERATOR_LESS_THAN_TOKEN),
        getToken(TokenKind.OPERATOR_LESS_THAN_OR_EQUAL_TOKEN),
        getToken(TokenKind.OPERATOR_GREATER_THAN_TOKEN),
        getToken(TokenKind.OPERATOR_GREATER_THAN_OR_EQUAL_TOKEN),
      ),
      SHIFT_EXPRESSION_RULE,
    ),
    getRelationalExpression,
  );
}

export default getRelationalExpressionPattern;
