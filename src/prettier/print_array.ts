// TODO: re-implement all of thse
import { AstPath, type Doc, doc } from "prettier";
import { getDocWithTrivia } from "./print_utils";
const { join } = doc.builders;

export function printAbstractArrayDimension(
  path: AstPath<AbstractArrayDimension>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const { arrayDimensionKind } = path.node;
  switch (arrayDimensionKind) {
    case ArrayDimensionKind.EXPLICIT: {
      const explicitArrayDimensionNode = path.node as ExplicitArrayDimension;
      return [
        getDocWithTrivia(explicitArrayDimensionNode.openBracketPunctuatorToken),
        (path as AstPath<ExplicitArrayDimension>).call(print, "size"),
        getDocWithTrivia(
          explicitArrayDimensionNode.closeBracketPunctuatorToken,
        ),
      ];
    }
    case ArrayDimensionKind.PARTIAL: {
      const partialArrayDimensionNode = path.node as PartialArrayDimension;
      return [
        getDocWithTrivia(partialArrayDimensionNode.openBracketPunctuatorToken),
        getDocWithTrivia(
          partialArrayDimensionNode.innerOpenBracketPunctuatorToken,
        ),
        (path as AstPath<PartialArrayDimension>).call(print, "index"),
        getDocWithTrivia(
          partialArrayDimensionNode.innerCloseBracketPunctuatorToken,
        ),
        getDocWithTrivia(partialArrayDimensionNode.closeBracketPunctuatorToken),
      ];
    }
    case ArrayDimensionKind.IMPLICIT: {
      const node = path.node as ImplicitArrayDimension;
      const elements = [];

      elements.push(getDocWithTrivia(node.openBracketPunctuatorToken));
      elements.push("[");

      if (node.rangeStart !== undefined) {
        elements.push(
          path.call(
            print,
            "rangeStart" as keyof ImplicitArrayDimension["rangeStart"],
          ),
        );
      }

      if (node.rangeEnd !== undefined) {
        elements.push(getDocWithTrivia(node.rangeOperatorToken!));
        elements.push(
          path.call(
            print,
            "rangeEnd" as keyof ImplicitArrayDimension["rangeEnd"],
          ),
        );
      }

      elements.push(getDocWithTrivia(node.closeBracketPunctuatorToken));
      return elements;
    }

    default: {
      const exhaustiveCheck: never = arrayDimensionKind;
      throw new Error(
        "Unreachable code reached, arrayDimensionKind == " + exhaustiveCheck,
      );
    }
  }
}

export function printArrayDefinition(
  path: AstPath<ArrayDefinition>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const arrayDefinition = path.node;

  const elements = [];

  if (arrayDefinition.isReserved) {
    elements.push(getDocWithTrivia(arrayDefinition.reservedKeywordToken!));
  }

  if (arrayDefinition.isLegacy) {
    elements.push(getDocWithTrivia(arrayDefinition.legacyKeywordToken!));
  }

  if (arrayDefinition.alignedModifier !== undefined) {
    elements.push(
      path.call(
        print,
        "alignedModifier" as keyof ArrayDefinition["alignedModifier"],
      ),
    );
  }

  elements.push(path.call(print, "arrayElementType"));

  const identifierClause = [
    path.call(print, "identifier"),
  ];

  if (arrayDefinition.implicitArrayDimension !== undefined) {
    identifierClause.push(
      path.call(
        print,
        "implicitArrayDimension" as keyof ArrayDefinition[
          "implicitArrayDimension"
        ],
      ),
    );
  }

  if (arrayDefinition.dimensions !== undefined) {
    identifierClause.push(
      path.map(
        print,
        "dimensions" as keyof ArrayDefinition["dimensions"],
      ),
    );
  }

  identifierClause.push(
    getDocWithTrivia(arrayDefinition.semicolonPunctuatorToken),
  );

  elements.push(identifierClause);

  return join(" ", elements);
}

export function printArrayElementType(
  path: AstPath<ArrayElementType>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const node = path.node;
  if (node.elementaryType !== undefined) {
    return [
      path.call(
        print,
        "elementaryType" as keyof ArrayElementType["elementaryType"],
      ),
      path.call(
        print,
        "lengthAttribute" as keyof ArrayElementType["lengthAttribute"],
      ),
    ];
  } else {
    return path.call(
      print,
      "classIdentifier" as keyof ArrayElementType["classIdentifier"],
    );
  }
}

export function printComputedArrayDefinition(
  path: AstPath<ComputedArrayDefinition>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const computedArrayDefinition = path.node;
  const elements = [];

  elements.push(getDocWithTrivia(computedArrayDefinition.computedKeywordToken));
  elements.push(path.call(print, "elementaryType"));

  const identifierClause = [path.call(print, "identifier")];

  identifierClause.push(path.map(print, "dimensions"));

  identifierClause.push(
    getDocWithTrivia(computedArrayDefinition.semicolonPunctuatorToken),
  );

  elements.push(identifierClause);

  return join(" ", elements);
}
