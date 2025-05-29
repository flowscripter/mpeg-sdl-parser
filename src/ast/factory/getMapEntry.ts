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
import MapEntry from "../node/MapEntry";
import type NumberLiteral from "../node/NumberLiteral";
import type AggregateOutputValue from "../node/AggregateOutputValue";

export function getMapEntry(
  syntaxNode: SyntaxNode,
  text: Text,
): MapEntry {
  assertSyntaxNodeType(syntaxNode, "MapEntry");

  let inputValue: NumberLiteral | undefined;
  let outputValue: AggregateOutputValue | undefined;
  let commaPunctuator: Token | undefined;

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);
  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.AGGREGATE_OUTPUT_VALUE:
          outputValue = childNodeOrToken as AggregateOutputValue;
          break;
        case NodeKind.NUMBER_LITERAL:
          inputValue = childNodeOrToken as NumberLiteral;
          break;
        default:
          throw new InternalParseError(
            `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
          );
      }
    } else {
      if (childNodeOrToken.text === ",") {
        commaPunctuator = childNodeOrToken;
      } else {
        throw new InternalParseError(
          `Unexpected token: ${childNodeOrToken.text}`,
        );
      }
    }
  }

  return new MapEntry(
    inputValue!,
    outputValue!,
    commaPunctuator!,
  );
}
