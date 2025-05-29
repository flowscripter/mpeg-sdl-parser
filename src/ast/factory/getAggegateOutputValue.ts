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
import AggregateOutputValue from "../node/AggregateOutputValue";
import type NumberLiteral from "../node/NumberLiteral";
import type ElementaryType from "../node/ElementaryType";
import type LengthAttribute from "../node/LengthAttribute";

export function getAggregateOutputValue(
  syntaxNode: SyntaxNode,
  text: Text,
): AggregateOutputValue {
  assertSyntaxNodeType(syntaxNode, "AggregateOutputValue");

  const outputValues: (AggregateOutputValue | NumberLiteral | [
    ElementaryType,
    LengthAttribute,
  ])[] = [];
  let openBracePunctuator: Token | undefined;
  let commaPunctuators: Token[] | undefined;
  let closeBracePunctuator: Token | undefined;
  let tempElementaryType: ElementaryType | undefined;

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);
  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.AGGREGATE_OUTPUT_VALUE:
          outputValues.push(childNodeOrToken as AggregateOutputValue);
          break;
        case NodeKind.NUMBER_LITERAL:
          outputValues.push(childNodeOrToken as NumberLiteral);
          break;
        case NodeKind.ELEMENTARY_TYPE:
          if (tempElementaryType === undefined) {
            tempElementaryType = childNodeOrToken as ElementaryType;
          } else {
            throw new InternalParseError(
              `Unexpected ElementaryType node without LengthAttribute`,
            );
          }
          break;
        case NodeKind.LENGTH_ATTRIBUTE:
          if (tempElementaryType !== undefined) {
            outputValues.push([
              tempElementaryType,
              childNodeOrToken as LengthAttribute,
            ]);
            tempElementaryType = undefined; // Reset after using
          } else {
            throw new InternalParseError(
              `Unexpected LengthAttribute node without preceding ElementaryType`,
            );
          }
          break;
        default:
          throw new InternalParseError(
            `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
          );
      }
    } else {
      switch (childNodeOrToken.text) {
        case "{":
          openBracePunctuator = childNodeOrToken;
          break;
        case ",":
          if (commaPunctuators === undefined) {
            commaPunctuators = [];
          }
          commaPunctuators.push(childNodeOrToken);
          break;
        case "}":
          closeBracePunctuator = childNodeOrToken;
          break;
        default:
          throw new InternalParseError(
            `Unexpected token: ${childNodeOrToken.text}`,
          );
      }
    }
  }

  return new AggregateOutputValue(
    outputValues,
    openBracePunctuator!,
    commaPunctuators,
    closeBracePunctuator!,
  );
}
