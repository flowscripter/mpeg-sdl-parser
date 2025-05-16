import { AstPath, type Doc, doc } from "prettier";
import { getDocWithTrivia } from "./print_utils";
const { hardline, indent, join } = doc.builders;

export function printIfClause(
  path: AstPath<IfClause>,
  print: (_path: AstPath<AbstractNode>) => Doc,
): Doc {
  const ifClause = path.node;

  const elements = [];

  if (ifClause.elseKeywordToken !== undefined) {
    elements.push(getDocWithTrivia(ifClause.elseKeywordToken));
  }

  if (ifClause.ifKeywordToken !== undefined) {
    elements.push(getDocWithTrivia(ifClause.ifKeywordToken));

    elements.push(
      [
        getDocWithTrivia(ifClause.openParenthesisPunctuatorToken!),
        path.call(print, "condition" as keyof IfClause["condition"]),
        getDocWithTrivia(ifClause.closeParenthesisPunctuatorToken!),
      ],
    );
  }

  const statement = ifClause.statement;
  if (statement.statementKind !== StatementKind.COMPOUND) {
    elements.push(indent([hardline, path.call(print, "statement")]));
  } else {
    elements.push(path.call(print, "statement"));
  }
  return join(" ", elements);
}

export function printIfStatement(
  path: AstPath<IfStatement>,
  print: (_path: AstPath<AbstractNode>) => Doc,
): Doc {
  return join(hardline, (path as AstPath<IfStatement>).map(print, "clauses"));
}
