import { Text } from "@codemirror/state";
import type { SyntaxNode } from "@lezer/common";
import AbstractNode from "../node/AbstractNode";
import { createSyntacticParseError } from "../../ParseError";
import { getSpecification } from "./getSpecification";
import { getComputedElementaryTypeDefinition } from "./getComputedElementaryTypeDefinition";
import { getElementaryType } from "./getElementaryType";
import { getLengthAttribute } from "./getLengthAttribute";
import { getIdentifier } from "./getIdentifier";
import { getClassDeclaration } from "./getClassDeclaration";
import { getElementaryTypeDefinition } from "./getElementaryTypeDefinition";
import { getUnaryExpression } from "./getUnaryExpression";
import { getBinaryLiteral } from "./getBinaryLiteral";
import { getDecimalLiteral } from "./getDecimalLiteral";
import { getFloatingPointLiteral } from "./getFloatingPointLiteral";
import { getMultipleCharacterLiteral } from "./getMultipleCharacterLiteral";
import { getHexadecimalLiteral } from "./getHexadecimalLiteral";
import { getIntegerLiteral } from "./getIntegerLiteral";
import { getIfStatement } from "./getIfStatement";
import { getBinaryExpression } from "./getBinaryExpression";
import { getCompoundStatement } from "./getCompoundStatement";
import { getClassDefinition } from "./getClassDefinition";
import { getExpressionStatement } from "./getExpressionStatement";
import { getAssignmentExpression } from "./getAssignmentExpression";
import { getClassMemberAccess } from "./getClassMemberAccess";
import { getArrayElementAccess } from "./getArrayElementAccess";
import { getArrayDefinition } from "./getArrayDefinition.ts";
import { getExplicitArrayDimension } from "./getExplicitArrayDimension.ts";
import { getImplicitArrayDimension } from "./getImplicitArrayDimension.ts";
import { getPartialArrayDimension } from "./getPartialArrayDimension.ts";
import { getAlignedModifier } from "./getAlignedModifier.ts";
import { getAlignmentBitCount } from "./getAlignmentBitCount.ts";
import { getStringDefinition } from "./getStringDefinition.ts";
import { getUtfStringLiteral } from "./getUtfStringLiteral.ts";
import { getBase64StringLiteral } from "./getBase64StringLiteral.ts";
import { getLengthofExpression } from "./getLengthofExpression.ts";
import { getMapDeclaration } from "./getMapDeclaration.ts";
import { getMapEntry } from "./getMapEntry.ts";
import { getAggregateOutputValue } from "./getAggegateOutputValue.ts";

export default class NodeFactory {
  static createNode(syntaxNode: SyntaxNode, text: Text): AbstractNode {
    if (syntaxNode.type.isError) {
      throw createSyntacticParseError(text, syntaxNode.from);
    }

    switch (syntaxNode.type.name) {
      case "AggregateOutputValue":
        return getAggregateOutputValue(syntaxNode, text);
      case "AlignedModifier":
        return getAlignedModifier(syntaxNode, text);
      case "AlignmentBitCount":
        return getAlignmentBitCount(syntaxNode, text);
      case "ArrayDefinition":
        return getArrayDefinition(syntaxNode, text);
      case "ArrayElementAccess":
        return getArrayElementAccess(syntaxNode, text);
      case "AssignmentExpression":
        return getAssignmentExpression(syntaxNode, text);
      case "Base64StringLiteral":
        return getBase64StringLiteral(syntaxNode, text);
      case "BinaryExpression":
        return getBinaryExpression(syntaxNode, text);
      case "BinaryLiteral":
        return getBinaryLiteral(syntaxNode, text);
      case "ClassDeclaration":
        return getClassDeclaration(syntaxNode, text);
      case "ClassDefinition":
        return getClassDefinition(syntaxNode, text);
      case "ClassMemberAccess":
        return getClassMemberAccess(syntaxNode, text);
      case "CompoundStatement":
        return getCompoundStatement(syntaxNode, text);
      case "ComputedElementaryTypeDefinition":
        return getComputedElementaryTypeDefinition(syntaxNode, text);
      case "DecimalLiteral":
        return getDecimalLiteral(syntaxNode, text);
      case "ElementaryType":
        return getElementaryType(syntaxNode, text);
      case "ElementaryTypeDefinition":
        return getElementaryTypeDefinition(syntaxNode, text);
      case "ExplicitArrayDimension":
        return getExplicitArrayDimension(syntaxNode, text);
      case "ExpressionStatement":
        return getExpressionStatement(syntaxNode, text);
      case "FloatingPointLiteral":
        return getFloatingPointLiteral(syntaxNode, text);
      case "HexadecimalLiteral":
        return getHexadecimalLiteral(syntaxNode, text);
      case "Identifier":
        return getIdentifier(syntaxNode, text);
      case "IfStatement":
        return getIfStatement(syntaxNode, text);
      case "ImplicitArrayDimension":
        return getImplicitArrayDimension(syntaxNode, text);
      case "IntegerLiteral":
        return getIntegerLiteral(syntaxNode, text);
      case "LengthAttribute":
        return getLengthAttribute(syntaxNode, text);
      case "LengthofExpression":
        return getLengthofExpression(syntaxNode, text);
      case "MapDeclaration":
        return getMapDeclaration(syntaxNode, text);
      case "MapEntry":
        return getMapEntry(syntaxNode, text);
      case "MultipleCharacterLiteral":
        return getMultipleCharacterLiteral(syntaxNode, text);
      case "PartialArrayDimension":
        return getPartialArrayDimension(syntaxNode, text);
      case "Specification":
        return getSpecification(syntaxNode, text);
      case "StringDefinition":
        return getStringDefinition(syntaxNode, text);
      case "UtfStringLiteral":
        return getUtfStringLiteral(syntaxNode, text);
      case "UnaryExpression":
        return getUnaryExpression(syntaxNode, text);
      default:
        throw new Error(
          `Unsupported node type: ${syntaxNode.type.name}`,
        );
    }
  }
}
