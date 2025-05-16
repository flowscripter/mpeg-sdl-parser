import { AstPath, type Doc, doc } from "prettier";
import { getDocWithTrivia } from "./print_utils";
const { join } = doc.builders;

export default function printDoStatement(
  path: AstPath<DoStatement>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const doStatement = path.node;
  const elements = [];

  elements.push(getDocWithTrivia(doStatement.doKeywordToken));
  elements.push(path.call(print, "compoundStatement"));
  elements.push(getDocWithTrivia(doStatement.whileKeywordToken));
  elements.push([
    getDocWithTrivia(doStatement.openParenthesisPunctuatorToken),
    path.call(print, "conditionExpression"),
    getDocWithTrivia(doStatement.closeParenthesisPunctuatorToken),
    getDocWithTrivia(doStatement.semicolonPunctuatorToken),
  ]);

  return join(" ", elements);
}
