import { apply, opt_sc, rep_sc, seq } from "../../../deps.ts";
import AbstractStatement from "../../abstract_syntax_tree/node/AbstractStatement.ts";
import AlignedModifier from "../../abstract_syntax_tree/node/AlignedModifier.ts";
import BitModifier from "../../abstract_syntax_tree/node/BitModifier.ts";
import ClassDeclaration from "../../abstract_syntax_tree/node/ClassDeclaration.ts";
import Expandable from "../../abstract_syntax_tree/node/ExpandableModifier.ts";
import ExtendsModifier from "../../abstract_syntax_tree/node/ExtendsModifier.ts";
import Identifier from "../../abstract_syntax_tree/node/Identifier.ts";
import ParameterList from "../../abstract_syntax_tree/node/ParameterList.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import {
  ALIGNED_MODIFIER_RULE,
  BIT_MODIFIER_RULE,
  EXPANDABLE_MODIFIER_RULE,
  EXTENDS_MODIFIER_RULE,
  IDENTIFIER_RULE,
  PARAMETER_LIST_RULE,
  STATEMENT_RULE,
} from "../syntax_rules.ts";

function getClassDeclaration(
  values: [
    AlignedModifier | undefined,
    Expandable | undefined,
    SyntaxToken | undefined,
    SyntaxToken,
    Identifier,
    ParameterList | undefined,
    ExtendsModifier | undefined,
    BitModifier | undefined,
    SyntaxToken,
    AbstractStatement[],
    SyntaxToken,
  ],
): ClassDeclaration {
  const [
    alignedModifier,
    expandable,
    abstractToken,
    classToken,
    identifier,
    parameterList,
    extendsModifier,
    bitModifier,
    openBraceToken,
    statements,
    closeBraceToken,
  ] = values;

  return new ClassDeclaration(
    alignedModifier,
    expandable,
    abstractToken !== undefined,
    identifier,
    parameterList,
    extendsModifier,
    bitModifier,
    statements,
    abstractToken,
    classToken,
    openBraceToken,
    closeBraceToken,
  );
}

function getClassDeclarationPattern() {
  return apply(
    seq(
      opt_sc(
        ALIGNED_MODIFIER_RULE,
      ),
      opt_sc(
        EXPANDABLE_MODIFIER_RULE,
      ),
      opt_sc(
        getToken(TokenKind.KEYWORD_ABSTRACT_TOKEN),
      ),
      getToken(TokenKind.KEYWORD_CLASS_TOKEN),
      IDENTIFIER_RULE,
      opt_sc(
        PARAMETER_LIST_RULE,
      ),
      opt_sc(
        EXTENDS_MODIFIER_RULE,
      ),
      opt_sc(
        BIT_MODIFIER_RULE,
      ),
      getToken(TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN),
      rep_sc(
        STATEMENT_RULE,
      ),
      getToken(TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN),
    ),
    getClassDeclaration,
  );
}

export default getClassDeclarationPattern;
