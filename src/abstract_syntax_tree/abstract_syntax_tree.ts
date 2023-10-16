// deno-fmt-ignore-file

import NodeKind from "./node_kind.ts";
import NumberKind from "./number_kind.ts"
import StringVariableKind from "./string_variable_kind.ts"
import StringLiteralKind from "./string_literal_kind.ts"
import UnaryOperatorKind from "./unary_operator_kind.ts"
import BinaryOperatorKind from "./binary_operator_kind.ts"
import ElementaryTypeKind from "./elementary_type_kind.ts";
import ArrayDimensionKind from "./array_dimension_kind.ts";

interface Node {
  kind: NodeKind
}

/* Comment */

export interface Comment extends Node {
  kind: NodeKind.COMMENT;
  comment: string;
}

/* Numbers */

export interface NumberValue extends Node {
  kind: NodeKind.NUMBER_VALUE;
  numberKind: NumberKind;
  valueAsString: string;
  value: number;
}

export type AssignmentTarget = Identifier | ClassMemberExpression;

export interface UnaryOperator extends Node {
  kind: NodeKind.UNARY_OPERATOR;
  unaryOperatorKind: UnaryOperatorKind;
}

export interface BinaryOperator extends Node {
  kind: NodeKind.BINARY_OPERATOR;
  binaryOperatorKind: BinaryOperatorKind;
}

export type OperatorTarget =
    Identifier
    | NumberValue
    | LengthOfExpression
    | ClassMemberExpression
    | Expression;

export interface UnaryExpression extends Node {
  kind: NodeKind.UNARY_EXPRESSION;
  operatorTarget: OperatorTarget;
  postfixOperator?: UnaryOperator;
}

export interface Expression extends Node {
  kind: NodeKind.EXPRESSION;
  initialUnaryExpression: UnaryExpression;
  subsequentOperations: { binaryOperator: BinaryOperator, unaryExpression: UnaryExpression}[];
}

export interface Identifier extends Node {
  kind: NodeKind.IDENTIFIER;
  name: string;
}

export interface AssignmentExpression extends Node {
  kind: NodeKind.ASSIGNMENT_EXPRESSION;
  assignmentTarget: AssignmentTarget;
  expression: Expression;
}

export type ConstantExpression = NumberValue | StringLiteral;


/* Rule O.2: Class member access operator */


export interface ClassMemberExpression extends Node {
  kind: NodeKind.CLASS_MEMBER_EXPRESSION;
  identifiers: Identifier[];
}


/* Rule F.1: lengthof() function */

export interface LengthOfExpression extends Node {
  kind: NodeKind.LENGTH_OF_EXPRESSION;
  identifier: Identifier;
}


/* Rule E.1: Elementary data types */
/* Rule E.2: Look-ahead parsing */

interface VariableDefinition extends Node {
  isConst: boolean;
  elementaryType: ElementaryTypeKind;
  identifier: Identifier;
  value?: NumberValue;
}

export interface NonParsableVariableDefinition extends VariableDefinition {
  kind: NodeKind.NON_PARSABLE_VARIABLE_DEFINITION;
}

export interface ParsableVariableDefinition extends VariableDefinition {
  kind: NodeKind.PARSABLE_VARIABLE_DEFINITION;
  alignment?: number;
  width: Expression | NumberValue;
  isLookahead: boolean;
  endValue?: NumberValue;
}

export type ElementaryTypeVariableDefinition =
    NonParsableVariableDefinition
    | ParsableVariableDefinition;


/* Rule E.3: Maps */

export interface ParsableTypeMapOutput extends Node {
  kind: NodeKind.PARSABLE_TYPE_MAP_OUTPUT;
  elementaryType: ElementaryTypeKind;
  width: NumberValue;
}

export type MapOutputType = NumberValue | ParsableTypeMapOutput | MapOutputType[];

export interface MapDefinition extends Node {
  kind: NodeKind.MAP_DEFINITION;

  identifier: Identifier;

  // If the outputType is Identifier type, it must refer to the name of a class
  outputType: Identifier | ElementaryTypeKind;

  // inputValue.numberKind must be BINARY
  entries: { inputValue: NumberValue, outputValue: MapOutputType };
}


/* Rule E.4: Mapped data types */

export interface MapVariableDefinition extends Node {
  kind: NodeKind.MAP_VARIABLE_DEFINITION;

  // If the outputType is Identifier type, it must refer to the name of a class
  // The outputType must match the outputType of the map specified by mapIdentifier
  outputType: Identifier | ElementaryTypeKind;

  // The identifier must refer to the name of a map
  mapIdentifier: Identifier;

  identifier: Identifier;
}


/* Rule E.5: String data types */

export interface StringLiteral extends Node {
  kind: NodeKind.STRING_LITERAL;
  stringLiteralKind: StringLiteralKind;
  value: string;
}

export interface StringVariableDefinition extends Node {
  kind: NodeKind.STRING_VARIABLE_DEFINITION;
  stringVariableKind: StringVariableKind;
  identifier: Identifier;
  stringLiteral?: StringLiteral;
}


/* Rule C.1: Classes */
/* Rule C.2: Derived classes */
/* Rule C.3: Abstract classes */
/* Rule C.4: Expandable classes */
/* Rule C.5: Class parameter types */

export interface ClassIdSpecification extends Node {
  kind: NodeKind.CLASS_ID_SPECIFICATION;
  id: number;
  idRangeEnd?: number;
}

export interface ClassDefinitionBitAttribute extends Node {
  kind: NodeKind.CLASS_DEFINITION_BIT_ATTRIBUTE;

  length: number;
  identifier?: Identifier;
  classIdSpecifications: ClassIdSpecification[];
}

export interface ClassDefinitionParameter extends Node {
  kind: NodeKind.CLASS_DEFINITION_PARAMETER;

  parameterType: Identifier | ElementaryTypeKind;

  identifier: Identifier;
}

export interface ClassDefinition extends Node {
  kind: NodeKind.CLASS_DEFINITION;
  isAbstract: boolean;
  alignment?: number;
  expandable?: number;
  identifier: Identifier;
  parameters: ClassDefinitionParameter[];

  // parentClass must refer to the name of a class
  parentClass?: Identifier;
  bitAttribute?: ClassDefinitionBitAttribute;
  statements: Statement[];
}


export interface ClassVariableDefinition extends Node {
  kind: NodeKind.CLASS_VARIABLE_DEFINITION;

  identifier: Identifier;

  // className must refer to the name of a class
  className: Identifier;

  parameterValues: Expression[];
}


/* Rule A.1: Arrays */
/* Rule A.2: Multi-dimensional arrays */
/* Rule A.3: Partial arrays */
/* Rule A.4: Implicit arrays */

export interface ElementaryTypeArrayItemType extends Node {
  kind: NodeKind.ELEMENTARY_TYPE_ARRAY_ITEM_TYPE;
  elementaryType: ElementaryTypeKind;
  width: NumberValue;
}

export interface ArrayDimension extends Node {
  kind: NodeKind.ARRAY_DIMENSION;
  arrayDimensionKind: ArrayDimensionKind;

  // expression is required for ArrayDimensionKind.EXPLICIT,
  // optional for ArrayDimensionKind.PARTIAL and illegal for ArrayDimensionKind.IMPLICIT
  expression?: Expression;

  // rangeStart is optional for ArrayDimensionKind.IMPLICIT and illegal otherwise
  // if rangeStart is specified, rangeEnd must also be specified
  rangeStart?: NumberValue;

  // rangeEnd is optional for ArrayDimensionKind.IMPLICIT and illegal otherwise
  // if rangeEnd is specified, rangeStart must also be specified
  rangeEnd?: NumberValue;
}

export interface ArrayVariableDefinition extends Node {
  kind: NodeKind.ARRAY_VARIABLE_DEFINITION;

  // If the itemType is Identifier type, it must refer to the name of a class
  itemType: Identifier | ElementaryTypeArrayItemType;
  identifier: Identifier;
  dimensions: ArrayDimension[];
}


/* Rule FC.1: Flow control using if-then-else */

export interface IfStatement extends Node {
  kind: NodeKind.IF_STATEMENT;
  ifClauses: { expression: Expression, compoundStatement: CompoundStatement}[];
  elseExpression?: Expression;
}


/* Rule FC.2: Flow control using switch */

export interface SwitchStatement extends Node {
  kind: NodeKind.SWITCH_STATEMENT;
  expression: Expression;
  caseClauses: { case: ConstantExpression, statements: Statement[]}[];
  defaultClauseStatements?: Statement[];
}


/* Rule FC.3: Flow control using for */

export interface ForStatement extends Node {
  kind: NodeKind.FOR_STATEMENT;
  expression1: AssignmentExpression | NonParsableVariableDefinition;
  expression2: Expression;
  expression3: AssignmentExpression | Expression;
  compoundStatement: CompoundStatement;
}


/* Rule FC.4: Flow control using do */

export interface DoStatement extends Node {
  kind: NodeKind.DO_STATEMENT;
  compoundStatement: CompoundStatement;
  expression: Expression;
}


/* Rule FC.5: Flow control using while */

export interface WhileStatement extends Node {
  kind: NodeKind.WHILE_STATEMENT;
  expression: Expression;
  compoundStatement: CompoundStatement;
}


/* Statements */

/* Block scoping */

export interface CompoundStatement extends Node {
  kind: NodeKind.COMPOUND_STATEMENT;
  statements: Statement[]
}

export type Statement =
  CompoundStatement
  | ElementaryTypeVariableDefinition
  | MapDefinition
  | MapVariableDefinition
  | StringVariableDefinition
  | ClassDefinition
  | ClassVariableDefinition
  | ArrayVariableDefinition
  | IfStatement
  | SwitchStatement
  | ForStatement
  | DoStatement
  | WhileStatement
  | Expression
  | AssignmentExpression;

export interface Definition extends Node {
  kind: NodeKind.DEFINITION;
  statements: Statement[];
}
