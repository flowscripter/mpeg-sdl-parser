import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import { InternalParseError } from "../../ParseError";
import {
  assertSyntaxNodeType,
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import type AbstractExpression from "../node/AbstractExpression";
import ElementaryTypeDefinition from "../node/ElementaryTypeDefinition";
import type ElementaryType from "../node/ElementaryType";
import { NodeKind } from "../node/enum/node_kind";
import type Identifier from "../node/Identifier";
import type Token from "../token/Token";
import AlignedModifier from "../node/AlignedModifier";
import type LengthAttribute from "../node/LengthAttribute";
import type NumberLiteral from "../node/NumberLiteral";

export function getElementaryTypeDefinition(
  syntaxNode: SyntaxNode,
  text: Text,
): ElementaryTypeDefinition {
  assertSyntaxNodeType(syntaxNode, "ElementaryTypeDefinition");

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);

  let reservedKeyword: Token | undefined;
  let legacyKeyword: Token | undefined;
  let constKeyword: Token | undefined;
  let alignedModifier: AlignedModifier | undefined;
  let lengthAttribute: LengthAttribute | undefined;
  let lookAheadOperator: Token | undefined;
  let elementaryType: ElementaryType | undefined;
  let identifier: Identifier | undefined;
  let assignmentOperator: Token | undefined;
  let value: AbstractExpression | Identifier | NumberLiteral | undefined;
  let endValue: AbstractExpression | Identifier | NumberLiteral | undefined;
  let rangeOperator: Token | undefined;
  let semicolonPunctuator: Token | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.ALIGNED_MODIFIER:
          alignedModifier = childNodeOrToken as AlignedModifier;
          break;
        case NodeKind.ELEMENTARY_TYPE:
          elementaryType = childNodeOrToken as ElementaryType;
          break;
        case NodeKind.LENGTH_ATTRIBUTE:
          lengthAttribute = childNodeOrToken as LengthAttribute;
          break;
        case NodeKind.IDENTIFIER:
          if (identifier === undefined) {
            identifier = childNodeOrToken as Identifier;
          } else if (value == undefined) {
            value = childNodeOrToken as AbstractExpression;
          } else {
            endValue = childNodeOrToken as AbstractExpression;
          }
          break;
        case NodeKind.EXPRESSION:
          if (value == undefined) {
            value = childNodeOrToken as AbstractExpression;
          } else {
            endValue = childNodeOrToken as AbstractExpression;
          }
          break;
        case NodeKind.NUMBER_LITERAL:
          if (value == undefined) {
            value = childNodeOrToken as NumberLiteral;
          } else {
            endValue = childNodeOrToken as NumberLiteral;
          }
          break;
        default:
          throw new InternalParseError(
            `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
          );
      }
    } else {
      switch (childNodeOrToken.text) {
        case "reserved":
          reservedKeyword = childNodeOrToken;
          break;
        case "legacy":
          legacyKeyword = childNodeOrToken;
          break;
        case "const":
          constKeyword = childNodeOrToken;
          break;
        case "*":
          lookAheadOperator = childNodeOrToken;
          break;
        case "=":
          assignmentOperator = childNodeOrToken;
          break;
        case "..":
          rangeOperator = childNodeOrToken;
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

  return new ElementaryTypeDefinition(
    reservedKeyword !== undefined,
    legacyKeyword !== undefined,
    constKeyword !== undefined,
    alignedModifier,
    elementaryType!,
    lengthAttribute!,
    lookAheadOperator !== undefined,
    identifier!,
    value,
    endValue,
    reservedKeyword,
    legacyKeyword,
    constKeyword,
    lookAheadOperator,
    assignmentOperator,
    rangeOperator,
    semicolonPunctuator!,
  );
}
