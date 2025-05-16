import { AstPath, type Doc, doc } from "prettier";
import { addCommaSeparatorsToDoc, getDocWithTrivia } from "./print_utils";
const { hardline, indent, join } = doc.builders;

export function printBitModifier(
  path: AstPath<BitModifier>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const bitModifier = path.node;
  const elements = [];

  elements.push(getDocWithTrivia(bitModifier.colonPunctuatorToken));

  const subElements = [];

  subElements.push(getDocWithTrivia(bitModifier.bitKeywordToken));
  subElements.push(
    getDocWithTrivia(bitModifier.openParenthesisPunctuatorToken),
  );
  subElements.push(path.call(print, "length"));
  subElements.push(
    getDocWithTrivia(bitModifier.closeParenthesisPunctuatorToken),
  );

  elements.push(subElements);

  if (bitModifier.identifier !== undefined) {
    elements.push(
      path.call(
        print,
        "identifier" as keyof BitModifier["identifier"],
      ),
    );
  }

  if (bitModifier.assignmentOperatorToken !== undefined) {
    elements.push(getDocWithTrivia(bitModifier.assignmentOperatorToken!));
  }

  elements.push(
    path.call(
      print,
      "classId",
    ),
  );

  return join(" ", elements);
}

export function printClassDeclaration(
  path: AstPath<ClassDeclaration>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const classDeclaration = path.node;

  const elements = [];

  if (classDeclaration.alignedModifier !== undefined) {
    elements.push(
      path.call(
        print,
        "alignedModifier" as keyof ClassDeclaration["alignedModifier"],
      ),
    );
  }

  if (classDeclaration.expandableModifier !== undefined) {
    elements.push(
      path.call(
        print,
        "expandableModifier" as keyof ClassDeclaration["expandableModifier"],
      ),
    );
  }

  if (classDeclaration.isAbstract) {
    elements.push(getDocWithTrivia(classDeclaration.abstractKeywordToken!));
  }

  elements.push(getDocWithTrivia(classDeclaration.classKeywordToken));

  const identifierElements = [
    path.call(print, "identifier"),
  ];

  if (classDeclaration.parameterList !== undefined) {
    identifierElements.push(
      path.call(
        print,
        "parameterList" as keyof ClassDeclaration["parameterList"],
      ),
    );
  }

  elements.push(identifierElements);

  if (classDeclaration.extendsModifier !== undefined) {
    elements.push(
      path.call(
        print,
        "extendsModifier" as keyof ClassDeclaration["extendsModifier"],
      ),
    );
  }

  if (classDeclaration.bitModifier !== undefined) {
    elements.push(
      path.call(print, "bitModifier" as keyof ClassDeclaration["bitModifier"]),
    );
  }

  elements.push(getDocWithTrivia(classDeclaration.openBracePunctuatorToken));

  const parts = [];

  parts.push(join(" ", elements));

  if (classDeclaration.statements.length > 0) {
    parts.push(indent([
      hardline,
      join(hardline, path.map(print, "statements")),
    ]));
  }
  parts.push(
    getDocWithTrivia(classDeclaration.closeBracePunctuatorToken, true),
  );

  return parts;
}

export function printClassDefinition(
  path: AstPath<ClassDefinition>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const classDefinition = path.node;

  const elements = [];

  if (classDefinition.isLegacy) {
    elements.push(getDocWithTrivia(classDefinition.legacyKeywordToken!));
  }

  elements.push(path.call(print, "classIdentifier"));

  const identifierElements = [
    path.call(print, "identifier"),
  ];

  if (classDefinition.parameterValueList !== undefined) {
    identifierElements.push([
      path.call(
        print,
        "parameterValueList" as keyof ClassDefinition["parameterValueList"],
      ),
    ]);
  }

  elements.push(identifierElements);

  return [
    join(" ", elements),
    getDocWithTrivia(classDefinition.semicolonPunctuatorToken),
  ];
}

export function printClassId(
  path: AstPath<AbstractClassId>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const { classIdKind } = path.node;
  switch (classIdKind) {
    case ClassIdKind.SINGLE:
      return (path as AstPath<SingleClassId>).call(print, "value");
    case ClassIdKind.RANGE: {
      const classIdRange = path.node as ClassIdRange;
      return [
        (path as AstPath<ClassIdRange>).call(print, "startClassId"),
        getDocWithTrivia(classIdRange.rangeOperatorToken),
        (path as AstPath<ClassIdRange>).call(print, "endClassId"),
      ];
    }
    case ClassIdKind.EXTENDED_RANGE: {
      const extendedClassIdRange = path.node as ExtendedClassIdRange;
      const elements = [];
      const outputValuesDoc = (path as AstPath<ExtendedClassIdRange>).map(
        print,
        "classIds",
      );

      elements.push(
        ...addCommaSeparatorsToDoc(
          outputValuesDoc,
          extendedClassIdRange.commaPunctuatorTokens,
        ),
      );

      return elements;
    }
    default: {
      const exhaustiveCheck: never = classIdKind;
      throw new Error(
        "Unreachable code reached, classIdKind == " + exhaustiveCheck,
      );
    }
  }
}

export function printExpandableModifier(
  path: AstPath<ExpandableModifier>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const expandableModifier = path.node;

  const elements = [];

  elements.push(getDocWithTrivia(expandableModifier.expandableKeywordToken));

  if (expandableModifier.maxClassSize !== undefined) {
    elements.push(
      getDocWithTrivia(expandableModifier.openParenthesisPunctuatorToken!),
    );
    elements.push(
      path.call(
        print,
        "maxClassSize" as keyof ExpandableModifier["maxClassSize"],
      ),
    ),
      elements.push(
        getDocWithTrivia(expandableModifier.closeParenthesisPunctuatorToken!),
      );
  }

  return elements;
}

export function printExtendsModifier(
  path: AstPath<ExtendsModifier>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const mapEntryList = path.node;
  const elements = [
    path.call(print, "identifier"),
  ];

  if (mapEntryList.parameterValueList !== undefined) {
    elements.push(
      path.call(
        print,
        "parameterValueList" as keyof ExtendsModifier["parameterValueList"],
      ),
    );
  }

  return join(" ", [
    getDocWithTrivia(mapEntryList.extendsKeywordToken),
    elements,
  ]);
}

export function printParameter(
  path: AstPath<Parameter>,
  print: (path: AstPath<AbstractNode>) => Doc,
): doc.builders.Doc {
  const parameter = path.node;
  const elements = [];

  if (parameter.classIdentifier !== undefined) {
    elements.push(
      path.call(
        print,
        "classIdentifier" as keyof Parameter["classIdentifier"],
      ),
    );
  } else if (parameter.elementaryType !== undefined) {
    elements.push(
      path.call(
        print,
        "elementaryType" as keyof Parameter["elementaryType"],
      ),
    );
  }

  elements.push(path.call(print, "identifier"));

  return join(" ", elements);
}

export function printParameterList(
  path: AstPath<ParameterList>,
  print: (path: AstPath<AbstractNode>) => Doc,
): doc.builders.Doc {
  const parameterList = path.node;

  const outputValuesDoc = path.map(print, "parameters");

  const elements = addCommaSeparatorsToDoc(
    outputValuesDoc,
    parameterList.commaPunctuatorTokens,
  );

  return [
    getDocWithTrivia(parameterList.openParenthesisPunctuatorToken),
    join(" ", elements),
    getDocWithTrivia(parameterList.closeParenthesisPunctuatorToken),
  ];
}

export function printParameterValueList(
  path: AstPath<ParameterValueList>,
  print: (path: AstPath<AbstractNode>) => Doc,
): doc.builders.Doc {
  const parameterValueList = path.node;

  const outputValuesDoc = path.map(print, "values");

  const elements = addCommaSeparatorsToDoc(
    outputValuesDoc,
    parameterValueList.commaPunctuatorTokens,
  );

  return [
    getDocWithTrivia(parameterValueList.openParenthesisPunctuatorToken),
    join(" ", elements),
    getDocWithTrivia(parameterValueList.closeParenthesisPunctuatorToken),
  ];
}
