import { Text } from "@codemirror/state";
import { InternalParseError } from "../../ParseError";
import {
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import { NodeKind } from "../node/enum/node_kind";
import type { Token } from "../token/Token";
import { ExtendsModifier } from "../node/ExtendsModifier";
import type { Identifier } from "../node/Identifier";
import type { ParameterValueList } from "../node/ParameterValueList";
import type { TreeCursor } from "@lezer/common";

export function getExtendsModifier(
  cursor: TreeCursor,
  text: Text,
): ExtendsModifier {
  const childNodesAndTokens = getChildNodesAndTokens(cursor, text);

  let identifier: Identifier | undefined;
  let parameterValueList: ParameterValueList | undefined;
  let extendsKeyword: Token | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.IDENTIFIER:
          identifier = childNodeOrToken as Identifier;
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
      if (childNodeOrToken.text === "extends") {
        extendsKeyword = childNodeOrToken;
      } else {
        throw new InternalParseError(
          `Unexpected token: ${childNodeOrToken.text}`,
        );
      }
    }
  }

  if (identifier === undefined) {
    throw new InternalParseError("Expected argument identifier to be defined");
  }
  if (extendsKeyword === undefined) {
    throw new InternalParseError(
      "Expected argument extendsKeyword to be defined",
    );
  }
  return new ExtendsModifier(
    identifier,
    parameterValueList,
    extendsKeyword,
  );
}
