import type { AstPath, Doc, ParserOptions } from "prettier";
import { cleanupTrivia } from "./print_utils";
import {
  printAbstractExpression,
  printArrayElementAccess,
  printClassMemberAccess,
} from "./print_expression";
import {
  printAbstractMapOutputValue,
  printMapEntry,
  printMapEntryList,
} from "./print_map";
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
import {
  printAbstractArrayDimension,
  printArrayElementType,
} from "./print_array";
import {
  printAlignedModifier,
  printIdentifier,
  printLengthAttribute,
  printNumberLiteral,
} from "./print_common";
import { printElementaryType } from "./print_elementary_type";
import { printStringLiteral } from "./print_string";
import { printIfClause } from "./print_if";
import { printStatement } from "./print_statement";
import {
  printSwitchCaseClause,
  printSwitchDefaultClause,
} from "./print_switch";

export default function printNode(
  path: AstPath<AbstractNode>,
  _options: ParserOptions<AbstractNode>,
  print: (_path: AstPath<AbstractNode>) => Doc,
): Doc {
  const node = path.node;
  const nodeKind = node.nodeKind;

  cleanupTrivia(node);

  switch (nodeKind) {
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
    case NodeKind.ARRAY_ELEMENT_TYPE:
      return printArrayElementType(path as AstPath<ArrayElementType>, print);
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
    case NodeKind.IF_CLAUSE:
      return printIfClause(path as AstPath<IfClause>, print);
    case NodeKind.LENGTH_ATTRIBUTE:
      return printLengthAttribute(path as AstPath<LengthAttribute>, print);
    case NodeKind.MAP_ENTRY:
      return printMapEntry(path as AstPath<MapEntry>, print);
    case NodeKind.MAP_ENTRY_LIST:
      return printMapEntryList(path as AstPath<MapEntryList>, print);
    case NodeKind.MAP_OUTPUT_VALUE:
      return printAbstractMapOutputValue(
        path as AstPath<AbstractMapOutputValue>,
        print,
      );
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
