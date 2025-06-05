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
import type Token from "../token/Token";
import ExtendedClassIdRange from "../node/ExtendedClassIdRange";
import type ClassIdRange from "../node/ClassIdRange";
import type AbstractClassId from "../node/AbstractClassId";
import { ClassIdKind } from "../node/enum/class_id_kind";

export function getExtendedClassIdRange(
  cursor: TreeCursor,
  text: Text,
): ExtendedClassIdRange {
  assertSyntaxNodeType(cursor, "ExtendedClassIdRange");

  const childNodesAndTokens = getChildNodesAndTokens(cursor, text);
  const classIds: (SingleClassId | ClassIdRange)[] = [];
  const commaPunctuators: Token[] = [];

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      if (childNodeOrToken.nodeKind === NodeKind.CLASS_ID) {
        if (
          (childNodeOrToken as AbstractClassId).classIdKind ===
            ClassIdKind.SINGLE
        ) {
          classIds.push(childNodeOrToken as SingleClassId);
        } else if (
          (childNodeOrToken as AbstractClassId).classIdKind ===
            ClassIdKind.RANGE
        ) {
          classIds.push(childNodeOrToken as ClassIdRange);
        } else {
          throw new InternalParseError(
            `Unexpected class ID kind: ${
              ClassIdKind[(childNodeOrToken as AbstractClassId).classIdKind]
            }`,
          );
        }
      } else {
        throw new InternalParseError(
          `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
        );
      }
    } else {
      if (childNodeOrToken.text === ",") {
        commaPunctuators.push(childNodeOrToken);
      } else {
        throw new InternalParseError(
          `Unexpected token: ${childNodeOrToken.text}`,
        );
      }
    }
  }

  return new ExtendedClassIdRange(
    classIds,
    commaPunctuators,
  );
}
