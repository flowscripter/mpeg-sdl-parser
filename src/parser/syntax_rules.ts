import { rule } from "../../deps.ts";
import AbstractExpression from "../abstract_syntax_tree/node/AbstractExpression.ts";
import AbstractStatement from "../abstract_syntax_tree/node/AbstractStatement.ts";
import MapAggregateOutputValue from "../abstract_syntax_tree/node/AggregateMapOutputValue.ts";
import AlignedModifier from "../abstract_syntax_tree/node/AlignedModifier.ts";
import ArrayDefinition from "../abstract_syntax_tree/node/ArrayDefinition.ts";
import ArrayElementType from "../abstract_syntax_tree/node/ArrayElementType.ts";
import AssignmentExpression from "../abstract_syntax_tree/node/AssignmentExpression.ts";
import BitModifier from "../abstract_syntax_tree/node/BitModifier.ts";
import ClassDeclaration from "../abstract_syntax_tree/node/ClassDeclaration.ts";
import ClassDefinition from "../abstract_syntax_tree/node/ClassDefinition.ts";
import ClassId from "../abstract_syntax_tree/node/ClassId.ts";
import ClassIdRange from "../abstract_syntax_tree/node/ClassIdRange.ts";
import CompoundStatement from "../abstract_syntax_tree/node/CompoundStatement.ts";
import ComputedArrayDefinition from "../abstract_syntax_tree/node/ComputedArrayDefinition.ts";
import ElementaryType from "../abstract_syntax_tree/node/ElementaryType.ts";
import ExpandableModifier from "../abstract_syntax_tree/node/ExpandableModifier.ts";
import ExplicitArrayDimension from "../abstract_syntax_tree/node/ExplicitArrayDimension.ts";
import ExpressionStatement from "../abstract_syntax_tree/node/ExpressionStatement.ts";
import ExtendedClassIdRange from "../abstract_syntax_tree/node/ExtendedClassIdRange.ts";
import ExtendsModifier from "../abstract_syntax_tree/node/ExtendsModifier.ts";
import Identifier from "../abstract_syntax_tree/node/Identifier.ts";
import ImplicitArrayDimension from "../abstract_syntax_tree/node/ImplicitArrayDimension.ts";
import LengthAttribute from "../abstract_syntax_tree/node/LengthAttribute.ts";
import MapDeclaration from "../abstract_syntax_tree/node/MapDeclaration.ts";
import MapDefinition from "../abstract_syntax_tree/node/MapDefinition.ts";
import MapEntry from "../abstract_syntax_tree/node/MapEntry.ts";
import MapEntryList from "../abstract_syntax_tree/node/MapEntryList.ts";
import MapOutputValue from "../abstract_syntax_tree/node/MapOutputValue.ts";
import NumberLiteral from "../abstract_syntax_tree/node/NumberLiteral.ts";
import Parameter from "../abstract_syntax_tree/node/Parameter.ts";
import ParameterList from "../abstract_syntax_tree/node/ParameterList.ts";
import ParameterValueList from "../abstract_syntax_tree/node/ParameterValueList.ts";
import PartialArrayDimension from "../abstract_syntax_tree/node/PartialArrayDimension.ts";
import Specification from "../abstract_syntax_tree/node/Specification.ts";
import StringDefinition from "../abstract_syntax_tree/node/StringDefinition.ts";
import StringLiteral from "../abstract_syntax_tree/node/StringLiteral.ts";
import TokenKind from "../tokenizer/enum/token_kind.ts";
import getAdditiveExpressionPattern from "./syntax_patterns/additive_expression_pattern.ts";
import getAlignedModifierPattern from "./syntax_patterns/aligned_modifier_pattern.ts";
import getArrayDefinitionPattern from "./syntax_patterns/array_definition_pattern.ts";
import getArrayElementAccessPattern from "./syntax_patterns/array_element_access_pattern.ts";
import getArrayElementTypePattern from "./syntax_patterns/array_element_type_pattern.ts";
import getAssignmentExpressionPattern from "./syntax_patterns/assignment_expression_pattern.ts";
import getBitModifierPattern from "./syntax_patterns/bit_modifier_pattern.ts";
import getBitwiseExpressionPattern from "./syntax_patterns/bitwise_expression_pattern.ts";
import getClassDeclarationPattern from "./syntax_patterns/class_declaration_pattern.ts";
import getClassDefinitionPattern from "./syntax_patterns/class_definition_pattern.ts";
import getClassIdPattern from "./syntax_patterns/class_id_pattern.ts";
import getClassIdRangePattern from "./syntax_patterns/class_id_range_pattern.ts";
import getClassMemberAccessPattern from "./syntax_patterns/class_member_access_pattern.ts";
import getCompoundStatementPattern from "./syntax_patterns/compound_statement_pattern.ts";
import getComputedArrayDefinitionPattern from "./syntax_patterns/computed_array_definition_pattern.ts";
import getComputedElementaryTypeDefinitionPattern from "./syntax_patterns/computed_elementary_type_definition_pattern.ts";
import getElementaryTypeDefinitionPattern from "./syntax_patterns/elementary_type_definition_pattern.ts";
import getElementaryTypePattern from "./syntax_patterns/elementary_type_pattern.ts";
import getEqualityExpressionPattern from "./syntax_patterns/equality_expression_pattern.ts";
import getExpandableModifierPattern from "./syntax_patterns/expandable_modifier_pattern.ts";
import getExplicitArrayDimensionPattern from "./syntax_patterns/explicit_array_dimension_pattern.ts";
import getExpressionPattern from "./syntax_patterns/expression_pattern.ts";
import getExpressionStatementPattern from "./syntax_patterns/expression_statement_pattern.ts";
import getExtendedClassIdRangePattern from "./syntax_patterns/extended_class_id_range_pattern.ts";
import getExtendsModifierPattern from "./syntax_patterns/extends_modifier_pattern.ts";
import getIdentifierPattern from "./syntax_patterns/identifier_pattern.ts";
import getImplicitArrayDimensionPattern from "./syntax_patterns/implicit_array_dimension_pattern.ts";
import getLengthAttributePattern from "./syntax_patterns/length_attribute_pattern.ts";
import getLengthofExpressionPattern from "./syntax_patterns/lengthof_expression_pattern.ts";
import getMapAggregateOutputValuePattern from "./syntax_patterns/map_aggregate_output_value_pattern.ts";
import getMapDeclarationPattern from "./syntax_patterns/map_declaration_pattern.ts";
import getMapDefinitionPattern from "./syntax_patterns/map_definition_pattern.ts";
import getMapEntryListPattern from "./syntax_patterns/map_entry_list_pattern.ts";
import getMapEntryPattern from "./syntax_patterns/map_entry_pattern.ts";
import getMapOutputValueRulePattern from "./syntax_patterns/map_output_value_pattern.ts";
import getMultiplicativeExpressionPattern from "./syntax_patterns/multiplicative_expression_pattern.ts";
import getNumberLiteralPattern from "./syntax_patterns/number_literal_pattern.ts";
import getParameterListPattern from "./syntax_patterns/parameter_list_pattern.ts";
import getParameterPattern from "./syntax_patterns/parameter_pattern.ts";
import getParameterValueListPattern from "./syntax_patterns/parameter_value_list_pattern.ts";
import getPartialArrayDimensionPattern from "./syntax_patterns/partial_array_dimension_pattern.ts";
import getPostfixExpressionPattern from "./syntax_patterns/postfix_expression_pattern.ts";
import getPrimaryExpressionPattern from "./syntax_patterns/primary_expression_pattern.ts";
import getRelationalExpressionPattern from "./syntax_patterns/relational_expression_pattern.ts";
import getShiftExpressionPattern from "./syntax_patterns/shift_expression_pattern.ts";
import getSpecificationPattern from "./syntax_patterns/specification_pattern.ts";
import getStatementPattern from "./syntax_patterns/statement_pattern.ts";
import getStringDefinitionPattern from "./syntax_patterns/string_definition_rule.ts";
import getStringLiteralPattern from "./syntax_patterns/string_literal_rule.ts";
import getUnaryExpressionPattern from "./syntax_patterns/unary_expression_pattern.ts";

export const ADDITIVE_EXPRESSION_RULE = rule<TokenKind, AbstractExpression>();
export const ALIGNED_MODIFIER_RULE = rule<TokenKind, AlignedModifier>();
export const ARRAY_DEFINITION_RULE = rule<TokenKind, ArrayDefinition>();
export const ARRAY_ELEMENT_ACCESS_RULE = rule<TokenKind, AbstractExpression>();
export const ARRAY_ELEMENT_TYPE_RULE = rule<TokenKind, ArrayElementType>();
export const ASSIGNMENT_EXPRESSION_RULE = rule<
  TokenKind,
  AssignmentExpression
>();
export const BIT_MODIFIER_RULE = rule<TokenKind, BitModifier>();
export const BITWISE_EXPRESSION_RULE = rule<TokenKind, AbstractExpression>();
export const CLASS_DECLARATION_RULE = rule<TokenKind, ClassDeclaration>();
export const CLASS_DEFINITION_RULE = rule<TokenKind, ClassDefinition>();
export const CLASS_ID_RULE = rule<TokenKind, ClassId>();
export const CLASS_ID_RANGE_RULE = rule<TokenKind, ClassIdRange>();
export const CLASS_MEMBER_ACCESS_RULE = rule<TokenKind, AbstractExpression>();
export const COMPOUND_STATEMENT_RULE = rule<TokenKind, CompoundStatement>();
export const COMPUTED_ARRAY_DEFINITION_RULE = rule<
  TokenKind,
  ComputedArrayDefinition
>();
export const COMPUTED_ELEMENTARY_TYPE_DEFINITION_RULE = rule<
  TokenKind,
  AbstractStatement
>();
export const ELEMENTARY_TYPE_DEFINITION_RULE = rule<
  TokenKind,
  AbstractStatement
>();
export const ELEMENTARY_TYPE_RULE = rule<TokenKind, ElementaryType>();
export const EQUALITY_EXPRESSION_RULE = rule<TokenKind, AbstractExpression>();
export const EXPANDABLE_MODIFIER_RULE = rule<TokenKind, ExpandableModifier>();
export const EXPLICIT_ARRAY_DIMENSION_RULE = rule<
  TokenKind,
  ExplicitArrayDimension
>();
export const EXPRESSION_RULE = rule<TokenKind, AbstractExpression>();
export const EXPRESSION_STATEMENT_RULE = rule<TokenKind, ExpressionStatement>();
export const EXTENDED_CLASS_ID_RANGE_RULE = rule<
  TokenKind,
  ExtendedClassIdRange
>();
export const EXTENDS_MODIFIER_RULE = rule<TokenKind, ExtendsModifier>();
export const IDENTIFIER_RULE = rule<TokenKind, Identifier>();
export const IMPLICIT_ARRAY_DIMENSION_RULE = rule<
  TokenKind,
  ImplicitArrayDimension
>();
export const LENGTH_ATTRIBUTE_RULE = rule<TokenKind, LengthAttribute>();
export const LENGTHOF_EXPRESSION_RULE = rule<TokenKind, AbstractExpression>();
export const MAP_AGGREGATE_OUTPUT_VALUE_RULE = rule<
  TokenKind,
  MapAggregateOutputValue
>();
export const MAP_DECLARATION_RULE = rule<TokenKind, MapDeclaration>();
export const MAP_DEFINITION_RULE = rule<TokenKind, MapDefinition>();
export const MAP_ENTRY_LIST_RULE = rule<TokenKind, MapEntryList>();
export const MAP_ENTRY_RULE = rule<TokenKind, MapEntry>();
export const MAP_OUTPUT_VALUE_RULE = rule<TokenKind, MapOutputValue>();
export const MULTIPLICATIVE_EXPRESSION_RULE = rule<
  TokenKind,
  AbstractExpression
>();
export const NUMBER_LITERAL_RULE = rule<TokenKind, NumberLiteral>();
export const PARAMETER_LIST_RULE = rule<TokenKind, ParameterList>();
export const PARAMETER_RULE = rule<TokenKind, Parameter>();
export const PARAMETER_VALUE_LIST_RULE = rule<TokenKind, ParameterValueList>();
export const PARTIAL_ARRAY_DIMENSION_RULE = rule<
  TokenKind,
  PartialArrayDimension
>();
export const POSTFIX_EXPRESSION_RULE = rule<TokenKind, AbstractExpression>();
export const PRIMARY_EXPRESSION_RULE = rule<TokenKind, AbstractExpression>();
export const RELATIONAL_EXPRESSION_RULE = rule<TokenKind, AbstractExpression>();
export const SHIFT_EXPRESSION_RULE = rule<TokenKind, AbstractExpression>();
export const SPECIFICATION_RULE = rule<TokenKind, Specification>();
export const STATEMENT_RULE = rule<TokenKind, AbstractStatement>();
export const STRING_DEFINITION_RULE = rule<TokenKind, StringDefinition>();
export const STRING_LITERAL_RULE = rule<TokenKind, StringLiteral>();
export const UNARY_EXPRESSION_RULE = rule<TokenKind, AbstractExpression>();

export function initRules() {
  ADDITIVE_EXPRESSION_RULE.setPattern(getAdditiveExpressionPattern());
  ALIGNED_MODIFIER_RULE.setPattern(getAlignedModifierPattern());
  ARRAY_DEFINITION_RULE.setPattern(getArrayDefinitionPattern());
  ARRAY_ELEMENT_ACCESS_RULE.setPattern(getArrayElementAccessPattern());
  ARRAY_ELEMENT_TYPE_RULE.setPattern(getArrayElementTypePattern());
  ASSIGNMENT_EXPRESSION_RULE.setPattern(getAssignmentExpressionPattern());
  BIT_MODIFIER_RULE.setPattern(getBitModifierPattern());
  BITWISE_EXPRESSION_RULE.setPattern(getBitwiseExpressionPattern());
  CLASS_DECLARATION_RULE.setPattern(getClassDeclarationPattern());
  CLASS_DEFINITION_RULE.setPattern(getClassDefinitionPattern());
  CLASS_ID_RANGE_RULE.setPattern(getClassIdRangePattern());
  CLASS_ID_RULE.setPattern(getClassIdPattern());
  CLASS_MEMBER_ACCESS_RULE.setPattern(getClassMemberAccessPattern());
  COMPOUND_STATEMENT_RULE.setPattern(getCompoundStatementPattern());
  COMPUTED_ARRAY_DEFINITION_RULE.setPattern(
    getComputedArrayDefinitionPattern(),
  );
  COMPUTED_ELEMENTARY_TYPE_DEFINITION_RULE.setPattern(
    getComputedElementaryTypeDefinitionPattern(),
  );
  ELEMENTARY_TYPE_DEFINITION_RULE.setPattern(
    getElementaryTypeDefinitionPattern(),
  );
  ELEMENTARY_TYPE_RULE.setPattern(getElementaryTypePattern());
  EQUALITY_EXPRESSION_RULE.setPattern(getEqualityExpressionPattern());
  EXPANDABLE_MODIFIER_RULE.setPattern(getExpandableModifierPattern());
  EXPLICIT_ARRAY_DIMENSION_RULE.setPattern(getExplicitArrayDimensionPattern());
  EXPRESSION_RULE.setPattern(getExpressionPattern());
  EXPRESSION_STATEMENT_RULE.setPattern(getExpressionStatementPattern());
  EXTENDED_CLASS_ID_RANGE_RULE.setPattern(getExtendedClassIdRangePattern());
  EXTENDS_MODIFIER_RULE.setPattern(getExtendsModifierPattern());
  IDENTIFIER_RULE.setPattern(getIdentifierPattern());
  IMPLICIT_ARRAY_DIMENSION_RULE.setPattern(getImplicitArrayDimensionPattern());
  LENGTH_ATTRIBUTE_RULE.setPattern(getLengthAttributePattern());
  LENGTHOF_EXPRESSION_RULE.setPattern(getLengthofExpressionPattern());
  MAP_AGGREGATE_OUTPUT_VALUE_RULE.setPattern(
    getMapAggregateOutputValuePattern(),
  );
  MAP_DECLARATION_RULE.setPattern(getMapDeclarationPattern());
  MAP_DEFINITION_RULE.setPattern(getMapDefinitionPattern());
  MAP_ENTRY_LIST_RULE.setPattern(getMapEntryListPattern());
  MAP_ENTRY_RULE.setPattern(getMapEntryPattern());
  MAP_OUTPUT_VALUE_RULE.setPattern(getMapOutputValueRulePattern());
  MULTIPLICATIVE_EXPRESSION_RULE.setPattern(
    getMultiplicativeExpressionPattern(),
  );
  NUMBER_LITERAL_RULE.setPattern(getNumberLiteralPattern());
  PARAMETER_LIST_RULE.setPattern(getParameterListPattern());
  PARAMETER_RULE.setPattern(getParameterPattern());
  PARAMETER_VALUE_LIST_RULE.setPattern(getParameterValueListPattern());
  PARTIAL_ARRAY_DIMENSION_RULE.setPattern(getPartialArrayDimensionPattern());
  POSTFIX_EXPRESSION_RULE.setPattern(getPostfixExpressionPattern());
  PRIMARY_EXPRESSION_RULE.setPattern(getPrimaryExpressionPattern());
  RELATIONAL_EXPRESSION_RULE.setPattern(getRelationalExpressionPattern());
  SHIFT_EXPRESSION_RULE.setPattern(getShiftExpressionPattern());
  SPECIFICATION_RULE.setPattern(getSpecificationPattern());
  STATEMENT_RULE.setPattern(getStatementPattern());
  STRING_DEFINITION_RULE.setPattern(getStringDefinitionPattern());
  STRING_LITERAL_RULE.setPattern(getStringLiteralPattern());
  UNARY_EXPRESSION_RULE.setPattern(getUnaryExpressionPattern());
}
