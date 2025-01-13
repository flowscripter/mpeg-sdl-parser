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
import NodeVisitor from "./NodeVisitor.ts";

// TODO: complete this
class PrettyPrinter implements NodeVisitor {
  private specificationString: string = "";

  public getSpecificationString(node: Specification): string {
    this.visitSpecification(node);

    return this.specificationString;
  }

  public visitAggregateMapOutputValue(node: AggregateMapOutputValue): void {
    // this.specificationString += node.openBraceToken.toString();
    // this.specificationString += node.closeBraceToken.toString();
  }

  public visitAlignedModifier(node: AlignedModifier): void {
  }

  public visitArrayDefinition(node: ArrayDefinition): void {
  }

  public visitArrayElementAccess(node: ArrayElementAccess): void {
  }

  public visitArrayElementType(node: ArrayElementType): void {
  }

  public visitAssignmentExpression(node: AssignmentExpression): void {
  }

  public visitBinaryExpression(node: BinaryExpression): void {
  }

  public visitBitModifier(node: BitModifier): void {
  }

  public visitClassDeclaration(node: ClassDeclaration): void {
  }

  public visitClassDefinition(node: ClassDefinition): void {
  }

  public visitClassDefinitionParameter(node: ParameterList): void {
  }

  public visitClassId(node: ClassId): void {
  }

  public visitClassIdRange(node: ClassIdRange): void {
  }

  public visitClassMemberAccess(node: ClassMemberAccess): void {
  }

  public visitCompoundStatement(node: CompoundStatement): void {
  }

  public visitComputedArrayDefinition(node: ComputedArrayDefinition): void {
  }

  public visitComputedElementaryTypeDefinition(
    node: ComputedElementaryTypeDefinition,
  ): void {
  }

  public visitDoStatement(node: DoStatement): void {
  }

  public visitElementaryType(node: ElementaryType): void {
  }

  public visitElementaryTypeDefinition(
    node: ElementaryTypeDefinition,
  ): void {
  }

  public visitExpandableModifier(node: ExpandableModifier): void {
  }

  public visitExplicitArrayDimension(node: ExplicitArrayDimension): void {
  }

  public visitExpressionStatement(node: ExpressionStatement): void {
  }

  public visitExtendedClassIdRange(node: ExtendedClassIdRange): void {
  }

  public visitExtendsModifier(node: ExtendsModifier): void {
  }

  public visitForStatement(node: ForStatement): void {
  }

  public visitIdentifier(node: Identifier): void {
  }

  public visitIfStatement(node: IfStatement): void {
  }

  public visitImplicitArrayDimension(node: ImplicitArrayDimension): void {
  }

  public visitLengthAttribute(node: LengthAttribute): void {
  }

  public visitLengthOfExpression(node: LengthOfExpression): void {
  }

  public visitMapDeclaration(node: MapDeclaration): void {
  }

  public visitMapDefinition(node: MapDefinition): void {
  }

  public visitMapEntry(node: MapEntry): void {
  }

  public visitMapEntryList(node: MapEntryList): void {
  }

  public visitMapOutputValue(node: MapOutputValue): void {
  }

  public visitNumberLiteral(node: NumberLiteral): void {
  }

  public visitParameter(node: Parameter): void {
  }

  public visitParameterList(node: ParameterList): void {
  }

  public visitParameterValueList(node: ParameterValueList): void {
  }

  public visitPartialArrayDimension(node: PartialArrayDimension): void {
  }

  public visitPostfixExpression(node: PostfixExpression): void {
  }

  public visitPrimaryExpression(node: PrimaryExpression): void {
  }

  public visitSpecification(node: Specification): void {
    node.globals.forEach((global) => {
      global.accept(this);
    });
  }

  public visitStringDefinition(node: StringDefinition): void {
  }

  public visitStringLiteral(node: StringLiteral): void {
  }

  public visitSwitchStatement(node: SwitchStatement): void {
  }

  public visitUnaryExpression(node: UnaryExpression): void {
  }

  public visitWhileStatement(node: WhileStatement): void {
  }
}

export default PrettyPrinter;
