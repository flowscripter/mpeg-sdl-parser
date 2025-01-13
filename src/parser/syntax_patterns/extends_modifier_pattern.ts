import { apply, opt_sc, rule, seq } from "../../../deps.ts";
import ExtendsModifier from "../../abstract_syntax_tree/node/ExtendsModifier.ts";
import Identifier from "../../abstract_syntax_tree/node/Identifier.ts";
import ParameterValueList from "../../abstract_syntax_tree/node/ParameterValueList.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { IDENTIFIER_RULE, PARAMETER_VALUE_LIST_RULE } from "../syntax_rules.ts";

function getExtendsModifier(
  values: [
    SyntaxToken,
    Identifier,
    ParameterValueList | undefined,
  ],
): ExtendsModifier {
  const [extendsToken, identifier, parameterValueList] = values;

  return new ExtendsModifier(
    identifier,
    parameterValueList,
    extendsToken,
  );
}

function getExtendsModifierPattern() {
  return apply(
    seq(
      getToken(TokenKind.KEYWORD_EXTENDS_TOKEN),
      IDENTIFIER_RULE,
      opt_sc(
        PARAMETER_VALUE_LIST_RULE,
      ),
    ),
    getExtendsModifier,
  );
}

export default getExtendsModifierPattern;
