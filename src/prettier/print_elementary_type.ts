import { AstPath, type Doc, doc } from "prettier";
import { getDocWithTrivia } from "./print_utils";
const { join } = doc.builders;

export function printComputedElementaryTypeDefinition(
  path: AstPath<ComputedElementaryTypeDefinition>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const elements = [];

  const computedElementaryTypeDefinition = path.node;
  elements.push(
    getDocWithTrivia(computedElementaryTypeDefinition.computedKeywordToken),
  );
  if (computedElementaryTypeDefinition.isConst) {
    elements.push(
      getDocWithTrivia(computedElementaryTypeDefinition.constKeywordToken!),
    );
  }
  elements.push(path.call(print, "elementaryType"));
  elements.push(path.call(print, "identifier"));
  if (computedElementaryTypeDefinition.value !== undefined) {
    elements.push(
      getDocWithTrivia(
        computedElementaryTypeDefinition.assignmentOperatorToken!,
      ),
    );
    elements.push(
      path.call(
        print,
        "value" as keyof ComputedElementaryTypeDefinition["value"],
      ),
    );
  }

  return [
    join(" ", elements),
    getDocWithTrivia(computedElementaryTypeDefinition.semicolonPunctuatorToken),
  ];
}

export function printElementaryType(path: AstPath<ElementaryType>): Doc {
  const elementaryType = path.node;
  const elementaryTypeKind = elementaryType.elementaryTypeKind;

  switch (elementaryTypeKind) {
    case ElementaryTypeKind.BIT:
    case ElementaryTypeKind.FLOATING_POINT:
    case ElementaryTypeKind.INTEGER:
      return getDocWithTrivia(elementaryType.typeToken);
    case ElementaryTypeKind.UNSIGNED_INTEGER:
      return join(" ", [
        getDocWithTrivia(elementaryType.unsignedQualifierKeywordToken!),
        getDocWithTrivia(elementaryType.typeToken),
      ]);
    default: {
      const exhaustiveCheck: never = elementaryTypeKind;
      throw new Error(
        "Unreachable code reached, elementaryTypeKind == " + exhaustiveCheck,
      );
    }
  }
}

export function printElementaryTypeDefinition(
  path: AstPath<ElementaryTypeDefinition>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const elementaryTypeDefinition = path.node;

  const elements = [];

  if (elementaryTypeDefinition.isReserved) {
    elements.push(
      getDocWithTrivia(elementaryTypeDefinition.reservedKeywordToken!),
    );
  }

  if (elementaryTypeDefinition.isLegacy) {
    elements.push(
      getDocWithTrivia(elementaryTypeDefinition.legacyKeywordToken!),
    );
  }

  if (elementaryTypeDefinition.isConst) {
    elements.push(
      getDocWithTrivia(elementaryTypeDefinition.constKeywordToken!),
    );
  }

  if (elementaryTypeDefinition.alignedModifier !== undefined) {
    elements.push(
      path.call(
        print,
        "alignedModifier" as keyof ElementaryTypeDefinition["alignedModifier"],
      ),
    );
  }

  const typeClause = [
    path.call(print, "elementaryType"),
    path.call(print, "lengthAttribute"),
  ];

  if (elementaryTypeDefinition.isLookahead) {
    typeClause.push(
      getDocWithTrivia(elementaryTypeDefinition.lookaheadOperatorToken!),
    );
  }
  elements.push(typeClause);
  elements.push(path.call(print, "identifier"));

  if (elementaryTypeDefinition.assignmentOperatorToken !== undefined) {
    elements.push(
      getDocWithTrivia(elementaryTypeDefinition.assignmentOperatorToken!),
    );
    elements.push(
      path.call(print, "value" as keyof ElementaryTypeDefinition["value"]),
    );
    if (elementaryTypeDefinition.endValue !== undefined) {
      elements.push(
        getDocWithTrivia(elementaryTypeDefinition.rangeOperatorToken!),
      );
      elements.push(
        path.call(
          print,
          "endValue" as keyof ElementaryTypeDefinition["endValue"],
        ),
      );
    }
  }

  return [
    join(" ", elements),
    getDocWithTrivia(elementaryTypeDefinition.semicolonPunctuatorToken),
  ];
}
