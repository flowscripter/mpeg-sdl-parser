import { alt_sc, lrec_sc, seq } from "typescript-parsec";
import type { AbstractNode } from "../../abstract_syntax_tree/node/AbstractNode.ts";
import { BinaryExpression } from "../../abstract_syntax_tree/node/BinaryExpression.ts";
import { BinaryOperatorKind } from "../../abstract_syntax_tree/node/enum/binary_operator_kind.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import { EQUALITY_EXPRESSION_RULE } from "../syntax_rules.ts";

function getBitwiseExpression(
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
    case TokenKind.OPERATOR_BITWISE_AND_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.BITWISE_AND;
      break;
    case TokenKind.OPERATOR_BITWISE_OR_TOKEN:
      binaryOperatorKind = BinaryOperatorKind.BITWISE_OR;
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

export function getBitwiseExpressionPattern() {
  return lrec_sc(
    EQUALITY_EXPRESSION_RULE,
    seq(
      alt_sc(
        getToken(TokenKind.OPERATOR_BITWISE_AND_TOKEN),
        getToken(TokenKind.OPERATOR_BITWISE_OR_TOKEN),
      ),
      EQUALITY_EXPRESSION_RULE,
    ),
    getBitwiseExpression,
  );
}
