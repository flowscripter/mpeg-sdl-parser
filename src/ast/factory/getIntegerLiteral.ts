import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import {
  assertSyntaxNodeType,
  getTokenFromSyntaxNode,
} from "../../util/nodeFactoryUtils";
import NumberLiteral from "../node/NumberLiteral";
import { NumberLiteralKind } from "../node/enum/number_literal_kind";

export function getIntegerLiteral(
  syntaxNode: SyntaxNode,
  text: Text,
): NumberLiteral {
  assertSyntaxNodeType(syntaxNode, "IntegerLiteral");

  const literal = getTokenFromSyntaxNode(syntaxNode, text);
  const literalText = literal.text;
  const value = parseInt(literalText, 10);

  return new NumberLiteral(
    NumberLiteralKind.INTEGER,
    value,
    [literal],
  );
}
