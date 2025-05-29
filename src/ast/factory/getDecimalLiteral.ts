import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import {
  assertSyntaxNodeType,
  getTokenFromSyntaxNode,
} from "../../util/nodeFactoryUtils";
import NumberLiteral from "../node/NumberLiteral";
import { NumberLiteralKind } from "../node/enum/number_literal_kind";

export function getDecimalLiteral(
  syntaxNode: SyntaxNode,
  text: Text,
): NumberLiteral {
  assertSyntaxNodeType(syntaxNode, "DecimalLiteral");

  const literal = getTokenFromSyntaxNode(syntaxNode, text);
  const literalText = literal.text;
  const value = parseFloat(literalText);

  return new NumberLiteral(
    NumberLiteralKind.DECIMAL,
    value,
    [literal],
  );
}
