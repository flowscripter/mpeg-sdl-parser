import { Text } from "@codemirror/state";
import { type SyntaxNode } from "@lezer/common";
import type Token from "../ast/token/Token";
import type AbstractNode from "../ast/node/AbstractNode";
import NodeFactory from "../ast/factory/NodeFactory";
import type Trivia from "../ast/token/Trivia";
import { createSyntacticParseError, InternalParseError } from "../ParseError";
import { getLocationFromTextPosition } from "./locationUtils";
import { NodeKind } from "../ast/node/enum/node_kind";
import type Identifier from "../ast/node/Identifier";

const primitiveNodeTypes = new Set([
  "AlignmentBitCount",
  "BinaryLiteral",
  "DecimalLiteral",
  "FloatingPointLiteral",
  "HexadecimalLiteral",
  "Identifier",
  "IntegerLiteral"
]);

export function assertSyntaxNodeType(
  syntaxNode: SyntaxNode,
  expectedType: string,
): void {
  if (syntaxNode.type.name !== expectedType) {
    throw new InternalParseError(
      `Expected node to be of type ${expectedType}, it was: ${syntaxNode.type.name}`,
    );
  }
}

function getTriviaFromSyntaxNode(syntaxNode: SyntaxNode, text: Text): Trivia {
  assertSyntaxNodeType(syntaxNode, "Comment");

  return {
    text: text.sliceString(syntaxNode.from, syntaxNode.to),
    location: getLocationFromTextPosition(text, syntaxNode.from),
  };
}

export function getTokenFromSyntaxNode(
  syntaxNode: SyntaxNode,
  text: Text,
): Token {
  return {
    text: text.sliceString(syntaxNode.from, syntaxNode.to),
    location: getLocationFromTextPosition(text, syntaxNode.from),
    leadingTrivia: [],
    trailingTrivia: [],
  };
}

export function getChildNodesAndTokens(
  syntaxNode: SyntaxNode,
  text: Text,
): (AbstractNode | Token)[] {
  const childNodesAndTokens = [];
  let child = syntaxNode.firstChild;

  let trivia = [];
  let foundData = false;
  while (child) {
    if (child.type.isError) {
      throw createSyntacticParseError(text, child.from);
    }

    // Skip whitespace
    if (child.type.name === "Whitespace") {
      child = child.nextSibling;
      continue;
    }

    // Save comments to set as leading or trailing trivia
    if (child.type.name === "Comment") {
      trivia.push(getTriviaFromSyntaxNode(child, text));
      child = child.nextSibling;
      continue;
    }

    let childNode: AbstractNode | Token;

    // Check if SyntaxNode is a terminal token AND not a primitive node
    if (
      (child.firstChild === null) && (!primitiveNodeTypes.has(child.type.name))
    ) {
      // If it is a terminal token, create a Token from the SyntaxNode
      childNode = getTokenFromSyntaxNode(child, text);
      if (foundData) {
        console.error('found token ' + childNode.text);
      }
      if (trivia.length > 0) {
        childNode.leadingTrivia = trivia;
        trivia = [];
      }
    } // Otherwise create an AbstractNode from the SyntaxNode
    else {
      childNode = NodeFactory.createNode(child, text);
      if ((childNode.nodeKind === NodeKind.IDENTIFIER) && ((childNode as Identifier).name === "data")) {
        console.error('found data identifier ' + (childNode as Identifier).name);
        foundData = true;
      }
      if (trivia.length > 0) {
        childNode.startToken.leadingTrivia = trivia;
        trivia = [];
      }
    }

    childNodesAndTokens.push(childNode);

    child = child.nextSibling;
    if (foundData) {
    if (!child) {
      console.error('out');
    }
    else {
            console.error('not out');

    }

    }
  }

  // Now look for any trailing comment which might be a sibling to the provided syntaxNode
  // Look for sibling nodes that are comments or whitespace and set them as trailing trivia
  // until a non-comment or non-whitespace node is found and only while any whitespace nodes
  // do not include a newline character.
  let sibling = syntaxNode.nextSibling;
  let currentNode = syntaxNode;
  while (sibling) {
    if (sibling.type.name === "Comment") {
      const comment =  getTriviaFromSyntaxNode(sibling, text);
      if (foundData) {
        console.error('found comment ' + comment.text);
      }
      // trivia.push(comment);
    } else if (sibling.type.name === "Whitespace") {
      // Only include whitespace if it doesn't contain a newline
      const whitespace = text.sliceString(sibling.from, sibling.to);
      if (foundData) {
        console.error('found whitespace ' + whitespace);
      }
      if (whitespace.includes("\n")) {
        console.error('found newline in whitespace x' + whitespace + 'x');
        break; // Stop if we encounter a newline in whitespace
      }
    } else {
      // Stop at the first non-comment, non-whitespace node
      break;
    }
    currentNode = sibling;
    sibling = sibling.nextSibling;
  }

  // syntaxNode = currentNode;

  // If there are remaining trivia, set them as trailing trivia on the last token
  if (trivia.length > 0) {
    const lastChildNodeOrToken =
      childNodesAndTokens[childNodesAndTokens.length - 1];
    if (isAbstractNode(lastChildNodeOrToken)) {
      lastChildNodeOrToken.endToken.trailingTrivia = trivia;
    } else {
      lastChildNodeOrToken.trailingTrivia = trivia;
    }
  }

  return childNodesAndTokens;
}

export function isAbstractNode(
  node: AbstractNode | Token,
): node is AbstractNode {
  return node && typeof node === "object" && "nodeKind" in node;
}
