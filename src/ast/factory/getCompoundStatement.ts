import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import { InternalParseError } from "../../ParseError";
import {
  assertSyntaxNodeType,
  getChildNodesAndTokens,
  isAbstractNode,
} from "../../util/nodeFactoryUtils";
import { NodeKind } from "../node/enum/node_kind";
import type Token from "../token/Token";
import CompoundStatement from "../node/CompoundStatement";
import type AbstractStatement from "../node/AbstractStatement";

export function getCompoundStatement(
  syntaxNode: SyntaxNode,
  text: Text,
): CompoundStatement {
  assertSyntaxNodeType(syntaxNode, "CompoundStatement");

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);

  const statements: AbstractStatement[] = [];
  let openBracePunctuator: Token | undefined;
  let closeBracePunctuator: Token | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      if (childNodeOrToken.nodeKind === NodeKind.STATEMENT) {
        statements.push(childNodeOrToken as AbstractStatement);
      } else {
        throw new InternalParseError(
          `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
        );
      }
    } else {
      switch (childNodeOrToken.text) {
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

  return new CompoundStatement(
    statements,
    openBracePunctuator!,
    closeBracePunctuator!,
  );
}
