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
import type NumberLiteral from "../node/NumberLiteral";
import CaseClause from "../node/CaseClause";
import type AbstractStatement from "../node/AbstractStatement";

export function getCaseClause(
  cursor: TreeCursor,
  text: Text,
): CaseClause {
  assertSyntaxNodeType(cursor, "CaseClause");

  const childNodesAndTokens = getChildNodesAndTokens(cursor, text);

  let value: NumberLiteral | undefined;
  const statements: AbstractStatement[] = [];
  let caseKeyword: Token | undefined;
  let colonPunctuator: Token | undefined;
  let openBracePunctuator: Token | undefined;
  let breakKeyword: Token | undefined;
  let semicolonPunctuator: Token | undefined;
  let closeBracePunctuator: Token | undefined;

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      switch (childNodeOrToken.nodeKind) {
        case NodeKind.NUMBER_LITERAL:
          value = childNodeOrToken as NumberLiteral;
          break;
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
        case "case":
          caseKeyword = childNodeOrToken;
          break;
        case ":":
          colonPunctuator = childNodeOrToken;
          break;
        case "{":
          openBracePunctuator = childNodeOrToken;
          break;
        case "break":
          breakKeyword = childNodeOrToken;
          break;
        case ";":
          semicolonPunctuator = childNodeOrToken;
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

  if (value === undefined) {
    throw new InternalParseError("Expected argument value to be defined");
  }
  if (caseKeyword === undefined) {
    throw new InternalParseError("Expected argument caseKeyword to be defined");
  }
  if (colonPunctuator === undefined) {
    throw new InternalParseError(
      "Expected argument colonPunctuator to be defined",
    );
  }
  return new CaseClause(
    value,
    statements,
    caseKeyword,
    colonPunctuator,
    openBracePunctuator,
    breakKeyword,
    semicolonPunctuator,
    closeBracePunctuator,
  );
}
