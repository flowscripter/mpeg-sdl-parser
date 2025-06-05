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
import ClassMemberAccess from "../node/ClassMemberAccess";

export function getClassMemberAccess(
  syntaxNode: SyntaxNode,
  text: Text,
): ClassMemberAccess {
  assertSyntaxNodeType(syntaxNode, "ClassMemberAccess");

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);

  let identifier: Identifier | undefined;
  let classMemberAccessOperator: Token | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      if (childNodeOrToken.nodeKind === NodeKind.IDENTIFIER) {
        identifier = childNodeOrToken as Identifier;
      } else {
        throw new InternalParseError(
          `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
        );
      }
    } else {
      if (childNodeOrToken.text === ".") {
        classMemberAccessOperator = childNodeOrToken;
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

  if (classMemberAccessOperator === undefined) {
    throw new InternalParseError(
      "Expected argument classMemberAccessOperator to be defined",
    );
  }

  return new ClassMemberAccess(
    identifier,
    classMemberAccessOperator,
  );
}
