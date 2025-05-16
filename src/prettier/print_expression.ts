import { AstPath, type Doc, doc } from "prettier";
import { getDocWithTrivia } from "./print_utils";
const { join } = doc.builders;

export function printClassMemberAccess(
  path: AstPath<ClassMemberAccess>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const node = path.node;
  return [
    getDocWithTrivia(node.classMemberAccessOperatorToken),
    path.call(print, "memberIdentifier"),
  ];
}

export function printArrayElementAccess(
  path: AstPath<ArrayElementAccess>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const arrayElementAccess = path.node;
  return [
    getDocWithTrivia(arrayElementAccess.openBracketPunctuatorToken),
    path.call(print, "index"),
    getDocWithTrivia(arrayElementAccess.closeBracketPunctuatorToken),
  ];
}

function printPostfixExpression(
  path: AstPath<PostfixExpression>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const postfixExpression = path.node;
  const elements = [];

  elements.push(path.call(print, "operand"));

  if (postfixExpression.arrayElementAccess !== undefined) {
    elements.push(
      path.call(
        print,
        "arrayElementAccess" as keyof PostfixExpression["arrayElementAccess"],
      ),
    );
  }

  if (postfixExpression.classMemberAccess !== undefined) {
    elements.push(
      path.call(
        print,
        "classMemberAccess" as keyof PostfixExpression["classMemberAccess"],
      ),
    );
  }

  if (postfixExpression.postfixOperatorKind !== undefined) {
    elements.push(getDocWithTrivia(postfixExpression.postfixOperatorToken!));
  }

  return elements;
}

function printPrimaryExpression(
  path: AstPath<PrimaryExpression>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const primaryExpression = path.node;
  const elements = [];

  if (primaryExpression.openParenthesisPunctuatorToken !== undefined) {
    elements.push(
      getDocWithTrivia(primaryExpression.openParenthesisPunctuatorToken),
    );
  }

  elements.push(path.call(print, "operand"));

  if (primaryExpression.closeParenthesisPunctuatorToken !== undefined) {
    elements.push(
      getDocWithTrivia(primaryExpression.closeParenthesisPunctuatorToken),
    );
  }

  return elements;
}

function printUnaryExpression(
  path: AstPath<UnaryExpression>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const unaryExpression = path.node;

  return [
    getDocWithTrivia(unaryExpression.unaryOperatorToken),
    path.call(
      print,
      "operand",
    ),
  ];
}

function printBinaryExpression(
  path: AstPath<BinaryExpression>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const node = path.node;
  return join(" ", [
    path.call(print, "leftOperand"),
    getDocWithTrivia(node.binaryOperatorToken),
    path.call(print, "rightOperand"),
  ]);
}

function printLengthOfExpression(
  path: AstPath<LengthOfExpression>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const lengthOfExpression = path.node;
  const elements = [];

  elements.push(getDocWithTrivia(lengthOfExpression.lengthOfKeywordToken));
  elements.push(
    getDocWithTrivia(lengthOfExpression.openParenthesisPunctuatorToken),
  );
  elements.push(path.call(print, "operand"));
  elements.push(
    getDocWithTrivia(lengthOfExpression.closeParenthesisPunctuatorToken),
  );

  return elements;
}

export function printAbstractExpression(
  path: AstPath<AbstractExpression>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const { expressionKind } = path.node;
  switch (expressionKind) {
    case ExpressionKind.BINARY:
      return printBinaryExpression(path as AstPath<BinaryExpression>, print);
    case ExpressionKind.LENGTH_OF:
      return printLengthOfExpression(
        path as AstPath<LengthOfExpression>,
        print,
      );
    case ExpressionKind.POSTFIX:
      return printPostfixExpression(path as AstPath<PostfixExpression>, print);
    case ExpressionKind.PRIMARY:
      return printPrimaryExpression(path as AstPath<PrimaryExpression>, print);
    case ExpressionKind.UNARY:
      return printUnaryExpression(path as AstPath<UnaryExpression>, print);
    default: {
      const exhaustiveCheck: never = expressionKind;
      throw new Error(
        "Unreachable code reached, expressionKind == " + exhaustiveCheck,
      );
    }
  }
}
