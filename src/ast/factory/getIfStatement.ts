import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import { InternalParseError } from "../../ParseError";
import {
  assertSyntaxNodeType,
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import { NodeKind } from "../node/enum/node_kind";
import IfStatement from "../node/IfStatement";
import type Token from "../token/Token";
import type AbstractStatement from "../node/AbstractStatement";
import type AbstractExpression from "../node/AbstractExpression";
import type NumberLiteral from "../node/NumberLiteral";
import type Identifier from "../node/Identifier";

export function getIfStatement(
  syntaxNode: SyntaxNode,
  text: Text,
): IfStatement {
  assertSyntaxNodeType(syntaxNode, "IfStatement");

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);

  let condition: AbstractExpression | NumberLiteral | Identifier | undefined;
  let ifStatement: AbstractStatement | undefined;
  let elseStatement: AbstractStatement | undefined;
  let ifKeyword: Token | undefined;
  let openParenthesisPunctuator: Token | undefined;
  let closeParenthesisPunctuator: Token | undefined;
  let elseKeyword: Token | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.IDENTIFIER:
          condition = childNodeOrToken as Identifier;
          break;
        case NodeKind.NUMBER_LITERAL:
          condition = childNodeOrToken as NumberLiteral;
          break;
        case NodeKind.EXPRESSION:
          condition = childNodeOrToken as AbstractExpression;
          break;
        case NodeKind.STATEMENT:
          if (ifStatement) {
            elseStatement = childNodeOrToken as AbstractStatement;
          } else {
            ifStatement = childNodeOrToken as AbstractStatement;
          }
          break;
        default:
          throw new InternalParseError(
            `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
          );
      }
    } else {
      switch (childNodeOrToken.text) {
        case "if":
          ifKeyword = childNodeOrToken;
          break;
        case "(":
          openParenthesisPunctuator = childNodeOrToken;
          break;
        case ")":
          closeParenthesisPunctuator = childNodeOrToken;
          break;
        case "else":
          elseKeyword = childNodeOrToken;
          break;
        default:
          throw new InternalParseError(
            `Unexpected token: ${childNodeOrToken.text}`,
          );
      }
    }
  }

  return new IfStatement(
    condition!,
    ifStatement!,
    elseStatement,
    ifKeyword!,
    openParenthesisPunctuator!,
    closeParenthesisPunctuator!,
    elseKeyword,
  );
}
