import { AstPath, type Doc, doc } from "prettier";
import { getDocWithTrivia } from "./print_utils";
const { join } = doc.builders;

export default function printWhileStatement(
  path: AstPath<WhileStatement>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const whileStatement = path.node;
  const elements = [];

  elements.push(getDocWithTrivia(whileStatement.whileKeywordToken));
  elements.push([
    getDocWithTrivia(whileStatement.openParenthesisPunctuatorToken),
    path.call(print, "expression"),
    getDocWithTrivia(whileStatement.closeParenthesisPunctuatorToken),
  ]);
  elements.push(path.call(print, "compoundStatement"));

  return join(" ", elements);
}
