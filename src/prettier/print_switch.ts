import { AstPath, type Doc, doc } from "prettier";
import { getDocWithTrivia } from "./print_utils";
import type AbstractNode from "../ast/node/AbstractNode";
import type SwitchCaseClause from "../ast/node/SwitchCaseClause";
import type SwitchDefaultClause from "../ast/node/SwitchDefaultClause";
import type SwitchStatement from "../ast/node/SwitchStatement";
const { hardline, indent, join } = doc.builders;

export function printSwitchCaseClause(
  path: AstPath<SwitchCaseClause>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const switchCaseClause = path.node;
  const subElements = [];

  subElements.push(getDocWithTrivia(switchCaseClause.caseKeyword));
  subElements.push([
    path.call(print, "value"),
    getDocWithTrivia(switchCaseClause.colonPunctuator),
  ]);

  if (switchCaseClause.openBracePunctuator !== undefined) {
    subElements.push(
      getDocWithTrivia(switchCaseClause.openBracePunctuator),
    );
  }

  const elements = [
    join(" ", subElements),
  ];

  const statementElements = [];

  if (switchCaseClause.statements.length > 0) {
    statementElements.push(...path.map(print, "statements"));
  }

  if (switchCaseClause.breakKeyword !== undefined) {
    statementElements.push([
      getDocWithTrivia(switchCaseClause.breakKeyword),
      getDocWithTrivia(switchCaseClause.semicolonPunctuator!),
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
  if (switchCaseClause.closeBracePunctuator !== undefined) {
    elements.push(
      getDocWithTrivia(switchCaseClause.closeBracePunctuator, true),
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
    getDocWithTrivia(switchDefaultClause.defaultKeyword),
    getDocWithTrivia(switchDefaultClause.colonPunctuator),
  ]);

  if (switchDefaultClause.openBracePunctuator !== undefined) {
    subElements.push(
      getDocWithTrivia(switchDefaultClause.openBracePunctuator),
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

  if (switchDefaultClause.closeBracePunctuator !== undefined) {
    elements.push(
      getDocWithTrivia(switchDefaultClause.closeBracePunctuator, true),
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
  subElements.push(getDocWithTrivia(switchStatement.switchKeyword));
  subElements.push([
    getDocWithTrivia(switchStatement.openParenthesisPunctuator),
    path.call(print, "expression"),
    getDocWithTrivia(switchStatement.closeParenthesisPunctuator),
  ]);
  subElements.push(getDocWithTrivia(switchStatement.openBracePunctuator));

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
    getDocWithTrivia(switchStatement.closeBracePunctuator, true),
  );

  return elements;
}
