import { AstPath, type Doc } from "prettier";
import type AbstractNode from "../ast/node/AbstractNode";
import type IfStatement from "../ast/node/IfStatement";

// TODO: rework this
// export function printIfClause(
//   path: AstPath<IfClause>,
//   print: (_path: AstPath<AbstractNode>) => Doc,
// ): Doc {
//   const ifClause = path.node;

//   const elements = [];

//   if (ifClause.elseKeyword !== undefined) {
//     elements.push(getDocWithTrivia(ifClause.elseKeyword));
//   }

//   if (ifClause.ifKeyword !== undefined) {
//     elements.push(getDocWithTrivia(ifClause.ifKeyword));

//     elements.push(
//       [
//         getDocWithTrivia(ifClause.openParenthesisPunctuator!),
//         path.call(print, "condition" as keyof IfClause["condition"]),
//         getDocWithTrivia(ifClause.closeParenthesisPunctuator!),
//       ],
//     );
//   }

//   const statement = ifClause.statement;
//   if (statement.statementKind !== StatementKind.COMPOUND) {
//     elements.push(indent([hardline, path.call(print, "statement")]));
//   } else {
//     elements.push(path.call(print, "statement"));
//   }
//   return join(" ", elements);
// }

export function printIfStatement(
  _path: AstPath<IfStatement>,
  _print: (_path: AstPath<AbstractNode>) => Doc,
): Doc {
  // TODO: rework this
  return []; //join(hardline, (path as AstPath<IfStatement>).map(print, "clauses"));
}
