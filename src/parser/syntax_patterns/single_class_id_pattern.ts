import { apply } from "../../../deps.ts";
import type { NumberLiteral } from "../../abstract_syntax_tree/node/NumberLiteral.ts";
import { SingleClassId } from "../../abstract_syntax_tree/node/SingleClassId.ts";
import { NumberLiteralKind } from "../../abstract_syntax_tree/node/enum/number_literal_kind.ts";
import { SyntacticParserError } from "../../util/ParserError.ts";
import { NUMBER_LITERAL_RULE } from "../syntax_rules.ts";

function getSingleClassId(
  numberLiteral: NumberLiteral,
): SingleClassId {
  if (
    (numberLiteral.numberLiteralKind !== NumberLiteralKind.BINARY) &&
    (numberLiteral.numberLiteralKind !== NumberLiteralKind.HEXADECIMAL) &&
    (numberLiteral.numberLiteralKind !== NumberLiteralKind.INTEGER) &&
    (numberLiteral.numberLiteralKind !== NumberLiteralKind.MULTIPLE_CHARACTER)
  ) {
    throw new SyntacticParserError(
      "Class ID must be a binary, hexadecimal, integer, or multiple character number literal.",
      numberLiteral.tokens[0],
    );
  }

  if (numberLiteral.value < 0) {
    throw new SyntacticParserError(
      "Class ID must be a positive value.",
      numberLiteral.tokens[0],
    );
  }

  return new SingleClassId(numberLiteral);
}

export function getSingleClassIdPattern() {
  return apply(
    NUMBER_LITERAL_RULE,
    getSingleClassId,
  );
}
