import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import { InternalParseError } from "../../ParseError";
import {
  assertSyntaxNodeType,
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import type AbstractExpression from "../node/AbstractExpression";
import { NodeKind } from "../node/enum/node_kind";
import type Identifier from "../node/Identifier";
import type Token from "../token/Token";
import type NumberLiteral from "../node/NumberLiteral";
import ExpressionStatement from "../node/ExpressionStatement";

export function getExpressionStatement(
  syntaxNode: SyntaxNode,
  text: Text,
): ExpressionStatement {
  assertSyntaxNodeType(syntaxNode, "ExpressionStatement");

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);

  let expression: AbstractExpression | Identifier | NumberLiteral | undefined;
  let semicolonPunctuator: Token | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      if (childNodeOrToken.nodeKind === NodeKind.EXPRESSION) {
        expression = childNodeOrToken as AbstractExpression;
      } else {
        throw new InternalParseError(
          `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
        );
      }
    } else {
      if (childNodeOrToken.text === ";") {
        semicolonPunctuator = childNodeOrToken;
      } else {
        throw new InternalParseError(
          `Unexpected token: ${childNodeOrToken.text}`,
        );
      }
    }
  }

  return new ExpressionStatement(
    expression!,
    semicolonPunctuator!,
  );
}
