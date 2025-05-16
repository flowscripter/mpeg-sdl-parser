import { AstPath, type Doc, doc } from "prettier";
import { getDocWithTrivia } from "./print_utils";
const { join } = doc.builders;

export function printAlignedModifier(
  path: AstPath<AlignedModifier>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const alignedModifier = path.node;

  const elements = [];

  elements.push(getDocWithTrivia(alignedModifier.alignedKeywordToken));

  if (!alignedModifier.isDefault8BitCount) {
    elements.push(
      getDocWithTrivia(alignedModifier.openParenthesisPunctuatorToken!),
    );
    elements.push(
      path.call(
        print,
        "bitCountModifier" as keyof AlignedModifier["bitCountModifier"],
      ),
    ),
      elements.push(
        getDocWithTrivia(alignedModifier.closeParenthesisPunctuatorToken!),
      );
  }
  return elements;
}

export function printIdentifier(path: AstPath<Identifier>): Doc {
  const identifier = path.node;

  return getDocWithTrivia(identifier.token);
}

export function printLengthAttribute(
  path: AstPath<LengthAttribute>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const node = path.node;
  return [
    getDocWithTrivia(node.openParenthesisPunctuatorToken),
    path.call(print, "length"),
    getDocWithTrivia(node.closeParenthesisPunctuatorToken),
  ];
}

export function printNumberLiteral(path: AstPath<NumberLiteral>): Doc {
  const numberLiteral = path.node;
  const numberLiteralKind = numberLiteral.numberLiteralKind;

  switch (numberLiteralKind) {
    case NumberLiteralKind.BINARY:
    case NumberLiteralKind.HEXADECIMAL:
    case NumberLiteralKind.INTEGER:
    case NumberLiteralKind.DECIMAL:
    case NumberLiteralKind.FLOATING_POINT:
      return getDocWithTrivia(numberLiteral.tokens[0]);
    case NumberLiteralKind.MULTIPLE_CHARACTER:
      return [
        join(
          " ",
          numberLiteral.tokens.map((token) => getDocWithTrivia(token)),
        ),
      ];
    default: {
      const exhaustiveCheck: never = numberLiteralKind;
      throw new Error(
        "Unreachable code reached, numberLiteralKind == " + exhaustiveCheck,
      );
    }
  }
}
