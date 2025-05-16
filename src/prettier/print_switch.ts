import { AstPath, type Doc, doc } from "prettier";
import { getDocWithTrivia } from "./print_utils";
const { hardline, indent, join } = doc.builders;

export function printSwitchCaseClause(
  path: AstPath<SwitchCaseClause>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const switchCaseClause = path.node;
  const subElements = [];

  subElements.push(getDocWithTrivia(switchCaseClause.caseKeywordToken));
  subElements.push([
    path.call(print, "value"),
    getDocWithTrivia(switchCaseClause.colonPunctuatorToken),
  ]);

  if (switchCaseClause.openBracePunctuatorToken !== undefined) {
    subElements.push(
      getDocWithTrivia(switchCaseClause.openBracePunctuatorToken),
    );
  }

  const elements = [
    join(" ", subElements),
  ];

  const statementElements = [];

  if (switchCaseClause.statements.length > 0) {
    statementElements.push(...path.map(print, "statements"));
  }

  if (switchCaseClause.breakKeywordToken !== undefined) {
    statementElements.push([
      getDocWithTrivia(switchCaseClause.breakKeywordToken),
      getDocWithTrivia(switchCaseClause.semicolonPunctuatorToken!),
    ]);
  }

  if (statementElements.length > 0) {
    elements.push(
      [indent(
        [
          hardline,
          join(hardline, statementElements),
        ],
      )],
    );
  }
  if (switchCaseClause.closeBracePunctuatorToken !== undefined) {
    elements.push(
      getDocWithTrivia(switchCaseClause.closeBracePunctuatorToken, true),
    );
  }

  return elements;
}

export function printSwitchDefaultClause(
  path: AstPath<SwitchDefaultClause>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const switchDefaultClause = path.node;
  const subElements = [];

  subElements.push([
    getDocWithTrivia(switchDefaultClause.defaultKeywordToken),
    getDocWithTrivia(switchDefaultClause.colonPunctuatorToken),
  ]);

  if (switchDefaultClause.openBracePunctuatorToken !== undefined) {
    subElements.push(
      getDocWithTrivia(switchDefaultClause.openBracePunctuatorToken),
    );
  }

  const elements = [
    join(" ", subElements),
  ];

  const statementElements = [];

  if (switchDefaultClause.statements.length > 0) {
    statementElements.push(...path.map(print, "statements"));
  }

  if (statementElements.length > 0) {
    elements.push(
      [indent(
        [
          hardline,
          join(hardline, statementElements),
        ],
      )],
    );
  }

  if (switchDefaultClause.closeBracePunctuatorToken !== undefined) {
    elements.push(
      getDocWithTrivia(switchDefaultClause.closeBracePunctuatorToken, true),
    );
  }

  return elements;
}

export function printSwitchStatement(
  path: AstPath<SwitchStatement>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const switchStatement = path.node;

  const subElements = [];
  subElements.push(getDocWithTrivia(switchStatement.switchKeywordToken));
  subElements.push([
    getDocWithTrivia(switchStatement.openParenthesisPunctuatorToken),
    path.call(print, "expression"),
    getDocWithTrivia(switchStatement.closeParenthesisPunctuatorToken),
  ]);
  subElements.push(getDocWithTrivia(switchStatement.openBracePunctuatorToken));

  const elements = [
    join(" ", subElements),
  ];

  const caseClauses = [];

  caseClauses.push(
    ...path.map(print, "switchCaseClauses"),
  );

  if (switchStatement.switchDefaultClause !== undefined) {
    caseClauses.push(path.call(
      print,
      "switchDefaultClause" as keyof SwitchStatement["switchDefaultClause"],
    ));
  }

  elements.push(
    [indent([
      hardline,
      //   caseClauses
      join(hardline, caseClauses),
    ])],
  );

  elements.push(
    getDocWithTrivia(switchStatement.closeBracePunctuatorToken, true),
  );

  return elements;
}
