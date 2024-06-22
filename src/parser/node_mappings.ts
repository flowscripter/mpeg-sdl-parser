import { Token, TokenError } from "../../deps.ts";
import TokenKind from "../tokenizer/token_kind.ts";
import * as ast from "../abstract_syntax_tree/abstract_syntax_tree.ts";
import NodeKind from "../abstract_syntax_tree/node_kind.ts";
import getLogger from "../util/logger.ts";
import { Node } from "../abstract_syntax_tree/abstract_syntax_tree.ts";

const logger = getLogger("parser");

export function getComment(value: Token<TokenKind>): ast.Comment {
  let comment = value.text;

  if (!comment.startsWith("//")) {
    throw new TokenError(
      value.pos,
      `Missing comment start characters: ${comment}`,
    );
  }

  comment = comment.substring(2).trim();

  return emit({
    kind: NodeKind.COMMENT_NODE,
    comment,
  });
}

export function getDefinition(value: ast.Statement[]): ast.Definition {
  return emit({
    kind: NodeKind.DEFINITION,
    statements: value,
  });
}

function emit<T>(node: T): T {
  logger.debug("%s => %j", NodeKind[(node as Node).kind], node);

  return node;
}
