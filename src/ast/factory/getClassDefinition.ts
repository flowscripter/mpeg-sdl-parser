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
import ClassDefinition from "../node/ClassDefinition";
import type ParameterValueList from "../node/ParameterValueList";

export function getClassDefinition(
  syntaxNode: SyntaxNode,
  text: Text,
): ClassDefinition {
  assertSyntaxNodeType(syntaxNode, "ClassDefinition");

  let legacyKeyword: Token | undefined;
  let classIdentifier: Identifier | undefined;
  let identifier: Identifier | undefined;
  let parameterValueList: ParameterValueList | undefined;
  let semicolonPunctuator: Token | undefined;

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);
  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.IDENTIFIER:
          if (identifier) {
            classIdentifier = childNodeOrToken as Identifier;
          } else {
            identifier = childNodeOrToken as Identifier;
          }
          break;
        case NodeKind.PARAMETER_VALUE_LIST:
          parameterValueList = childNodeOrToken as ParameterValueList;
          break;
        default:
          throw new InternalParseError(
            `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
          );
      }
    } else {
      switch (childNodeOrToken.text) {
        case "legacy":
          legacyKeyword = childNodeOrToken;
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

  return new ClassDefinition(
    legacyKeyword !== undefined,
    classIdentifier!,
    identifier!,
    parameterValueList,
    legacyKeyword,
    semicolonPunctuator!,
  );
}
