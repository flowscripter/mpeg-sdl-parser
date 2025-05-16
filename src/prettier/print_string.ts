import { AstPath, type Doc, doc } from "prettier";
import { getDocWithTrivia } from "./print_utils";
const { join } = doc.builders;

export function printStringDefinition(
  path: AstPath<StringDefinition>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const stringDefinition = path.node;

  const elements = [];

  if (stringDefinition.isReserved) {
    elements.push(getDocWithTrivia(stringDefinition.reservedKeywordToken!));
  }
  if (stringDefinition.isLegacy) {
    elements.push(getDocWithTrivia(stringDefinition.legacyKeywordToken!));
  }
  if (stringDefinition.isConst) {
    elements.push(getDocWithTrivia(stringDefinition.constKeywordToken!));
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

  if (stringDefinition.assignmentPunctuatorToken !== undefined) {
    elements.push(getDocWithTrivia(stringDefinition.assignmentPunctuatorToken));
    elements.push(
      path.call(
        print,
        "stringLiteral" as keyof StringDefinition["stringLiteral"],
      ),
    );
  }

  return [
    join(" ", elements),
    getDocWithTrivia(stringDefinition.semicolonPunctuatorToken),
  ];
}

export function printStringLiteral(
  path: AstPath<StringLiteral>,
) {
  const stringLiteral = path.node;

  return join(
    " ",
    stringLiteral.stringLiteralTokens.map((stringLiteralToken) =>
      getDocWithTrivia(stringLiteralToken)
    ),
  );
}
