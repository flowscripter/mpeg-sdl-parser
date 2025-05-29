import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import { InternalParseError } from "../../ParseError";
import {
  assertSyntaxNodeType,
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import { NodeKind } from "../node/enum/node_kind";
import type Identifier from "../node/Identifier";
import type Token from "../token/Token";
import MapDeclaration from "../node/MapDeclaration";
import type ElementaryType from "../node/ElementaryType";
import type MapEntry from "../node/MapEntry";

export function getMapDeclaration(
  syntaxNode: SyntaxNode,
  text: Text,
): MapDeclaration {
  assertSyntaxNodeType(syntaxNode, "MapDeclaration");

  let identifier: Identifier | undefined;
  let outputElementaryType: ElementaryType | undefined;
  let outputClassIdentifier: Identifier | undefined;
  const mapEntries: MapEntry[] = [];
  let mapKeyword: Token | undefined;
  let openParenthesisPunctuator: Token | undefined;
  let closeParenthesisPunctuator: Token | undefined;
  let openBracePunctuator: Token | undefined;
  let commaPunctuators: Token[] | undefined;
  let closeBracePunctuator: Token | undefined;

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);
  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.IDENTIFIER:
          if (identifier === undefined) {
            identifier = childNodeOrToken as Identifier;
          } else {
            outputClassIdentifier = childNodeOrToken as Identifier;
          }
          break;
        case NodeKind.MAP_ENTRY:
          mapEntries.push(childNodeOrToken as MapEntry);
          break;
        case NodeKind.ELEMENTARY_TYPE:
          outputElementaryType = childNodeOrToken as ElementaryType;
          break;
        default:
          throw new InternalParseError(
            `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
          );
      }
    } else {
      switch (childNodeOrToken.text) {
        case "map":
          mapKeyword = childNodeOrToken;
          break;
        case "(":
          openParenthesisPunctuator = childNodeOrToken;
          break;
        case ")":
          closeParenthesisPunctuator = childNodeOrToken;
          break;
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

  return new MapDeclaration(
    identifier!,
    outputElementaryType,
    outputClassIdentifier,
    mapEntries,
    mapKeyword!,
    openParenthesisPunctuator!,
    closeParenthesisPunctuator!,
    openBracePunctuator!,
    commaPunctuators,
    closeBracePunctuator!,
  );
}
