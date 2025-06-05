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
import type NumberLiteral from "../node/NumberLiteral";
import BitModifier from "../node/BitModifier";
import type Identifier from "../node/Identifier";
import type AbstractClassId from "../node/AbstractClassId";

export function getBitModifier(
  syntaxNode: SyntaxNode,
  text: Text,
): BitModifier {
  assertSyntaxNodeType(syntaxNode, "BitModifier");

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);

  let length: NumberLiteral | undefined;
  let identifier: Identifier | undefined;
  let classId: AbstractClassId | undefined;
  let bitKeyword: Token | undefined;
  let colonPunctuator: Token | undefined;
  let openParenthesisPunctuator: Token | undefined;
  let closedParenthesisPunctuator: Token | undefined;
  let assignmentOperator: Token | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.NUMBER_LITERAL:
          length = childNodeOrToken as NumberLiteral;
          break;
        case NodeKind.IDENTIFIER:
          identifier = childNodeOrToken as Identifier;
          break;
        case NodeKind.CLASS_ID:
          classId = childNodeOrToken as AbstractClassId;
          break;
        default:
          throw new InternalParseError(
            `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
          );
      }
    } else {
      switch (childNodeOrToken.text) {
        case ":":
          colonPunctuator = childNodeOrToken;
          break;
        case "bit":
          bitKeyword = childNodeOrToken;
          break;
        case "(":
          openParenthesisPunctuator = childNodeOrToken;
          break;
        case ")":
          closedParenthesisPunctuator = childNodeOrToken;
          break;
        case "=":
          assignmentOperator = childNodeOrToken;
          break;
        default:
          throw new InternalParseError(
            `Unexpected token: ${childNodeOrToken.text}`,
          );
      }
    }
  }

  if (length === undefined) {
    throw new InternalParseError("Expected argument length to be defined");
  }
  if (classId === undefined) {
    throw new InternalParseError("Expected argument classId to be defined");
  }
  if (colonPunctuator === undefined) {
    throw new InternalParseError(
      "Expected argument colonPunctuator to be defined",
    );
  }
  if (bitKeyword === undefined) {
    throw new InternalParseError("Expected argument bitKeyword to be defined");
  }
  if (openParenthesisPunctuator === undefined) {
    throw new InternalParseError(
      "Expected argument openParenthesisPunctuator to be defined",
    );
  }
  if (closedParenthesisPunctuator === undefined) {
    throw new InternalParseError(
      "Expected argument closedParenthesisPunctuator to be defined",
    );
  }

  return new BitModifier(
    length,
    identifier,
    classId,
    colonPunctuator,
    bitKeyword,
    openParenthesisPunctuator,
    closedParenthesisPunctuator,
    assignmentOperator,
  );
}
