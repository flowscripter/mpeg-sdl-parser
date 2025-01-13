import { alt_sc, apply, kleft, rep_sc } from "../../../deps.ts";
import AbstractNode from "../../abstract_syntax_tree/node/AbstractNode.ts";
import Specification from "../../abstract_syntax_tree/node/Specification.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import { InternalParserError } from "../../util/ParserError.ts";
import {
  CLASS_DECLARATION_RULE,
  COMPUTED_ELEMENTARY_TYPE_DEFINITION_RULE,
  MAP_DECLARATION_RULE,
} from "../syntax_rules.ts";

function getSpecification(
  globals: Array<AbstractNode>,
): Specification {
  if (globals.length === 0) {
    throw new InternalParserError(
      "Expected at least one global declaration",
    );
  }

  return new Specification(globals);
}

function getSpecificationPattern() {
  return apply(
    kleft(
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
