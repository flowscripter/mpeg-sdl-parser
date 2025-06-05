import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import { InternalParseError } from "../../ParseError";
import {
  assertSyntaxNodeType,
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import { NodeKind } from "../node/enum/node_kind";
import type Identifier from "../node/Identifier";
import type Token from "../token/Token";
import type ExplicitArrayDimension from "../node/ExplicitArrayDimension";
import type ElementaryType from "../node/ElementaryType";
import ComputedArrayDefinition from "../node/ComputedArrayDefinition";

export function getComputedArrayDefinition(
  syntaxNode: SyntaxNode,
  text: Text,
): ComputedArrayDefinition {
  assertSyntaxNodeType(syntaxNode, "ComputedArrayDefinition");

  let elementaryType: ElementaryType | undefined;
  let identifier: Identifier | undefined;
  const dimensions: ExplicitArrayDimension[] = [];
  let computedKeyword: Token | undefined;
  let semicolonPunctuator: Token | undefined;

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);
  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.ELEMENTARY_TYPE:
          elementaryType = childNodeOrToken as ElementaryType;
          break;
        case NodeKind.IDENTIFIER:
          identifier = childNodeOrToken as Identifier;
          break;
        case NodeKind.ARRAY_DIMENSION:
          dimensions.push(childNodeOrToken as ExplicitArrayDimension);
          break;
        default:
          throw new InternalParseError(
            `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
          );
      }
    } else {
      switch (childNodeOrToken.text) {
        case "computed":
          computedKeyword = childNodeOrToken;
          break;
        case ";":
          semicolonPunctuator = childNodeOrToken;
          break;
        default:
          throw new InternalParseError(
            `Unexpected token: ${childNodeOrToken.text}`,
          );
      }
    }
  }

  if (elementaryType === undefined) {
    throw new InternalParseError(
      "Expected argument elementaryType to be defined",
    );
  }
  if (identifier === undefined) {
    throw new InternalParseError("Expected argument identifier to be defined");
  }
  if (computedKeyword === undefined) {
    throw new InternalParseError(
      "Expected argument computedKeyword to be defined",
    );
  }
  if (semicolonPunctuator === undefined) {
    throw new InternalParseError(
      "Expected argument semicolonPunctuator to be defined",
    );
  }
  return new ComputedArrayDefinition(
    elementaryType,
    identifier,
    dimensions,
    computedKeyword,
    semicolonPunctuator,
  );
}
