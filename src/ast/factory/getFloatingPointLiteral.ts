import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import {
  assertSyntaxNodeType,
  getTokenFromSyntaxNode,
} from "../../util/nodeFactoryUtils";
import NumberLiteral from "../node/NumberLiteral";
import { NumberLiteralKind } from "../node/enum/number_literal_kind";

export function getFloatingPointLiteral(
  syntaxNode: SyntaxNode,
  text: Text,
): NumberLiteral {
  assertSyntaxNodeType(syntaxNode, "FloatingPointLiteral");

  const literal = getTokenFromSyntaxNode(syntaxNode, text);
  const literalText = literal.text;
  const value = parseFloat(literalText);

  return new NumberLiteral(
    NumberLiteralKind.FLOATING_POINT,
    value,
    [literal],
  );
}
