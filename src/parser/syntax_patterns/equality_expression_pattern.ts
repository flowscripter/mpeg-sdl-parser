import { alt_sc, lrec_sc, seq } from "../../../deps.ts";
import AbstractNode from "../../abstract_syntax_tree/node/AbstractNode.ts";
import BinaryExpression from "../../abstract_syntax_tree/node/BinaryExpression.ts";
import BinaryOperatorKind from "../../abstract_syntax_tree/node/enum/binary_operator_kind.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import { RELATIONAL_EXPRESSION_RULE } from "../syntax_rules.ts";

function getEqualityExpression(
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
    case TokenKind.OPERATOR_EQUAL_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.EQUAL;
      break;
    case TokenKind.OPERATOR_NOT_EQUAL_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.NOT_EQUAL;
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

function getEqualityExpressionPattern() {
  return lrec_sc(
    RELATIONAL_EXPRESSION_RULE,
    seq(
      alt_sc(
        getToken(TokenKind.OPERATOR_EQUAL_TOKEN),
        getToken(TokenKind.OPERATOR_NOT_EQUAL_TOKEN),
      ),
      RELATIONAL_EXPRESSION_RULE,
    ),
    getEqualityExpression,
  );
}

export default getEqualityExpressionPattern;
