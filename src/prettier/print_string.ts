import { AstPath, type Doc, doc } from "prettier";
import { getDocWithTrivia } from "./print_utils";
import type AbstractNode from "../ast/node/AbstractNode";
import type StringDefinition from "../ast/node/StringDefinition";
import type StringLiteral from "../ast/node/StringLiteral";
const { join } = doc.builders;

export function printStringDefinition(
  path: AstPath<StringDefinition>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const stringDefinition = path.node;

  const elements = [];

  if (stringDefinition.isReserved) {
    elements.push(getDocWithTrivia(stringDefinition.reservedKeyword!));
  }
  if (stringDefinition.isLegacy) {
    elements.push(getDocWithTrivia(stringDefinition.legacyKeyword!));
  }
  if (stringDefinition.isConst) {
    elements.push(getDocWithTrivia(stringDefinition.constKeyword!));
  }

  if (stringDefinition.alignedModifier !== undefined) {
    elements.push(
      path.call(
        print,
        "alignedModifier" as keyof StringDefinition["alignedModifier"],
      ),
    );
  }
  elements.push(getDocWithTrivia(stringDefinition.stringVariableKindToken));
  elements.push(path.call(print, "identifier"));

  if (stringDefinition.assignmentPunctuator !== undefined) {
    elements.push(getDocWithTrivia(stringDefinition.assignmentPunctuator));
    elements.push(
      path.call(
        print,
        "stringLiteral" as keyof StringDefinition["stringLiteral"],
      ),
    );
  }

  return [
    join(" ", elements),
    getDocWithTrivia(stringDefinition.semicolonPunctuator),
  ];
}

export function printStringLiteral(
  path: AstPath<StringLiteral>,
) {
  const stringLiteral = path.node;

  return join(
    " ",
    stringLiteral.stringLiterals.map((stringLiteral) =>
      getDocWithTrivia(stringLiteral)
    ),
  );
}
