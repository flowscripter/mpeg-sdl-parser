import { alt_sc, lrec_sc, seq } from "../../../deps.ts";
import type { AbstractNode } from "../../abstract_syntax_tree/node/AbstractNode.ts";
import { BinaryExpression } from "../../abstract_syntax_tree/node/BinaryExpression.ts";
import { BinaryOperatorKind } from "../../abstract_syntax_tree/node/enum/binary_operator_kind.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import { UNARY_EXPRESSION_RULE } from "../syntax_rules.ts";

function getMultiplicativeExpression(
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
    case TokenKind.OPERATOR_MULTIPLY_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.MULTIPLY;
      break;
    case TokenKind.OPERATOR_DIVIDE_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.DIVIDE;
      break;
    case TokenKind.OPERATOR_MODULUS_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.MODULUS;
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

export function getMultiplicativeExpressionPattern() {
  return lrec_sc(
    UNARY_EXPRESSION_RULE,
    seq(
      alt_sc(
        getToken(TokenKind.OPERATOR_MULTIPLY_TOKEN),
        getToken(TokenKind.OPERATOR_DIVIDE_TOKEN),
        getToken(TokenKind.OPERATOR_MODULUS_TOKEN),
      ),
      UNARY_EXPRESSION_RULE,
    ),
    getMultiplicativeExpression,
  );
}
