import { alt_sc, lrec_sc } from "typescript-parsec";
import type { AbstractExpression } from "../../abstract_syntax_tree/node/AbstractExpression.ts";
import type { AbstractNode } from "../../abstract_syntax_tree/node/AbstractNode.ts";
import type { ArrayElementAccess } from "../../abstract_syntax_tree/node/ArrayElementAccess.ts";
import type { ClassMemberAccess } from "../../abstract_syntax_tree/node/ClassMemberAccess.ts";
import { NodeKind } from "../../abstract_syntax_tree/node/enum/node_kind.ts";
import { PostfixOperatorKind } from "../../abstract_syntax_tree/node/enum/postfix_operator_kind.ts";
import { PostfixExpression } from "../../abstract_syntax_tree/node/PostfixExpression.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import {
  ARRAY_ELEMENT_ACCESS_RULE,
  CLASS_MEMBER_ACCESS_RULE,
  PRIMARY_EXPRESSION_RULE,
} from "../syntax_rules.ts";

function getPostfixExpression(
  operand: AbstractNode,
  postfixOperator: AbstractNode | AbstractExpression | SyntaxToken | undefined,
): AbstractNode {
  if (!postfixOperator) {
    return operand;
  }

  let arrayElementAccess: ArrayElementAccess | undefined;
  let classMemberAccess: ClassMemberAccess | undefined;
  let postfixOperatorKind: PostfixOperatorKind | undefined;
  let postfixOperatorToken: SyntaxToken | undefined;

  if (
    (postfixOperator as AbstractExpression).nodeKind !==
      undefined
  ) {
    if (
      (postfixOperator as AbstractNode).nodeKind ===
        NodeKind.ARRAY_ELEMENT_ACCESS
    ) {
      arrayElementAccess = postfixOperator as ArrayElementAccess;
    } else if (
      (postfixOperator as AbstractNode).nodeKind ===
        NodeKind.CLASS_MEMBER_ACCESS
    ) {
      classMemberAccess = postfixOperator as ClassMemberAccess;
    } else {
      throw new InternalParserError(
        "Unexpected node kind when parsing postfix operator",
      );
    }
  } else {
    postfixOperatorToken = postfixOperator as SyntaxToken;
    if (
      postfixOperatorToken.tokenKind ===
        TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN
    ) {
      postfixOperatorKind = PostfixOperatorKind.POSTFIX_INCREMENT;
    } else if (
      postfixOperatorToken.tokenKind ===
        TokenKind.OPERATOR_POSTFIX_DECREMENT_TOKEN
    ) {
      postfixOperatorKind = PostfixOperatorKind.POSTFIX_DECREMENT;
    } else {
      throw new InternalParserError(
        `Unexpected token kind when parsing postfix operator`,
        postfixOperatorToken,
      );
    }
  }

  return new PostfixExpression(
    operand,
    arrayElementAccess,
    classMemberAccess,
    postfixOperatorKind,
    postfixOperatorToken,
  );
}

export function getPostfixExpressionPattern() {
  return alt_sc(
    lrec_sc(
      PRIMARY_EXPRESSION_RULE,
      alt_sc(
        ARRAY_ELEMENT_ACCESS_RULE,
        CLASS_MEMBER_ACCESS_RULE,
        alt_sc(
          getToken(TokenKind.OPERATOR_POSTFIX_INCREMENT_TOKEN),
          getToken(TokenKind.OPERATOR_POSTFIX_DECREMENT_TOKEN),
        ),
      ),
      getPostfixExpression,
    ),
    PRIMARY_EXPRESSION_RULE,
  );
}
