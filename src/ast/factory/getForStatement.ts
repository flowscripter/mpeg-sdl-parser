import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import { InternalParseError } from "../../ParseError";
import {
  assertSyntaxNodeType,
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import { NodeKind } from "../node/enum/node_kind";
import type Token from "../token/Token";
import type AbstractStatement from "../node/AbstractStatement";
import type AbstractExpression from "../node/AbstractExpression";
import ForStatement from "../node/ForStatement";
import ComputedElementaryTypeDefinition from "../node/ComputedElementaryTypeDefinition";
import CompoundStatement from "../node/CompoundStatement";
import { StatementKind } from "../node/enum/statement_kind";

export function getForStatement(
  syntaxNode: SyntaxNode,
  text: Text,
): ForStatement {
  assertSyntaxNodeType(syntaxNode, "ForStatement");

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);

  let expression1: AbstractExpression | undefined;
  let computedElementaryTypeDefinition:
    | ComputedElementaryTypeDefinition
    | undefined;
  let expression2: AbstractExpression | undefined;
  let expression3: AbstractExpression | undefined;
  let compoundStatement: CompoundStatement | undefined;
  let forKeyword: Token | undefined;
  let openParenthesisPunctuator: Token | undefined;
  let semicolon1Punctuator: Token | undefined;
  let semicolon2Punctuator: Token | undefined;
  let closeParenthesisPunctuator: Token | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.EXPRESSION:
          if (semicolon2Punctuator) {
            expression3 = childNodeOrToken as AbstractExpression;
          } else if (semicolon1Punctuator || computedElementaryTypeDefinition) {
            expression2 = childNodeOrToken as AbstractExpression;
          } else {
            expression1 = childNodeOrToken as AbstractExpression;
          }
          break;
        case NodeKind.STATEMENT:
          if (
            (childNodeOrToken as AbstractStatement).statementKind ===
              StatementKind.COMPOUND
          ) {
            compoundStatement = childNodeOrToken as CompoundStatement;
          } else if (
            (childNodeOrToken as AbstractStatement).statementKind ===
              StatementKind.COMPUTED_ELEMENTARY_TYPE_DEFINITION
          ) {
            computedElementaryTypeDefinition =
              childNodeOrToken as ComputedElementaryTypeDefinition;
          } else {
            throw new InternalParseError(
              `Unexpected statement kind: ${
                (childNodeOrToken as AbstractStatement).statementKind
              }`,
            );
          }
          break;
        default:
          throw new InternalParseError(
            `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
          );
      }
    } else {
      switch (childNodeOrToken.text) {
        case "for":
          forKeyword = childNodeOrToken;
          break;
        case "(":
          openParenthesisPunctuator = childNodeOrToken;
          break;
        case ";":
          if (!semicolon1Punctuator && !computedElementaryTypeDefinition) {
            semicolon1Punctuator = childNodeOrToken;
          } else {
            semicolon2Punctuator = childNodeOrToken;
          }
          break;
        case ")":
          closeParenthesisPunctuator = childNodeOrToken;
          break;
        default:
          throw new InternalParseError(
            `Unexpected token: ${childNodeOrToken.text}`,
          );
      }
    }
  }

  if (!compoundStatement) {
    throw new InternalParseError(
      "Expected argument compoundStatement to be defined",
    );
  }
  if (!forKeyword) {
    throw new InternalParseError("Expected argument forKeyword to be defined");
  }
  if (!openParenthesisPunctuator) {
    throw new InternalParseError(
      "Expected argument openParenthesisPunctuator to be defined",
    );
  }
  if (!semicolon2Punctuator) {
    throw new InternalParseError(
      "Expected argument semicolon2Punctuator to be defined",
    );
  }
  if (!closeParenthesisPunctuator) {
    throw new InternalParseError(
      "Expected argument closeParenthesisPunctuator to be defined",
    );
  }

  return new ForStatement(
    expression1,
    computedElementaryTypeDefinition,
    expression2,
    expression3,
    compoundStatement,
    forKeyword,
    openParenthesisPunctuator,
    semicolon1Punctuator,
    semicolon2Punctuator,
    closeParenthesisPunctuator,
  );
}
