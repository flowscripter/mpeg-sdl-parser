import { Text } from "@codemirror/state";
import type { TreeCursor } from "@lezer/common";
import {
  assertSyntaxNodeType,
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import SingleClassId from "../node/ClassId";
import { InternalParseError } from "../../ParseError";
import { NodeKind } from "../node/enum/node_kind";
import ClassIdRange from "../node/ClassIdRange";
import type Token from "../token/Token";

export function getClassIdRange(
  cursor: TreeCursor,
  text: Text,
): ClassIdRange {
  assertSyntaxNodeType(cursor, "ClassIdRange");

  const childNodesAndTokens = getChildNodesAndTokens(cursor, text);

  let startClassId: SingleClassId | undefined;
  let endClassId: SingleClassId | undefined;
  let rangeOperator: Token | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      if (childNodeOrToken.nodeKind === NodeKind.CLASS_ID) {
        if (startClassId === undefined) {
          startClassId = childNodeOrToken as SingleClassId;
        } else {
          endClassId = childNodeOrToken as SingleClassId;
        }
      } else {
        throw new InternalParseError(
          `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
        );
      }
    } else {
      if (childNodeOrToken.text === "..") {
        rangeOperator = childNodeOrToken;
      } else {
        throw new InternalParseError(
          `Unexpected token: ${childNodeOrToken.text}`,
        );
      }
    }
  }

  if (startClassId === undefined) {
    throw new InternalParseError(
      "Expected argument startClassId to be defined",
    );
  }
  if (endClassId === undefined) {
    throw new InternalParseError("Expected argument endClassId to be defined");
  }
  if (rangeOperator === undefined) {
    throw new InternalParseError(
      "Expected argument rangeOperator to be defined",
    );
  }
  return new ClassIdRange(
    startClassId,
    endClassId,
    rangeOperator,
  );
}
