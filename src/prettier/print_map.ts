import { AstPath, type Doc, doc } from "prettier";
import { addCommaSeparatorsToDoc, getDocWithTrivia } from "./print_utils";
const { hardline, indent, join } = doc.builders;

export function printAbstractMapOutputValue(
  path: AstPath<AbstractMapOutputValue>,
  print: (path: AstPath<AbstractNode>) => Doc,
): doc.builders.Doc {
  const { mapOutputValueKind } = path.node;
  switch (mapOutputValueKind) {
    case MapOutputValueKind.SINGLE: {
      const singleMapOutputValue = path.node as SingleMapOutputValue;
      if (singleMapOutputValue.numberLiteralValue !== undefined) {
        return path.call(
          print,
          "numberLiteralValue" as keyof SingleMapOutputValue[
            "numberLiteralValue"
          ],
        );
      }
      return [
        path.call(
          print,
          "elementaryType" as keyof SingleMapOutputValue["elementaryType"],
        ),
        path.call(
          print,
          "lengthAttribute" as keyof SingleMapOutputValue["lengthAttribute"],
        ),
      ];
    }
    case MapOutputValueKind.AGGREGATE: {
      const aggregateMapOutputValue = path.node as AggregateMapOutputValue;
      const elements = [];

      elements.push(
        getDocWithTrivia(aggregateMapOutputValue.openBracePunctuatorToken),
      );
      elements.push(
        " ",
      );

      const outputValuesDoc = (path as AstPath<AggregateMapOutputValue>).map(
        print,
        "outputValues",
      );

      elements.push(
        ...addCommaSeparatorsToDoc(
          outputValuesDoc,
          aggregateMapOutputValue.commaPunctuatorTokens,
        ),
      );
      elements.push(
        " ",
      );
      elements.push(
        getDocWithTrivia(aggregateMapOutputValue.closeBracePunctuatorToken),
      );

      return elements;
    }
    default: {
      const exhaustiveCheck: never = mapOutputValueKind;
      throw new Error(
        "Unreachable code reached, mapOutputValueKind == " + exhaustiveCheck,
      );
    }
  }
}

export function printMapDeclaration(
  path: AstPath<MapDeclaration>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const mapDeclaration = path.node;
  const elements = [];

  elements.push(getDocWithTrivia(mapDeclaration.mapKeywordToken));
  elements.push(path.call(print, "identifier"));

  const subElements: Doc[] = [
    getDocWithTrivia(mapDeclaration.openParenthesisPunctuatorToken),
  ];

  if (mapDeclaration.outputElementaryType !== undefined) {
    subElements.push(
      path.call(
        print,
        "outputElementaryType" as keyof MapDeclaration["outputElementaryType"],
      ),
    );
  } else if (mapDeclaration.outputClassIdentifier !== undefined) {
    subElements.push(
      path.call(
        print,
        "outputClassIdentifier" as keyof MapDeclaration[
          "outputClassIdentifier"
        ],
      ),
    );
  }

  subElements.push(
    getDocWithTrivia(mapDeclaration.closeParenthesisPunctuatorToken),
  );

  elements.push(subElements);

  elements.push(
    path.call(
      print,
      "mapEntryList",
    ),
  );

  return join(" ", elements);
}

export function printMapDefinition(
  path: AstPath<MapDefinition>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const mapDefinition = path.node;
  const elements = [];

  if (mapDefinition.isReserved) {
    elements.push(getDocWithTrivia(mapDefinition.reservedKeywordToken!));
  }
  if (mapDefinition.isLegacy) {
    elements.push(getDocWithTrivia(mapDefinition.legacyKeywordToken!));
  }

  const subElements = [];

  if (mapDefinition.elementaryType !== undefined) {
    subElements.push(
      path.call(
        print,
        "elementaryType" as keyof MapDefinition["elementaryType"],
      ),
    );
  } else if (mapDefinition.classIdentifier !== undefined) {
    subElements.push(
      path.call(
        print,
        "classIdentifier" as keyof MapDefinition["classIdentifier"],
      ),
    );
  }

  subElements.push(
    getDocWithTrivia(mapDefinition.openParenthesisPunctuatorToken),
  );
  subElements.push(path.call(print, "mapIdentifier"));
  subElements.push(
    getDocWithTrivia(mapDefinition.closeParenthesisPunctuatorToken),
  );

  elements.push(subElements);
  elements.push([
    path.call(print, "identifier"),
    getDocWithTrivia(mapDefinition.semicolonPunctuatorToken),
  ]);
  return join(" ", elements);
}

export function printMapEntry(
  path: AstPath<MapEntry>,
  print: (path: AstPath<AbstractNode>) => Doc,
): doc.builders.Doc {
  const mapEntry = path.node;
  const elements = [];
  elements.push([
    path.call(print, "inputValue"),
    getDocWithTrivia(mapEntry.commaPunctuatorToken),
  ]);
  elements.push(
    path.call(
      print,
      "outputValue",
    ),
  );
  return join(" ", elements);
}

export function printMapEntryList(
  path: AstPath<MapEntryList>,
  print: (path: AstPath<AbstractNode>) => Doc,
): doc.builders.Doc {
  const mapEntryList = path.node;
  const elements = [];
  const outputValuesDoc = path.map(print, "mapEntries");

  elements.push(
    ...addCommaSeparatorsToDoc(
      outputValuesDoc,
      mapEntryList.commaPunctuatorTokens,
    ),
  );

  return [
    getDocWithTrivia(mapEntryList.openBracePunctuatorToken),
    indent([
      hardline,
      join(hardline, elements),
    ]),
    hardline,
    getDocWithTrivia(mapEntryList.closeBracePunctuatorToken),
  ];
}
