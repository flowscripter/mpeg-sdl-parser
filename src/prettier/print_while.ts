import { AstPath, type Doc, doc } from "prettier";
import { getDocWithTrivia } from "./print_utils";
import type AbstractNode from "../ast/node/AbstractNode";
import type WhileStatement from "../ast/node/WhileStatement";
const { join } = doc.builders;

export default function printWhileStatement(
  path: AstPath<WhileStatement>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const whileStatement = path.node;
  const elements = [];

  elements.push(getDocWithTrivia(whileStatement.whileKeyword));
  elements.push([
    getDocWithTrivia(whileStatement.openParenthesisPunctuator),
    path.call(print, "condition"),
    getDocWithTrivia(whileStatement.closeParenthesisPunctuator),
  ]);
  elements.push(path.call(print, "compoundStatement"));

  return join(" ", elements);
}
