import { Text } from "@codemirror/state";
import type { TreeCursor } from "@lezer/common";
import { InternalParseError } from "../../ParseError";
import {
  assertSyntaxNodeType,
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import { NodeKind } from "../node/enum/node_kind";
import type Token from "../token/Token";
import type NumberLiteral from "../node/NumberLiteral";
import AlignedModifier from "../node/AlignedModifier";

export function getAlignedModifier(
  cursor: TreeCursor,
  text: Text,
): AlignedModifier {
  assertSyntaxNodeType(cursor, "AlignedModifier");

  const childNodesAndTokens = getChildNodesAndTokens(cursor, text);

  let bitCount: number | undefined;
  let bitCountModifier: NumberLiteral | undefined;
  let alignedKeyword: Token | undefined;
  let openParenthesisPunctuator: Token | undefined;
  let closedParenthesisPunctuator: Token | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      if (childNodeOrToken.nodeKind === NodeKind.NUMBER_LITERAL) {
        bitCountModifier = childNodeOrToken as NumberLiteral;
        bitCount = bitCountModifier.value;
      } else {
        throw new InternalParseError(
          `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
        );
      }
    } else {
      switch (childNodeOrToken.text) {
        case "(":
          openParenthesisPunctuator = childNodeOrToken;
          break;
        case ")":
          closedParenthesisPunctuator = childNodeOrToken;
          break;
        case "aligned":
          alignedKeyword = childNodeOrToken;
          break;
        default:
          throw new InternalParseError(
            `Unexpected token: ${childNodeOrToken.text}`,
          );
      }
    }
  }

  if (bitCount === undefined) {
    throw new InternalParseError("Expected argument bitCount to be defined");
  }

  if (alignedKeyword === undefined) {
    throw new InternalParseError(
      "Expected argument alignedKeyword to be defined",
    );
  }

  return new AlignedModifier(
    bitCount,
    bitCountModifier === undefined,
    bitCountModifier,
    alignedKeyword,
    openParenthesisPunctuator,
    closedParenthesisPunctuator,
  );
}
