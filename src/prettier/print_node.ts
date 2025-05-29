import type { AstPath, Doc, ParserOptions } from "prettier";
import { cleanupTrivia } from "./print_utils";
import {
  printAbstractExpression,
  printArrayElementAccess,
  printClassMemberAccess,
} from "./print_expression";
import { printAggregateOutputValue, printMapEntry } from "./print_map";
import {
  printBitModifier,
  printClassId,
  printExpandableModifier,
  printExtendsModifier,
  printParameter,
  printParameterList,
  printParameterValueList,
} from "./print_class";
import { printSpecification } from "./print_specification";
import { printAbstractArrayDimension } from "./print_array";
import {
  printAlignedModifier,
  printIdentifier,
  printLengthAttribute,
  printNumberLiteral,
} from "./print_common";
import { printElementaryType } from "./print_elementary_type";
import { printStringLiteral } from "./print_string";
import { printStatement } from "./print_statement";
import {
  printSwitchCaseClause,
  printSwitchDefaultClause,
} from "./print_switch";
import type AbstractArrayDimension from "../ast/node/AbstractArrayDimension";
import type AbstractClassId from "../ast/node/AbstractClassId";
import type AbstractExpression from "../ast/node/AbstractExpression";
import type AbstractNode from "../ast/node/AbstractNode";
import type AbstractStatement from "../ast/node/AbstractStatement";
import type AlignedModifier from "../ast/node/AlignedModifier";
import type ArrayElementAccess from "../ast/node/ArrayElementAccess";
import type BitModifier from "../ast/node/BitModifier";
import type ClassMemberAccess from "../ast/node/ClassMemberAccess";
import type ElementaryType from "../ast/node/ElementaryType";
import { NodeKind } from "../ast/node/enum/node_kind";
import type ExpandableModifier from "../ast/node/ExpandableModifier";
import type ExtendsModifier from "../ast/node/ExtendsModifier";
import type LengthAttribute from "../ast/node/LengthAttribute";
import type MapEntry from "../ast/node/MapEntry";
import type NumberLiteral from "../ast/node/NumberLiteral";
import type Parameter from "../ast/node/Parameter";
import type ParameterList from "../ast/node/ParameterList";
import type ParameterValueList from "../ast/node/ParameterValueList";
import type Specification from "../ast/node/Specification";
import type SwitchCaseClause from "../ast/node/SwitchCaseClause";
import type SwitchDefaultClause from "../ast/node/SwitchDefaultClause";
import type Identifier from "../ast/node/Identifier";
import type StringLiteral from "../ast/node/StringLiteral";
import type AggregateOutputValue from "../ast/node/AggregateOutputValue";

export default function printNode(
  path: AstPath<AbstractNode>,
  _options: ParserOptions<AbstractNode>,
  print: (_path: AstPath<AbstractNode>) => Doc,
): Doc {
  const node = path.node;
  const nodeKind = node.nodeKind;

  cleanupTrivia(node);

  switch (nodeKind) {
    case NodeKind.AGGREGATE_OUTPUT_VALUE:
      return printAggregateOutputValue(
        path as AstPath<AggregateOutputValue>,
        print,
      );
    case NodeKind.ALIGNED_MODIFIER:
      return printAlignedModifier(path as AstPath<AlignedModifier>, print);
    case NodeKind.ARRAY_DIMENSION:
      return printAbstractArrayDimension(
        path as AstPath<AbstractArrayDimension>,
        print,
      );
    case NodeKind.ARRAY_ELEMENT_ACCESS:
      return printArrayElementAccess(
        path as AstPath<ArrayElementAccess>,
        print,
      );
    case NodeKind.BIT_MODIFIER:
      return printBitModifier(path as AstPath<BitModifier>, print);
    case NodeKind.CLASS_ID:
      return printClassId(path as AstPath<AbstractClassId>, print);
    case NodeKind.CLASS_MEMBER_ACCESS:
      return printClassMemberAccess(path as AstPath<ClassMemberAccess>, print);
    case NodeKind.ELEMENTARY_TYPE:
      return printElementaryType(path as AstPath<ElementaryType>);
    case NodeKind.EXPRESSION:
      return printAbstractExpression(
        path as AstPath<AbstractExpression>,
        print,
      );
    case NodeKind.EXPANDABLE_MODIFIER:
      return printExpandableModifier(
        path as AstPath<ExpandableModifier>,
        print,
      );
    case NodeKind.EXTENDS_MODIFIER:
      return printExtendsModifier(path as AstPath<ExtendsModifier>, print);
    case NodeKind.IDENTIFIER:
      return printIdentifier(path as AstPath<Identifier>);
    case NodeKind.LENGTH_ATTRIBUTE:
      return printLengthAttribute(path as AstPath<LengthAttribute>, print);
    case NodeKind.MAP_ENTRY:
      return printMapEntry(path as AstPath<MapEntry>, print);
    case NodeKind.NUMBER_LITERAL:
      return printNumberLiteral(path as AstPath<NumberLiteral>);
    case NodeKind.PARAMETER:
      return printParameter(path as AstPath<Parameter>, print);
    case NodeKind.PARAMETER_LIST:
      return printParameterList(path as AstPath<ParameterList>, print);
    case NodeKind.PARAMETER_VALUE_LIST:
      return printParameterValueList(
        path as AstPath<ParameterValueList>,
        print,
      );
    case NodeKind.SPECIFICATION:
      return printSpecification(path as AstPath<Specification>, print);
    case NodeKind.STATEMENT:
      return printStatement(path as AstPath<AbstractStatement>, print);
    case NodeKind.STRING_LITERAL:
      return printStringLiteral(path as AstPath<StringLiteral>);
    case NodeKind.SWITCH_CASE_CLAUSE:
      return printSwitchCaseClause(path as AstPath<SwitchCaseClause>, print);
    case NodeKind.SWITCH_DEFAULT_CLAUSE:
      return printSwitchDefaultClause(
        path as AstPath<SwitchDefaultClause>,
        print,
      );
    default: {
      const exhaustiveCheck: never = nodeKind;
      throw new Error(
        "Unreachable code reached, nodeKind == " + exhaustiveCheck,
      );
    }
  }
}
