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
import StringLiteral from "../node/StringLiteral";
import { StringLiteralKind } from "../node/enum/string_literal_kind";

const ESCAPED_BACKSLASH_REGEX = /\\\\/g;
const ESCAPED_DOUBLE_QUOTE_REGEX = /\\"/g;

export function getBase64StringLiteral(
  syntaxNode: SyntaxNode,
  text: Text,
): StringLiteral {
  assertSyntaxNodeType(syntaxNode, "Base64StringLiteral");

  const childNodesAndTokens = getChildNodesAndTokens(syntaxNode, text);

  const literals: Token[] = [];
  let value = "";

  for (const childNodeOrToken of childNodesAndTokens) {
    if (isAbstractNode(childNodeOrToken)) {
      throw new InternalParseError(
        `Unexpected node kind: ${NodeKind[childNodeOrToken.nodeKind]}`,
      );
    } else {
      const tokenText = childNodeOrToken.text;

      if (tokenText !== '"') {
        value += tokenText, syntaxNode;
      }
      literals.push(childNodeOrToken);
    }
  }
  value = value.replaceAll(ESCAPED_DOUBLE_QUOTE_REGEX, "'")
    .replaceAll(ESCAPED_BACKSLASH_REGEX, "\\");

  return new StringLiteral(
    StringLiteralKind.BASIC,
    value!,
    literals,
  );
}
