import { alt_sc, apply, opt_sc, seq } from "typescript-parsec";
import type { AbstractClassId } from "../../abstract_syntax_tree/node/AbstractClassId.ts";
import { BitModifier } from "../../abstract_syntax_tree/node/BitModifier.ts";
import type { Identifier } from "../../abstract_syntax_tree/node/Identifier.ts";
import type { NumberLiteral } from "../../abstract_syntax_tree/node/NumberLiteral.ts";
import { TokenKind } from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type { SyntaxToken } from "../../tokenizer/token/SyntaxToken.ts";
import {
  CLASS_ID_RANGE_RULE,
  EXTENDED_CLASS_ID_RANGE_RULE,
  IDENTIFIER_RULE,
  NUMBER_LITERAL_RULE,
  SINGLE_CLASS_ID_RULE,
} from "../syntax_rules.ts";

function getBitModifier(
  values: [
    SyntaxToken,
    SyntaxToken,
    SyntaxToken,
    NumberLiteral,
    SyntaxToken,
    Identifier | undefined,
    SyntaxToken | undefined,
    AbstractClassId,
  ],
): BitModifier {
  const [
    colonSyntaxToken,
    bitKeywordSyntaxToken,
    openParenthesisSyntaxToken,
    length,
    closeParenthesisSyntaxToken,
    identifier,
    assignmentSyntaxToken,
    classId,
  ] = values;

  return new BitModifier(
    length,
    identifier,
    classId,
    colonSyntaxToken,
    bitKeywordSyntaxToken,
    openParenthesisSyntaxToken,
    closeParenthesisSyntaxToken,
    assignmentSyntaxToken,
  );
}

export function getBitModifierPattern() {
  return apply(
    seq(
      getToken(TokenKind.PUNCTUATOR_COLON_TOKEN),
      getToken(TokenKind.KEYWORD_BIT_TOKEN),
      getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
      NUMBER_LITERAL_RULE,
      getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
      opt_sc(
        IDENTIFIER_RULE,
      ),
      opt_sc(
        getToken(TokenKind.OPERATOR_ASSIGNMENT_TOKEN),
      ),
      alt_sc(
        EXTENDED_CLASS_ID_RANGE_RULE,
        CLASS_ID_RANGE_RULE,
        SINGLE_CLASS_ID_RULE,
      ),
    ),
    getBitModifier,
  );
}
