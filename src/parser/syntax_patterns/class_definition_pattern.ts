import { apply, opt_sc, seq } from "../../../deps.ts";
import ClassDefinition from "../../abstract_syntax_tree/node/ClassDefinition.ts";
import type Identifier from "../../abstract_syntax_tree/node/Identifier.ts";
import type ParameterValueList from "../../abstract_syntax_tree/node/ParameterValueList.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import type SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { IDENTIFIER_RULE, PARAMETER_VALUE_LIST_RULE } from "../syntax_rules.ts";

function getClassDefinition(
  values: [
    SyntaxToken | undefined,
    Identifier,
    Identifier,
    ParameterValueList | undefined,
    SyntaxToken,
  ],
): ClassDefinition {
  const [
    legacySyntaxToken,
    classIdentifier,
    identifier,
    parameterValueList,
    semicolonSyntaxToken,
  ] = values;

  return new ClassDefinition(
    legacySyntaxToken !== undefined,
    classIdentifier,
    identifier,
    parameterValueList,
    legacySyntaxToken,
    semicolonSyntaxToken,
  );
}

function getClassDefinitionPattern() {
  return apply(
    seq(
      opt_sc(
        getToken(TokenKind.KEYWORD_LEGACY_TOKEN),
      ),
      IDENTIFIER_RULE,
      IDENTIFIER_RULE,
      opt_sc(
        PARAMETER_VALUE_LIST_RULE,
      ),
      getToken(TokenKind.PUNCTUATOR_SEMICOLON_TOKEN),
    ),
    getClassDefinition,
  );
}

export default getClassDefinitionPattern;
