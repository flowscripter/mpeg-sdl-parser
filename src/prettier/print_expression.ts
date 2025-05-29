import { AstPath, type Doc, doc } from "prettier";
import { getDocWithTrivia } from "./print_utils";
import type AbstractExpression from "../ast/node/AbstractExpression";
import type AbstractNode from "../ast/node/AbstractNode";
import type ArrayElementAccess from "../ast/node/ArrayElementAccess";
import type ClassMemberAccess from "../ast/node/ClassMemberAccess";
import { ExpressionKind } from "../ast/node/enum/expression_kind";
import type LengthOfExpression from "../ast/node/LengthofExpression";
import type PostfixExpression from "../ast/node/PostfixExpression";
import type BinaryExpression from "../ast/node/BinaryExpression";
import type UnaryExpression from "../ast/node/UnaryExpression";
import type PrimaryExpression from "../ast/node/PrimaryExpression";
const { join } = doc.builders;

export function printClassMemberAccess(
  path: AstPath<ClassMemberAccess>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const node = path.node;
  return [
    getDocWithTrivia(node.classMemberAccessOperator),
    path.call(print, "memberIdentifier"),
  ];
}

export function printArrayElementAccess(
  path: AstPath<ArrayElementAccess>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const arrayElementAccess = path.node;
  return [
    getDocWithTrivia(arrayElementAccess.openBracketPunctuator),
    path.call(print, "index"),
    getDocWithTrivia(arrayElementAccess.closeBracketPunctuator),
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
    elements.push(getDocWithTrivia(postfixExpression.postfixOperator!));
  }

  return elements;
}

function printPrimaryExpression(
  path: AstPath<PrimaryExpression>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const primaryExpression = path.node;
  const elements = [];

  if (primaryExpression.openParenthesisPunctuator !== undefined) {
    elements.push(
      getDocWithTrivia(primaryExpression.openParenthesisPunctuator),
    );
  }

  elements.push(path.call(print, "operand"));

  if (primaryExpression.closeParenthesisPunctuator !== undefined) {
    elements.push(
      getDocWithTrivia(primaryExpression.closeParenthesisPunctuator),
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
    getDocWithTrivia(unaryExpression.unaryOperator),
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
    getDocWithTrivia(node.binaryOperator),
    path.call(print, "rightOperand"),
  ]);
}

function printLengthOfExpression(
  path: AstPath<LengthOfExpression>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const lengthOfExpression = path.node;
  const elements = [];

  elements.push(getDocWithTrivia(lengthOfExpression.lengthOfKeyword));
  elements.push(
    getDocWithTrivia(lengthOfExpression.openParenthesisPunctuator),
  );
  elements.push(path.call(print, "operand"));
  elements.push(
    getDocWithTrivia(lengthOfExpression.closeParenthesisPunctuator),
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
