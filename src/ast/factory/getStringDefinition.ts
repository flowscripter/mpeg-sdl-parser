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
import StringDefinition from "../node/StringDefinition";
import StringLiteral from "../node/StringLiteral";
import AlignedModifier from "../node/AlignedModifier";
import { StringVariableKind } from "../node/enum/string_variable_kind";

export function getStringDefinition(
  syntaxNode: SyntaxNode,
  text: Text,
): StringDefinition {
  assertSyntaxNodeType(syntaxNode, "StringDefinition");

  let alignedModifier: AlignedModifier | undefined;
  let stringVariableKind: StringVariableKind | undefined;
  let identifier: Identifier | undefined;
  let stringLiteral: StringLiteral | undefined;
  let reservedKeyword: Token | undefined;
  let legacyKeyword: Token | undefined;
  let constKeyword: Token | undefined;
  let stringVariableKindToken: Token | undefined;
  let assignmentPunctuator: Token | undefined;
  let semicolonPunctuator: Token | undefined;

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);
  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.ALIGNED_MODIFIER:
          alignedModifier = childNodeOrToken as AlignedModifier;
          break;
        case NodeKind.IDENTIFIER:
          identifier = childNodeOrToken as Identifier;
          break;
        case NodeKind.STRING_LITERAL:
          stringLiteral = childNodeOrToken as StringLiteral;
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
        case "utf16string":
          stringVariableKind = StringVariableKind.UTF16;
          stringVariableKindToken = childNodeOrToken;
          break;
        case "utf8string":
          stringVariableKind = StringVariableKind.UTF8;
          stringVariableKindToken = childNodeOrToken;
          break;
        case "utf8list":
          stringVariableKind = StringVariableKind.UTF8_LIST;
          stringVariableKindToken = childNodeOrToken;
          break;
        case "utfstring":
          stringVariableKind = StringVariableKind.UTF;
          stringVariableKindToken = childNodeOrToken;
          break;
        case "base64string":
          stringVariableKind = StringVariableKind.BASE64;
          stringVariableKindToken = childNodeOrToken;
          break;
        case "=":
          assignmentPunctuator = childNodeOrToken;
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

  return new StringDefinition(
    reservedKeyword !== undefined,
    legacyKeyword !== undefined,
    constKeyword !== undefined,
    alignedModifier,
    stringVariableKind!,
    identifier!,
    stringLiteral,
    reservedKeyword,
    legacyKeyword,
    constKeyword,
    stringVariableKindToken!,
    assignmentPunctuator,
    semicolonPunctuator!,
  );
}
