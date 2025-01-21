import { alt_sc, apply, seq } from "../../../deps.ts";
import type ElementaryType from "../../abstract_syntax_tree/node/ElementaryType.ts";
import NodeKind from "../../abstract_syntax_tree/node/enum/node_kind.ts";
import type Identifier from "../../abstract_syntax_tree/node/Identifier.ts";
import Parameter from "../../abstract_syntax_tree/node/Parameter.ts";
import { ELEMENTARY_TYPE_RULE, IDENTIFIER_RULE } from "../syntax_rules.ts";

function getParameter(
  values: [Identifier | ElementaryType, Identifier],
): Parameter {
  const [classIdentifierOrElementaryType, identifier] = values;

  if (classIdentifierOrElementaryType.nodeKind === NodeKind.IDENTIFIER) {
    return new Parameter(
      classIdentifierOrElementaryType as Identifier,
      undefined,
      identifier,
    );
  }

  return new Parameter(
    undefined,
    classIdentifierOrElementaryType as ElementaryType,
    identifier,
  );
}

function getParameterPattern() {
  return apply(
    seq(
      alt_sc(
        IDENTIFIER_RULE,
        ELEMENTARY_TYPE_RULE,
      ),
      IDENTIFIER_RULE,
    ),
    getParameter,
  );
}

export default getParameterPattern;
