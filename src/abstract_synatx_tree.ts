// deno-fmt-ignore-file

import NodeKind from "./node_kind.ts";
import NumberKind from "./number_kind.ts"
import StringVariableKind from "./string_variable_kind.ts"
import StringLiteralKind from "./string_literal_kind.ts"
import UnaryOperatorKind from "./unary_operator_kind.ts"
import BinaryOperatorKind from "./binary_operator_kind.ts"
import ElementaryTypeKind from "./elementary_type_kind.ts";

interface Node {
  kind: NodeKind
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
  kind: NodeKind.PARSABLE_VALUE_VARIABLE_DEFINITION;
  alignment?: number;
  width: Expression;
  isLookahead: boolean;
  endValue?: NumberValue;
}

export type ElementaryTypeVariableDefinition =
    NonParsableVariableDefinition
    | ParsableVariableDefinition;


// /* Rule E.3: Maps */
//
// output_value ::= aggregate_output_value | number | elementary_type width_attribute
//
// aggregate_output_value ::= '{' ( output_value ',' )* output_value '}'
//
// map_definition_entry ::= binary_value ',' aggregate_output_value
//
// /* The identifier within the literal brackets must refer to the name of a class */
//
// map_definition ::= 'map' identifier '(' ( identifier | elementary_type ) ')' '{' ( map_definition_entry ',' )+ map_definition_entry '}'
export interface MapDefinition extends Node {
  kind: NodeKind.MAP_DEFINITION;
}


// /* Rule E.4: Mapped data types */
//
// /* The identifier before the literal brackets must refer to the name of a class */
//
// /* The identifier within the literal brackets must refer to the name of a map */
//
// map_variable_definition ::= ( identifier | elementary_type ) '(' identifier ')' identifier ';'
export interface MapVariableDefinition extends Node {
  kind: NodeKind.MAP_VARIABLE_DEFINITION;
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


// /* Rule C.2: Derived classes */
//
// /* The identifier must refer to the name of a class */
//
// extends_attribute ::= 'extends' identifier
//
// bit_attribute ::= [: bit(length) [id_name =] object_id | id_range | extended_id_range ]
export interface ClassDefinition extends Node {
  kind: NodeKind.CLASS_DEFINITION;
}

export interface ClassVariableDefinition extends Node {
  kind: NodeKind.CLASS_VARIABLE_DEFINITION;
}


// /* Rule C.3: Abstract classes */
//
// abstract_attribute ::= 'abstract'
//
//
// /* Rule C.4: Expandable classes */
//
// expandable_attribute ::= 'expandable' ( '(' positive_integer_value ')' )?
//
//
//     /* Rule C.5: Class parameter types */
//
//     /* The optional identifier must refer to the name of a class */
//
//     parameter_list_item ::= ( identifier | elementary_type ) identifier
//
// parameter_list ::= '(' ( parameter_list_item ',' )* parameter_list_item ')'
//
// parameter_values ::= '(' ( expression ',' )* expression ')'
//
//
// /* Rule C.1: Classes */
//
// class_definition ::= aligned_attribute expandable_attribute? abstract_attribute? 'class' identifier parameter_list? extends_attribute? bit_attribute? '{' statement* '}'
//
//     /* The first identifier must refer to the name of a class */
//
//     class_variable_definition ::= identifier identifier parameter_values? ';'
//
//
//     /* Rule A.3: Partial arrays */
//
//     partial_array_dimension_specifier ::= '[' expression ']'
//
//
// /* Rule A.4: Implicit arrays */
//
// implicit_array_dimension_specifier ::= ( positive_integer_value range_operator positive_integer_value )+
//
//
//     /* Rule A.1: Arrays */
//
//     /* Rule A.2: Multi-dimensional arrays */
//
//     /* The optional identifier must refer to the name of a class */
//
//     array_item_type ::= elementary_type width_attribute | identifier
//
// array_dimension_definition ::= '[' ( expression | partial_array_dimension_specifier | implicit_array_dimension_specifier ) ']'
//
// array_variable_definition ::= array_item_type identifier array_dimension_definition+ ';'
export interface ArrayVariableDefinition extends Node {
  kind: NodeKind.ARRAY_VARIABLE_DEFINITION;
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
