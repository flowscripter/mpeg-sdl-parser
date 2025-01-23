import { apply, seq } from "../../../deps.ts";
import type { AbstractNode } from "../../abstract_syntax_tree/node/AbstractNode.ts";
import { ClassMemberAccess } from "../../abstract_syntax_tree/node/ClassMemberAccess.ts";
import type { Identifier } from "../../abstract_syntax_tree/node/Identifier.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import { IDENTIFIER_RULE } from "../syntax_rules.ts";

function getClassMemberAccess(
  values: [SyntaxToken, Identifier],
): AbstractNode {
  const [classMemberAccessOperatorToken, memberIdentifier] = values;

  return new ClassMemberAccess(
    memberIdentifier,
    classMemberAccessOperatorToken,
  );
}

export function getClassMemberAccessPattern() {
  return apply(
    seq(
      getToken(TokenKind.OPERATOR_CLASS_MEMBER_ACCESS_TOKEN),
      IDENTIFIER_RULE,
    ),
    getClassMemberAccess,
  );
}
