import { AstPath, type Doc, doc } from "prettier";
import { getDocWithTrivia } from "./print_utils";
import { printClassDeclaration, printClassDefinition } from "./print_class";
import { printMapDeclaration, printMapDefinition } from "./print_map";
import {
  printArrayDefinition,
  printComputedArrayDefinition,
} from "./print_array";
import { printStringDefinition } from "./print_string";
import {
  printComputedElementaryTypeDefinition,
  printElementaryTypeDefinition,
} from "./print_elementary_type";
import printDoStatement from "./print_do";
import printForStatement from "./print_for";
import printWhileStatement from "./print_while";
import { printIfStatement } from "./print_if";
import { printSwitchStatement } from "./print_switch";
import type AbstractNode from "../ast/node/AbstractNode";
import type AbstractStatement from "../ast/node/AbstractStatement";
import type ArrayDefinition from "../ast/node/ArrayDefinition";
import type ClassDefinition from "../ast/node/ClassDefinition";
import type CompoundStatement from "../ast/node/CompoundStatement";
import type ComputedArrayDefinition from "../ast/node/ComputedArrayDefinition";
import type ComputedElementaryTypeDefinition from "../ast/node/ComputedElementaryTypeDefinition";
import type ElementaryTypeDefinition from "../ast/node/ElementaryTypeDefinition";
import { StatementKind } from "../ast/node/enum/statement_kind";
import type MapDeclaration from "../ast/node/MapDeclaration";
import type MapDefinition from "../ast/node/MapDefinition";
import type StringDefinition from "../ast/node/StringDefinition";
import type ExpressionStatement from "../ast/node/ExpressionStatement";
import type SwitchStatement from "../ast/node/SwitchStatement";
import type IfStatement from "../ast/node/IfStatement";
import type WhileStatement from "../ast/node/WhileStatement";
import type ForStatement from "../ast/node/ForStatement";
import type DoStatement from "../ast/node/DoStatement";
import type ClassDeclaration from "../ast/node/ClassDeclaration";
const { hardline, indent, join } = doc.builders;

function printCompoundStatement(
  path: AstPath<CompoundStatement>,
  print: (path: AstPath<AbstractNode>) => Doc,
): Doc {
  const node = path.node;

  const elements: Doc = [
    getDocWithTrivia(node.openBracePunctuator),
  ];

  if (node.statements.length > 0) {
    elements.push(
      indent([
        hardline,
        join(hardline, path.map(print, "statements")),
      ]),
    );
  }
  elements.push(hardline);

  elements.push(getDocWithTrivia(node.closeBracePunctuator));

  return elements;
}

function printExpressionStatement(
  path: AstPath<ExpressionStatement>,
  print: (_path: AstPath<AbstractNode>) => Doc,
): Doc {
  const node = path.node;
  return [
    path.call(print, "expression"),
    getDocWithTrivia(node.semicolonPunctuator),
  ];
}

export function printStatement(
  path: AstPath<AbstractStatement>,
  print: (_path: AstPath<AbstractNode>) => Doc,
): Doc {
  const abstractStatement = path.node;
  const statementKind = abstractStatement.statementKind;
  switch (statementKind) {
    case StatementKind.ARRAY_DEFINITION:
      return printArrayDefinition(path as AstPath<ArrayDefinition>, print);
    case StatementKind.COMPUTED_ARRAY_DEFINITION:
      return printComputedArrayDefinition(
        path as AstPath<ComputedArrayDefinition>,
        print,
      );
    case StatementKind.COMPUTED_ELEMENTARY_TYPE_DEFINITION:
      return printComputedElementaryTypeDefinition(
        path as AstPath<ComputedElementaryTypeDefinition>,
        print,
      );
    case StatementKind.CLASS_DECLARATION:
      return printClassDeclaration(path as AstPath<ClassDeclaration>, print);
    case StatementKind.CLASS_DEFINITION:
      return printClassDefinition(path as AstPath<ClassDefinition>, print);
    case StatementKind.COMPOUND:
      return printCompoundStatement(path as AstPath<CompoundStatement>, print);
    case StatementKind.DO:
      return printDoStatement(path as AstPath<DoStatement>, print);
    case StatementKind.ELEMENTARY_TYPE_DEFINITION:
      return printElementaryTypeDefinition(
        path as AstPath<ElementaryTypeDefinition>,
        print,
      );
    case StatementKind.EXPRESSION:
      return printExpressionStatement(
        path as AstPath<ExpressionStatement>,
        print,
      );
    case StatementKind.FOR:
      return printForStatement(path as AstPath<ForStatement>, print);
    case StatementKind.IF:
      return printIfStatement(path as AstPath<IfStatement>, print);
    case StatementKind.MAP_DECLARATION:
      return printMapDeclaration(path as AstPath<MapDeclaration>, print);
    case StatementKind.MAP_DEFINITION:
      return printMapDefinition(path as AstPath<MapDefinition>, print);
    case StatementKind.STRING_DEFINITION:
      return printStringDefinition(path as AstPath<StringDefinition>, print);
    case StatementKind.SWITCH:
      return printSwitchStatement(path as AstPath<SwitchStatement>, print);
    case StatementKind.WHILE:
      return printWhileStatement(path as AstPath<WhileStatement>, print);
    default: {
      const exhaustiveCheck: never = statementKind;
      throw new Error(
        "Unreachable code reached, statementKind == " + exhaustiveCheck,
      );
    }
  }
}
