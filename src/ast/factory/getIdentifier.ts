import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import {
  assertSyntaxNodeType,
  getTokenFromSyntaxNode,
} from "../../util/nodeFactoryUtils";
import Identifier from "../node/Identifier";

export function getIdentifier(
  syntaxNode: SyntaxNode,
  text: Text,
): Identifier {
  assertSyntaxNodeType(syntaxNode, "Identifier");

  const literal = getTokenFromSyntaxNode(syntaxNode, text);

  return new Identifier(literal.text, literal);
}
