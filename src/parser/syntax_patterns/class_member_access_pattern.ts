import { apply, seq } from "../../../deps.ts";
import AbstractNode from "../../abstract_syntax_tree/node/AbstractNode.ts";
import ClassMemberAccess from "../../abstract_syntax_tree/node/ClassMemberAccess.ts";
import Identifier from "../../abstract_syntax_tree/node/Identifier.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
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
function getClassMemberAccessPattern() {
  return apply(
    seq(
      getToken(TokenKind.OPERATOR_CLASS_MEMBER_ACCESS_TOKEN),
      IDENTIFIER_RULE,
    ),
    getClassMemberAccess,
  );
}

export default getClassMemberAccessPattern;
