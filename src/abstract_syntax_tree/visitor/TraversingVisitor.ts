import { InternalParserError } from "../../util/ParserError.ts";
import MapAggregateOutputValue from "../node/AggregateMapOutputValue.ts";
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
import ComputedElementaryDefinition from "../node/ComputedElementaryTypeDefinition.ts";
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
import NodeCallback from "./NodeCallback.ts";
import NodeVisitor from "./NodeVisitor.ts";

// TODO: complete this
class TraversingVisitor<T> implements NodeVisitor {
  private contextStack: (T | undefined)[] = [];

  private pushContext(): void {
    this.contextStack.push(undefined);
  }

  private popContext(): T {
    if (this.contextStack.length === 0) {
      throw new InternalParserError("Context stack is empty");
    }

    return this.contextStack.pop()!;
  }

  private peekContext(): T {
    if (this.contextStack.length === 0) {
      throw new InternalParserError("Context stack is empty");
    }

    return this.contextStack[this.contextStack.length - 1]!;
  }

  constructor(private nodeCallback: NodeCallback<T>) {}

  visitAggregateMapOutputValue(node: MapAggregateOutputValue): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.outputValues.forEach((child) => {
      child.accept(this);
    });

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitAlignedModifier(node: AlignedModifier): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.bitCountModifier?.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitArrayDefinition(node: ArrayDefinition): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.alignedModifier?.accept(this);
    node.arrayElementType?.accept(this);
    node.identifier?.accept(this);
    node.implicitArrayDimension?.accept(this);
    node.dimensions?.forEach((child) => child.accept(this));

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitArrayElementAccess(node: ArrayElementAccess): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.indexExpression.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitArrayElementType(node: ArrayElementType): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.elementaryType?.accept(this);
    node.lengthAttribute?.accept(this);
    node.classIdentifier?.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitAssignmentExpression(node: AssignmentExpression): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.valueTarget.accept(this);
    node.valueSource.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitBinaryExpression(node: BinaryExpression): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.leftOperand.accept(this);
    node.rightOperand.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitBitModifier(node: BitModifier): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.length.accept(this);
    node.identifier?.accept(this);
    node.classId?.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitClassDeclaration(node: ClassDeclaration): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.alignedModifier?.accept(this);
    node.expandableModifier?.accept(this);
    node.identifier?.accept(this);
    node.parameterList?.accept(this);
    node.extendsModifier?.accept(this);
    node.bitModifier?.accept(this);

    node.statements.forEach((child) => {
      child.accept(this);
    });

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitClassDefinition(node: ClassDefinition): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.classIdentifier.accept(this);
    node.identifier.accept(this);
    node.parameterValueList?.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitClassDefinitionParameter(node: ParameterList): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.parameters.forEach((child) => {
      child.accept(this);
    });

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitClassId(node: ClassId): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.value.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitClassIdRange(node: ClassIdRange): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.startClassId.accept(this);
    node.endClassId.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitClassMemberAccess(node: ClassMemberAccess): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.memberIdentifier.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitCompoundStatement(node: CompoundStatement): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.statements.forEach((child) => {
      child.accept(this);
    });

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitComputedArrayDefinition(node: ComputedArrayDefinition): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.elementaryType.accept(this);
    node.identifier.accept(this);
    node.dimensions.forEach((child) => {
      child.accept(this);
    });

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitComputedElementaryTypeDefinition(
    node: ComputedElementaryDefinition,
  ): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.elementaryType.accept(this);
    node.identifier.accept(this);
    node.valueExpression?.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitDoStatement(node: DoStatement): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());
    this.nodeCallback.afterVisit(node, this.peekContext());
    throw new Error("Method not implemented.");
  }

  visitElementaryType(node: ElementaryType): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());
    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitElementaryTypeDefinition(node: ElementaryTypeDefinition): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.alignedModifier?.accept(this);
    node.elementaryType.accept(this);
    node.lengthAttribute.accept(this);
    node.identifier.accept(this);
    node.valueExpression?.accept(this);
    node.endValueExpression?.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitExpandableModifier(node: ExpandableModifier): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.maxClassSize?.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitExplicitArrayDimension(node: ExplicitArrayDimension): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.sizeExpression.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitExpressionStatement(node: ExpressionStatement): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.expression.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitExtendedClassIdRange(node: ExtendedClassIdRange): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.classIds.forEach((child) => {
      child.accept(this);
    });

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitExtendsModifier(node: ExtendsModifier): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.identifier.accept(this);
    node.parameterValueList?.accept(this),
      this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitForStatement(node: ForStatement): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());
    this.nodeCallback.afterVisit(node, this.peekContext());
    throw new Error("Method not implemented.");
  }

  visitIdentifier(node: Identifier): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());
    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitIfStatement(node: IfStatement): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());
    this.nodeCallback.afterVisit(node, this.peekContext());
    throw new Error("Method not implemented.");
  }

  visitImplicitArrayDimension(node: ImplicitArrayDimension): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.rangeStartExpression?.accept(this);
    node.rangeEndExpression?.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitLengthAttribute(node: LengthAttribute): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.lengthExpression.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitLengthOfExpression(node: LengthOfExpression): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.expression.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitMapDeclaration(node: MapDeclaration): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.identifier.accept(this);
    node.outputElementaryType?.accept(this);
    node.outputClassIdentifier?.accept(this);
    node.mapEntryList.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitMapDefinition(node: MapDefinition): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.elementaryType?.accept(this);
    node.classIdentifier?.accept(this);
    node.mapIdentifier.accept(this);
    node.identifier.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitMapEntry(node: MapEntry): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.inputValue.accept(this);
    node.outputValue.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitMapEntryList(node: MapEntryList): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.mapEntries.forEach((child) => {
      child.accept(this);
    });

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitMapOutputValue(node: MapOutputValue): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.numberLiteralValue?.accept(this);
    node.elementaryType?.accept(this);
    node.lengthAttribute?.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitNumberLiteral(node: NumberLiteral): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());
    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitParameter(node: Parameter): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.classIdentifier?.accept(this);
    node.elementaryType?.accept(this);
    node.identifier.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitParameterList(node: ParameterList): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.parameters.forEach((child) => {
      child.accept(this);
    });

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitParameterValueList(node: ParameterValueList): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.valueExpressions.forEach((child) => {
      child.accept(this);
    });

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitPartialArrayDimension(node: PartialArrayDimension): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.indexExpression.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitPostfixExpression(node: PostfixExpression): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.operand.accept(this);
    node.arrayElementAccess?.accept(this);
    node.classMemberAccess?.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitPrimaryExpression(node: PrimaryExpression): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.operand.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitSpecification(node: Specification): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.globals.forEach((child) => {
      child.accept(this);
    });

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitStringDefinition(node: StringDefinition): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.alignedModifier?.accept(this);
    node.identifier.accept(this);
    node.stringLiteral?.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitStringLiteral(node: StringLiteral): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());
    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitSwitchStatement(node: SwitchStatement): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());
    this.nodeCallback.afterVisit(node, this.peekContext());
    throw new Error("Method not implemented.");
  }

  visitUnaryExpression(node: UnaryExpression): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());

    node.operand.accept(this);

    this.nodeCallback.afterVisit(node, this.peekContext());
  }

  visitWhileStatement(node: WhileStatement): void {
    this.nodeCallback.beforeVisit(node, this.peekContext());
    this.nodeCallback.afterVisit(node, this.peekContext());
    throw new Error("Method not implemented.");
  }
}

export default TraversingVisitor;
