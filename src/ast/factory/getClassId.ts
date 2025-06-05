import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import {
  assertSyntaxNodeType,
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import type NumberLiteral from "../node/NumberLiteral";
import { InternalParseError } from "../../ParseError";
import { NodeKind } from "../node/enum/node_kind";
import ClassId from "../node/ClassId";

export function getClassId(
  syntaxNode: SyntaxNode,
  text: Text,
): ClassId {
  assertSyntaxNodeType(syntaxNode, "ClassId");

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);

  let value: NumberLiteral | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      if (childNodeOrToken.nodeKind === NodeKind.NUMBER_LITERAL) {
        value = childNodeOrToken as NumberLiteral;
      } else {
        throw new InternalParseError(
          `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
        );
      }
    } else {
      throw new InternalParseError(
        `Unexpected token: ${childNodeOrToken.text}`,
      );
    }
  }
  if (value === undefined) {
    throw new InternalParseError("Expected argument value to be defined");
  }
  return new ClassId(
    value,
  );
}
