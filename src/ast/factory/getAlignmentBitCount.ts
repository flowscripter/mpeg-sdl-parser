import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import { InternalParseError } from "../../ParseError";
import {
  assertSyntaxNodeType,
  getTokenFromSyntaxNode,
} from "../../util/nodeFactoryUtils";
import NumberLiteral from "../node/NumberLiteral";
import { NumberLiteralKind } from "../node/enum/number_literal_kind";

export function getAlignmentBitCount(
  syntaxNode: SyntaxNode,
  text: Text,
): NumberLiteral {
  assertSyntaxNodeType(syntaxNode, "AlignmentBitCount");

  const literal = getTokenFromSyntaxNode(syntaxNode, text);
  const literalText = literal.text;
  const value = parseInt(literalText, 10);

  if (![8, 16, 32, 64, 128].includes(value)) {
    throw new InternalParseError(
      `Unexpected value: ${value}`,
    );
  }

  return new NumberLiteral(
    NumberLiteralKind.INTEGER,
    value,
    [literal],
  );
}
