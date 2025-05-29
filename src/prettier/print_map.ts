import { AstPath, type Doc, doc } from "prettier";
import { addCommaSeparatorsToDoc, getDocWithTrivia } from "./print_utils";
import type AbstractNode from "../ast/node/AbstractNode";
import type MapDeclaration from "../ast/node/MapDeclaration";
import type MapDefinition from "../ast/node/MapDefinition";
import type MapEntry from "../ast/node/MapEntry";
import type AggregateOutputValue from "../ast/node/AggregateOutputValue";
const { hardline, indent, join } = doc.builders;

// TODO: reimplement this
export function printAggregateOutputValue(
  _path: AstPath<AggregateOutputValue>,
  _print: (path: AstPath<AbstractNode>) => Doc,
): doc.builders.Doc {
  return [];
  // const { outputValueKind } = path.node;
  // switch (outputValueKind) {
  //   case OutputValueKind.SINGLE: {
  //     const singleMapOutputValue = path.node as SingleMapOutputValue;
  //     if (singleMapOutputValue.numberLiteralValue !== undefined) {
  //       return path.call(
  //         print,
  //         "numberLiteralValue" as keyof SingleMapOutputValue[
  //           "numberLiteralValue"
  //         ],
  //       );
  //     }
  //     return [
  //       path.call(
  //         print,
  //         "elementaryType" as keyof SingleMapOutputValue["elementaryType"],
  //       ),
  //       path.call(
  //         print,
  //         "lengthAttribute" as keyof SingleMapOutputValue["lengthAttribute"],
  //       ),
  //     ];
  //   }
  //   case OutputValueKind.AGGREGATE: {
  //     const aggregateOutputValue = path.node as AggregateOutputValue;
  //     const elements = [];

  //     elements.push(
  //       getDocWithTrivia(aggregateOutputValue.openBracePunctuator),
  //     );
  //     elements.push(
  //       " ",
  //     );

  //     const outputValuesDoc = (path as AstPath<AggregateOutputValue>).map(
  //       print,
  //       "outputValues",
  //     );

  //     elements.push(
  //       ...addCommaSeparatorsToDoc(
  //         outputValuesDoc,
  //         aggregateOutputValue.commaPunctuators,
  //       ),
  //     );
  //     elements.push(
  //       " ",
  //     );
  //     elements.push(
  //       getDocWithTrivia(aggregateOutputValue.closeBracePunctuator),
  //     );

  //     return elements;
  //   }
  //   default: {
  //     const exhaustiveCheck: never = outputValueKind;
  //     throw new Error(
  //       "Unreachable code reached, outputValueKind == " + exhaustiveCheck,
  //     );
  //   }
  // }
}

export function printMapDeclaration(
  path: AstPath<MapDeclaration>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const mapDeclaration = path.node;
  const elements = [];

  elements.push(getDocWithTrivia(mapDeclaration.mapKeyword));
  elements.push(path.call(print, "identifier"));

  const subElements: Doc[] = [
    getDocWithTrivia(mapDeclaration.openParenthesisPunctuator),
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
    getDocWithTrivia(mapDeclaration.closeParenthesisPunctuator),
  );

  elements.push(subElements);

  const entrySubElements: Doc[] = [];
  const outputValuesDoc = path.map(print, "mapEntries");

  entrySubElements.push(
    ...addCommaSeparatorsToDoc(
      outputValuesDoc,
      mapDeclaration.commaPunctuators,
    ),
  );

  const entries: Doc[] = [
    getDocWithTrivia(mapDeclaration.openBracePunctuator),
    indent([
      hardline,
      join(hardline, entrySubElements),
    ]),
    hardline,
    getDocWithTrivia(mapDeclaration.closeBracePunctuator),
  ];
  elements.push(entries);

  return join(" ", elements);
}

export function printMapDefinition(
  path: AstPath<MapDefinition>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const mapDefinition = path.node;
  const elements = [];

  if (mapDefinition.isReserved) {
    elements.push(getDocWithTrivia(mapDefinition.reservedKeyword!));
  }
  if (mapDefinition.isLegacy) {
    elements.push(getDocWithTrivia(mapDefinition.legacyKeyword!));
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
    getDocWithTrivia(mapDefinition.openParenthesisPunctuator),
  );
  subElements.push(path.call(print, "mapIdentifier"));
  subElements.push(
    getDocWithTrivia(mapDefinition.closeParenthesisPunctuator),
  );

  elements.push(subElements);
  elements.push([
    path.call(print, "identifier"),
    getDocWithTrivia(mapDefinition.semicolonPunctuator),
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
    getDocWithTrivia(mapEntry.commaPunctuator),
  ]);
  elements.push(
    path.call(
      print,
      "outputValue",
    ),
  );
  return join(" ", elements);
}
