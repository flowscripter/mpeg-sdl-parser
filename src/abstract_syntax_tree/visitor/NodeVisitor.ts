import AggregateMapOutputValue from "../node/AggregateMapOutputValue.ts";
import AlignedModifier from "../node/AlignedModifier.ts";
import ArrayDefinition from "../node/ArrayDefinition.ts";
import ArrayElementAccess from "../node/ArrayElementAccess.ts";
import ArrayElementType from "../node/ArrayElementType.ts";
import AssignmentExpression from "../node/AssignmentExpression.ts";
import BinaryExpression from "../node/BinaryExpression.ts";
import BitModifier from "../node/BitModifier.ts";
import ClassDeclaration from "../node/ClassDeclaration.ts";
import ClassDefinition from "../node/ClassDefinition.ts";
import ClassId from "../node/ClassId.ts";
import ClassIdRange from "../node/ClassIdRange.ts";
import ClassMemberAccess from "../node/ClassMemberAccess.ts";
import CompoundStatement from "../node/CompoundStatement.ts";
import ComputedArrayDefinition from "../node/ComputedArrayDefinition.ts";
import ComputedElementaryTypeDefinition from "../node/ComputedElementaryTypeDefinition.ts";
import DoStatement from "../node/DoStatement.ts";
import ElementaryType from "../node/ElementaryType.ts";
import ElementaryTypeDefinition from "../node/ElementaryTypeDefinition.ts";
import ExpandableModifier from "../node/ExpandableModifier.ts";
import ExplicitArrayDimension from "../node/ExplicitArrayDimension.ts";
import ExpressionStatement from "../node/ExpressionStatement.ts";
import ExtendedClassIdRange from "../node/ExtendedClassIdRange.ts";
import ExtendsModifier from "../node/ExtendsModifier.ts";
import ForStatement from "../node/ForStatement.ts";
import Identifier from "../node/Identifier.ts";
import IfStatement from "../node/IfStatement.ts";
import ImplicitArrayDimension from "../node/ImplicitArrayDimension.ts";
import LengthAttribute from "../node/LengthAttribute.ts";
import LengthOfExpression from "../node/LengthOfExpression.ts";
import MapDeclaration from "../node/MapDeclaration.ts";
import MapDefinition from "../node/MapDefinition.ts";
import MapEntry from "../node/MapEntry.ts";
import MapEntryList from "../node/MapEntryList.ts";
import MapOutputValue from "../node/MapOutputValue.ts";
import NumberLiteral from "../node/NumberLiteral.ts";
import Parameter from "../node/Parameter.ts";
import ParameterList from "../node/ParameterList.ts";
import ParameterValueList from "../node/ParameterValueList.ts";
import PartialArrayDimension from "../node/PartialArrayDimension.ts";
import PostfixExpression from "../node/PostfixExpression.ts";
import PrimaryExpression from "../node/PrimaryExpression.ts";
import Specification from "../node/Specification.ts";
import StringDefinition from "../node/StringDefinition.ts";
import StringLiteral from "../node/StringLiteral.ts";
import SwitchStatement from "../node/SwitchStatement.ts";
import UnaryExpression from "../node/UnaryExpression.ts";
import WhileStatement from "../node/WhileStatement.ts";

interface NodeVisitor {
  visitAggregateMapOutputValue(
    node: AggregateMapOutputValue,
  ): void;
  visitAlignedModifier(node: AlignedModifier): void;
  visitArrayDefinition(node: ArrayDefinition): void;
  visitArrayElementAccess(node: ArrayElementAccess): void;
  visitArrayElementType(node: ArrayElementType): void;
  visitAssignmentExpression(
    node: AssignmentExpression,
  ): void;
  visitBinaryExpression(node: BinaryExpression): void;
  visitBitModifier(node: BitModifier): void;
  visitClassDeclaration(node: ClassDeclaration): void;
  visitClassDefinition(node: ClassDefinition): void;
  visitClassDefinitionParameter(node: ParameterList): void;
  visitClassId(node: ClassId): void;
  visitClassIdRange(node: ClassIdRange): void;
  visitClassMemberAccess(node: ClassMemberAccess): void;
  visitCompoundStatement(node: CompoundStatement): void;
  visitComputedArrayDefinition(
    node: ComputedArrayDefinition,
  ): void;
  visitComputedElementaryTypeDefinition(
    node: ComputedElementaryTypeDefinition,
  ): void;
  visitDoStatement(node: DoStatement): void;
  visitElementaryType(node: ElementaryType): void;
  visitElementaryTypeDefinition(
    node: ElementaryTypeDefinition,
  ): void;
  visitExpandableModifier(node: ExpandableModifier): void;
  visitExplicitArrayDimension(
    node: ExplicitArrayDimension,
  ): void;
  visitExpressionStatement(node: ExpressionStatement): void;
  visitExtendedClassIdRange(
    node: ExtendedClassIdRange,
  ): void;
  visitExtendsModifier(node: ExtendsModifier): void;
  visitForStatement(node: ForStatement): void;
  visitIdentifier(node: Identifier): void;
  visitIfStatement(node: IfStatement): void;
  visitImplicitArrayDimension(
    node: ImplicitArrayDimension,
  ): void;
  visitLengthAttribute(node: LengthAttribute): void;
  visitLengthOfExpression(node: LengthOfExpression): void;
  visitMapDeclaration(node: MapDeclaration): void;
  visitMapDefinition(node: MapDefinition): void;
  visitMapEntry(node: MapEntry): void;
  visitMapEntryList(node: MapEntryList): void;
  visitMapOutputValue(node: MapOutputValue): void;
  visitNumberLiteral(node: NumberLiteral): void;
  visitParameter(node: Parameter): void;
  visitParameterList(node: ParameterList): void;
  visitParameterValueList(node: ParameterValueList): void;
  visitPartialArrayDimension(
    node: PartialArrayDimension,
  ): void;
  visitPostfixExpression(node: PostfixExpression): void;
  visitPrimaryExpression(node: PrimaryExpression): void;
  visitSpecification(node: Specification): void;
  visitStringDefinition(node: StringDefinition): void;
  visitStringLiteral(node: StringLiteral): void;
  visitSwitchStatement(node: SwitchStatement): void;
  visitUnaryExpression(node: UnaryExpression): void;
  visitWhileStatement(node: WhileStatement): void;
}

export default NodeVisitor;
