import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import { InternalParseError } from "../../ParseError";
import {
  assertSyntaxNodeType,
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import type AbstractExpression from "../node/AbstractExpression";
import ComputedElementaryTypeDefinition from "../node/ComputedElementaryTypeDefinition";
import type ElementaryType from "../node/ElementaryType";
import { NodeKind } from "../node/enum/node_kind";
import type Identifier from "../node/Identifier";
import type Token from "../token/Token";
import type NumberLiteral from "../node/NumberLiteral";

export function getComputedElementaryTypeDefinition(
  syntaxNode: SyntaxNode,
  text: Text,
): ComputedElementaryTypeDefinition {
  assertSyntaxNodeType(syntaxNode, "ComputedElementaryTypeDefinition");

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);

  let constKeyword: Token | undefined;
  let computedKeyword: Token | undefined;
  let elementaryType: ElementaryType | undefined;
  let identifier: Identifier | undefined;
  let assignmentOperator: Token | undefined;
  let value: AbstractExpression | Identifier | NumberLiteral | undefined;
  let semicolonPunctuator: Token | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.ELEMENTARY_TYPE:
          elementaryType = childNodeOrToken as ElementaryType;
          break;
        case NodeKind.IDENTIFIER:
          if (identifier === undefined) {
            identifier = childNodeOrToken as Identifier;
          } else if (value == undefined) {
            value = childNodeOrToken as AbstractExpression;
          }
          break;
        case NodeKind.EXPRESSION:
          value = childNodeOrToken as AbstractExpression;
          break;
        case NodeKind.NUMBER_LITERAL:
          value = childNodeOrToken as NumberLiteral;
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
        case "const":
          constKeyword = childNodeOrToken;
          break;
        case "=":
          assignmentOperator = childNodeOrToken;
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

  return new ComputedElementaryTypeDefinition(
    constKeyword !== undefined,
    elementaryType!,
    identifier!,
    value!,
    computedKeyword!,
    constKeyword,
    assignmentOperator,
    semicolonPunctuator!,
  );
}
