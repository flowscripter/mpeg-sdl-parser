import { Text } from "@codemirror/state";
import type { TreeCursor } from "@lezer/common";
import { InternalParseError } from "../../ParseError";
import {
  assertSyntaxNodeType,
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import { NodeKind } from "../node/enum/node_kind";
import type Token from "../token/Token";
import type AbstractStatement from "../node/AbstractStatement";
import DefaultClause from "../node/DefaultClause";

export function getDefaultClause(
  cursor: TreeCursor,
  text: Text,
): DefaultClause {
  assertSyntaxNodeType(cursor, "DefaultClause");

  const childNodesAndTokens = getChildNodesAndTokens(cursor, text);

  const statements: AbstractStatement[] = [];
  let defaultKeyword: Token | undefined;
  let colonPunctuator: Token | undefined;
  let openBracePunctuator: Token | undefined;
  let closeBracePunctuator: Token | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.STATEMENT:
          statements.push(childNodeOrToken as AbstractStatement);
          break;
        default:
          throw new InternalParseError(
            `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
          );
      }
    } else {
      switch (childNodeOrToken.text) {
        case "default":
          defaultKeyword = childNodeOrToken;
          break;
        case ":":
          colonPunctuator = childNodeOrToken;
          break;
        case "{":
          openBracePunctuator = childNodeOrToken;
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

  if (defaultKeyword === undefined) {
    throw new InternalParseError(
      "Expected argument defaultKeyword to be defined",
    );
  }
  if (colonPunctuator === undefined) {
    throw new InternalParseError(
      "Expected argument colonPunctuator to be defined",
    );
  }
  return new DefaultClause(
    statements,
    defaultKeyword,
    colonPunctuator,
    openBracePunctuator,
    closeBracePunctuator,
  );
}
