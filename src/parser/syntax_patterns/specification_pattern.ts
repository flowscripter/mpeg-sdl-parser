import { alt_sc, apply, rep_sc, seq } from "../../../deps.ts";
import AbstractNode from "../../abstract_syntax_tree/node/AbstractNode.ts";
import Specification from "../../abstract_syntax_tree/node/Specification.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import {
  CLASS_DECLARATION_RULE,
  COMPUTED_ELEMENTARY_TYPE_DEFINITION_RULE,
  MAP_DECLARATION_RULE,
} from "../syntax_rules.ts";

function getSpecification(
  values: [Array<AbstractNode>, SyntaxToken],
): Specification {
  const [globals, eofToken] = values;

  if (globals.length === 0) {
    throw new InternalParserError(
      "Expected at least one global declaration",
    );
  }

  return new Specification(globals, eofToken);
}

function getSpecificationPattern() {
  return apply(
    seq(
      rep_sc(
        alt_sc(
          CLASS_DECLARATION_RULE,
          MAP_DECLARATION_RULE,
          COMPUTED_ELEMENTARY_TYPE_DEFINITION_RULE,
        ),
      ),
      getToken(TokenKind.EOF_TOKEN),
    ),
    getSpecification,
  );
}

export default getSpecificationPattern;
