import { rule } from "typescript-parsec";
import type { AbstractNode, Specification } from "../../index.ts";
import type { AbstractExpression } from "../abstract_syntax_tree/node/AbstractExpression.ts";
import type { AbstractStatement } from "../abstract_syntax_tree/node/AbstractStatement.ts";
import type { AggregateMapOutputValue } from "../abstract_syntax_tree/node/AggregateMapOutputValue.ts";
import type { AlignedModifier } from "../abstract_syntax_tree/node/AlignedModifier.ts";
import type { ArrayDefinition } from "../abstract_syntax_tree/node/ArrayDefinition.ts";
import type { ArrayElementType } from "../abstract_syntax_tree/node/ArrayElementType.ts";
import type { BinaryExpression } from "../abstract_syntax_tree/node/BinaryExpression.ts";
import type { BitModifier } from "../abstract_syntax_tree/node/BitModifier.ts";
import type { ClassDeclaration } from "../abstract_syntax_tree/node/ClassDeclaration.ts";
import type { ClassDefinition } from "../abstract_syntax_tree/node/ClassDefinition.ts";
import type { ClassIdRange } from "../abstract_syntax_tree/node/ClassIdRange.ts";
import type { CompoundStatement } from "../abstract_syntax_tree/node/CompoundStatement.ts";
import type { ComputedArrayDefinition } from "../abstract_syntax_tree/node/ComputedArrayDefinition.ts";
import type { DoStatement } from "../abstract_syntax_tree/node/DoStatement.ts";
import type { ElementaryType } from "../abstract_syntax_tree/node/ElementaryType.ts";
import type { ExpandableModifier } from "../abstract_syntax_tree/node/ExpandableModifier.ts";
import type { ExplicitArrayDimension } from "../abstract_syntax_tree/node/ExplicitArrayDimension.ts";
import type { ExpressionStatement } from "../abstract_syntax_tree/node/ExpressionStatement.ts";
import type { ExtendedClassIdRange } from "../abstract_syntax_tree/node/ExtendedClassIdRange.ts";
import type { ExtendsModifier } from "../abstract_syntax_tree/node/ExtendsModifier.ts";
import type { ForStatement } from "../abstract_syntax_tree/node/ForStatement.ts";
import type { Identifier } from "../abstract_syntax_tree/node/Identifier.ts";
import type { IfClause } from "../abstract_syntax_tree/node/IfClause.ts";
import type { IfStatement } from "../abstract_syntax_tree/node/IfStatement.ts";
import type { ImplicitArrayDimension } from "../abstract_syntax_tree/node/ImplicitArrayDimension.ts";
import type { LengthAttribute } from "../abstract_syntax_tree/node/LengthAttribute.ts";
import type { MapDeclaration } from "../abstract_syntax_tree/node/MapDeclaration.ts";
import type { MapDefinition } from "../abstract_syntax_tree/node/MapDefinition.ts";
import type { MapEntry } from "../abstract_syntax_tree/node/MapEntry.ts";
import type { MapEntryList } from "../abstract_syntax_tree/node/MapEntryList.ts";
import type { NumberLiteral } from "../abstract_syntax_tree/node/NumberLiteral.ts";
import type { Parameter } from "../abstract_syntax_tree/node/Parameter.ts";
import type { ParameterList } from "../abstract_syntax_tree/node/ParameterList.ts";
import type { ParameterValueList } from "../abstract_syntax_tree/node/ParameterValueList.ts";
import type { PartialArrayDimension } from "../abstract_syntax_tree/node/PartialArrayDimension.ts";
import type { SingleClassId } from "../abstract_syntax_tree/node/SingleClassId.ts";
import type { SingleMapOutputValue } from "../abstract_syntax_tree/node/SingleMapOutputValue.ts";
import type { StringDefinition } from "../abstract_syntax_tree/node/StringDefinition.ts";
import type { StringLiteral } from "../abstract_syntax_tree/node/StringLiteral.ts";
import type { SwitchCaseClause } from "../abstract_syntax_tree/node/SwitchCaseClause.ts";
import type { SwitchDefaultClause } from "../abstract_syntax_tree/node/SwitchDefaultClause.ts";
import type { SwitchStatement } from "../abstract_syntax_tree/node/SwitchStatement.ts";
import type { WhileStatement } from "../abstract_syntax_tree/node/WhileStatement.ts";
import type { TokenKind } from "../tokenizer/enum/token_kind.ts";
import { getAdditiveExpressionPattern } from "./syntax_patterns/additive_expression_pattern.ts";
import { getAggregateMapOutputValuePattern } from "./syntax_patterns/aggregate_map_output_value_pattern.ts";
import { getAlignedModifierPattern } from "./syntax_patterns/aligned_modifier_pattern.ts";
import { getArrayDefinitionPattern } from "./syntax_patterns/array_definition_pattern.ts";
import { getArrayElementAccessPattern } from "./syntax_patterns/array_element_access_pattern.ts";
import { getArrayElementTypePattern } from "./syntax_patterns/array_element_type_pattern.ts";
import { getAssignmentExpressionPattern } from "./syntax_patterns/assignment_expression_pattern.ts";
import { getBitModifierPattern } from "./syntax_patterns/bit_modifier_pattern.ts";
import { getBitwiseExpressionPattern } from "./syntax_patterns/bitwise_expression_pattern.ts";
import { getClassDeclarationPattern } from "./syntax_patterns/class_declaration_pattern.ts";
import { getClassDefinitionPattern } from "./syntax_patterns/class_definition_pattern.ts";
import { getClassIdRangePattern } from "./syntax_patterns/class_id_range_pattern.ts";
import { getClassMemberAccessPattern } from "./syntax_patterns/class_member_access_pattern.ts";
import { getCompoundStatementPattern } from "./syntax_patterns/compound_statement_pattern.ts";
import { getComputedArrayDefinitionPattern } from "./syntax_patterns/computed_array_definition_pattern.ts";
import { getComputedElementaryTypeDefinitionPattern } from "./syntax_patterns/computed_elementary_type_definition_pattern.ts";
import { getDoStatementPattern } from "./syntax_patterns/do_statement_pattern.ts";
import { getElementaryTypeDefinitionPattern } from "./syntax_patterns/elementary_type_definition_pattern.ts";
import { getElementaryTypePattern } from "./syntax_patterns/elementary_type_pattern.ts";
import { getElseClausePattern } from "./syntax_patterns/else_clause_pattern.ts";
import { getElseIfClausePattern } from "./syntax_patterns/else_if_clause_pattern.ts";
import { getEqualityExpressionPattern } from "./syntax_patterns/equality_expression_pattern.ts";
import { getExpandableModifierPattern } from "./syntax_patterns/expandable_modifier_pattern.ts";
import { getExplicitArrayDimensionPattern } from "./syntax_patterns/explicit_array_dimension_pattern.ts";
import { getExpressionPattern } from "./syntax_patterns/expression_pattern.ts";
import { getExpressionStatementPattern } from "./syntax_patterns/expression_statement_pattern.ts";
import { getExtendedClassIdRangePattern } from "./syntax_patterns/extended_class_id_range_pattern.ts";
import { getExtendsModifierPattern } from "./syntax_patterns/extends_modifier_pattern.ts";
import { getForStatementPattern } from "./syntax_patterns/for_statement_pattern.ts";
import { getIdentifierPattern } from "./syntax_patterns/identifier_pattern.ts";
import { getIfClausePattern } from "./syntax_patterns/if_clause_pattern.ts";
import { getIfStatementPattern } from "./syntax_patterns/if_statement_pattern.ts";
import { getImplicitArrayDimensionPattern } from "./syntax_patterns/implicit_array_dimension_pattern.ts";
import { getLengthAttributePattern } from "./syntax_patterns/length_attribute_pattern.ts";
import { getLengthofExpressionPattern } from "./syntax_patterns/lengthof_expression_pattern.ts";
import { getMapDeclarationPattern } from "./syntax_patterns/map_declaration_pattern.ts";
import { getMapDefinitionPattern } from "./syntax_patterns/map_definition_pattern.ts";
import { getMapEntryListPattern } from "./syntax_patterns/map_entry_list_pattern.ts";
import { getMapEntryPattern } from "./syntax_patterns/map_entry_pattern.ts";
import { getMultiplicativeExpressionPattern } from "./syntax_patterns/multiplicative_expression_pattern.ts";
import { getNumberLiteralPattern } from "./syntax_patterns/number_literal_pattern.ts";
import { getParameterListPattern } from "./syntax_patterns/parameter_list_pattern.ts";
import { getParameterPattern } from "./syntax_patterns/parameter_pattern.ts";
import { getParameterValueListPattern } from "./syntax_patterns/parameter_value_list_pattern.ts";
import { getPartialArrayDimensionPattern } from "./syntax_patterns/partial_array_dimension_pattern.ts";
import { getPostfixExpressionPattern } from "./syntax_patterns/postfix_expression_pattern.ts";
import { getPrimaryExpressionPattern } from "./syntax_patterns/primary_expression_pattern.ts";
import { getRelationalExpressionPattern } from "./syntax_patterns/relational_expression_pattern.ts";
import { getShiftExpressionPattern } from "./syntax_patterns/shift_expression_pattern.ts";
import { getSingleClassIdPattern } from "./syntax_patterns/single_class_id_pattern.ts";
import { getSingleMapOutputValueRulePattern } from "./syntax_patterns/single_map_output_value_pattern.ts";
import { getSpecificationPattern } from "./syntax_patterns/specification_pattern.ts";
import { getStatementPattern } from "./syntax_patterns/statement_pattern.ts";
import { getStringDefinitionPattern } from "./syntax_patterns/string_definition_rule.ts";
import { getStringLiteralPattern } from "./syntax_patterns/string_literal_rule.ts";
import { getSwitchCaseClausePattern } from "./syntax_patterns/switch_case_clause_pattern.ts";
import { getSwitchDefaultClausePattern } from "./syntax_patterns/switch_default_clause_pattern.ts";
import { getSwitchStatementPattern } from "./syntax_patterns/switch_statement_pattern.ts";
import { getUnaryExpressionPattern } from "./syntax_patterns/unary_expression_pattern.ts";
import { getWhileStatementPattern } from "./syntax_patterns/while_statement_pattern.ts";

export const ADDITIVE_EXPRESSION_RULE = rule<TokenKind, AbstractNode>();
export const AGGREGATE_MAP_OUTPUT_VALUE_RULE = rule<
  TokenKind,
  AggregateMapOutputValue
>();
export const ALIGNED_MODIFIER_RULE = rule<TokenKind, AlignedModifier>();
export const ARRAY_DEFINITION_RULE = rule<TokenKind, ArrayDefinition>();
export const ARRAY_ELEMENT_ACCESS_RULE = rule<TokenKind, AbstractNode>();
export const ARRAY_ELEMENT_TYPE_RULE = rule<TokenKind, ArrayElementType>();
export const ASSIGNMENT_EXPRESSION_RULE = rule<
  TokenKind,
  BinaryExpression
>();
export const BIT_MODIFIER_RULE = rule<TokenKind, BitModifier>();
export const BITWISE_EXPRESSION_RULE = rule<TokenKind, AbstractNode>();
export const CLASS_DECLARATION_RULE = rule<TokenKind, ClassDeclaration>();
export const CLASS_DEFINITION_RULE = rule<TokenKind, ClassDefinition>();
export const CLASS_ID_RANGE_RULE = rule<TokenKind, ClassIdRange>();
export const CLASS_MEMBER_ACCESS_RULE = rule<TokenKind, AbstractNode>();
export const COMPOUND_STATEMENT_RULE = rule<TokenKind, CompoundStatement>();
export const COMPUTED_ARRAY_DEFINITION_RULE = rule<
  TokenKind,
  ComputedArrayDefinition
>();
export const COMPUTED_ELEMENTARY_TYPE_DEFINITION_RULE = rule<
  TokenKind,
  AbstractStatement
>();
export const DO_STATEMENT_RULE = rule<TokenKind, DoStatement>();
export const ELEMENTARY_TYPE_DEFINITION_RULE = rule<
  TokenKind,
  AbstractStatement
>();
export const ELEMENTARY_TYPE_RULE = rule<TokenKind, ElementaryType>();
export const ELSE_CLAUSE_RULE = rule<TokenKind, IfClause>();
export const ELSE_IF_CLAUSE_RULE = rule<TokenKind, IfClause>();
export const EQUALITY_EXPRESSION_RULE = rule<TokenKind, AbstractNode>();
export const EXPANDABLE_MODIFIER_RULE = rule<TokenKind, ExpandableModifier>();
export const EXPLICIT_ARRAY_DIMENSION_RULE = rule<
  TokenKind,
  ExplicitArrayDimension
>();
export const EXPRESSION_RULE = rule<TokenKind, AbstractNode>();
export const EXPRESSION_STATEMENT_RULE = rule<TokenKind, ExpressionStatement>();
export const EXTENDED_CLASS_ID_RANGE_RULE = rule<
  TokenKind,
  ExtendedClassIdRange
>();
export const EXTENDS_MODIFIER_RULE = rule<TokenKind, ExtendsModifier>();
export const FOR_STATEMENT_RULE = rule<TokenKind, ForStatement>();
export const IDENTIFIER_RULE = rule<TokenKind, Identifier>();
export const IF_STATEMENT_RULE = rule<TokenKind, IfStatement>();
export const IF_CLAUSE_RULE = rule<TokenKind, IfClause>();
export const IMPLICIT_ARRAY_DIMENSION_RULE = rule<
  TokenKind,
  ImplicitArrayDimension
>();
export const LENGTH_ATTRIBUTE_RULE = rule<TokenKind, LengthAttribute>();
export const LENGTHOF_EXPRESSION_RULE = rule<TokenKind, AbstractExpression>();
export const MAP_DECLARATION_RULE = rule<TokenKind, MapDeclaration>();
export const MAP_DEFINITION_RULE = rule<TokenKind, MapDefinition>();
export const MAP_ENTRY_LIST_RULE = rule<TokenKind, MapEntryList>();
export const MAP_ENTRY_RULE = rule<TokenKind, MapEntry>();
export const MULTIPLICATIVE_EXPRESSION_RULE = rule<
  TokenKind,
  AbstractNode
>();
export const NUMBER_LITERAL_RULE = rule<TokenKind, NumberLiteral>();
export const PARAMETER_LIST_RULE = rule<TokenKind, ParameterList>();
export const PARAMETER_RULE = rule<TokenKind, Parameter>();
export const PARAMETER_VALUE_LIST_RULE = rule<TokenKind, ParameterValueList>();
export const PARTIAL_ARRAY_DIMENSION_RULE = rule<
  TokenKind,
  PartialArrayDimension
>();
export const POSTFIX_EXPRESSION_RULE = rule<TokenKind, AbstractNode>();
export const PRIMARY_EXPRESSION_RULE = rule<TokenKind, AbstractNode>();
export const RELATIONAL_EXPRESSION_RULE = rule<TokenKind, AbstractNode>();
export const SHIFT_EXPRESSION_RULE = rule<TokenKind, AbstractNode>();
export const SINGLE_CLASS_ID_RULE = rule<TokenKind, SingleClassId>();
export const SINGLE_MAP_OUTPUT_VALUE_RULE = rule<
  TokenKind,
  SingleMapOutputValue
>();
export const SPECIFICATION_RULE = rule<TokenKind, Specification>();
export const STATEMENT_RULE = rule<TokenKind, AbstractStatement>();
export const STRING_DEFINITION_RULE = rule<TokenKind, StringDefinition>();
export const STRING_LITERAL_RULE = rule<TokenKind, StringLiteral>();
export const SWITCH_CASE_CLAUSE_RULE = rule<TokenKind, SwitchCaseClause>();
export const SWITCH_DEFAULT_CLAUSE_RULE = rule<
  TokenKind,
  SwitchDefaultClause
>();
export const SWITCH_STATEMENT_RULE = rule<TokenKind, SwitchStatement>();
export const UNARY_EXPRESSION_RULE = rule<TokenKind, AbstractNode>();
export const WHILE_STATEMENT_RULE = rule<TokenKind, WhileStatement>();

export function initRules() {
  ADDITIVE_EXPRESSION_RULE.setPattern(getAdditiveExpressionPattern());
  AGGREGATE_MAP_OUTPUT_VALUE_RULE.setPattern(
    getAggregateMapOutputValuePattern(),
  );
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
  CLASS_MEMBER_ACCESS_RULE.setPattern(getClassMemberAccessPattern());
  COMPOUND_STATEMENT_RULE.setPattern(getCompoundStatementPattern());
  COMPUTED_ARRAY_DEFINITION_RULE.setPattern(
    getComputedArrayDefinitionPattern(),
  );
  COMPUTED_ELEMENTARY_TYPE_DEFINITION_RULE.setPattern(
    getComputedElementaryTypeDefinitionPattern(),
  );
  DO_STATEMENT_RULE.setPattern(getDoStatementPattern());
  ELEMENTARY_TYPE_DEFINITION_RULE.setPattern(
    getElementaryTypeDefinitionPattern(),
  );
  ELEMENTARY_TYPE_RULE.setPattern(getElementaryTypePattern());
  ELSE_CLAUSE_RULE.setPattern(getElseClausePattern());
  ELSE_IF_CLAUSE_RULE.setPattern(getElseIfClausePattern());
  EQUALITY_EXPRESSION_RULE.setPattern(getEqualityExpressionPattern());
  EXPANDABLE_MODIFIER_RULE.setPattern(getExpandableModifierPattern());
  EXPLICIT_ARRAY_DIMENSION_RULE.setPattern(getExplicitArrayDimensionPattern());
  EXPRESSION_RULE.setPattern(getExpressionPattern());
  EXPRESSION_STATEMENT_RULE.setPattern(getExpressionStatementPattern());
  EXTENDED_CLASS_ID_RANGE_RULE.setPattern(getExtendedClassIdRangePattern());
  EXTENDS_MODIFIER_RULE.setPattern(getExtendsModifierPattern());
  FOR_STATEMENT_RULE.setPattern(getForStatementPattern());
  IDENTIFIER_RULE.setPattern(getIdentifierPattern());
  IF_CLAUSE_RULE.setPattern(getIfClausePattern());
  IF_STATEMENT_RULE.setPattern(getIfStatementPattern());
  IMPLICIT_ARRAY_DIMENSION_RULE.setPattern(getImplicitArrayDimensionPattern());
  LENGTH_ATTRIBUTE_RULE.setPattern(getLengthAttributePattern());
  LENGTHOF_EXPRESSION_RULE.setPattern(getLengthofExpressionPattern());
  MAP_DECLARATION_RULE.setPattern(getMapDeclarationPattern());
  MAP_DEFINITION_RULE.setPattern(getMapDefinitionPattern());
  MAP_ENTRY_LIST_RULE.setPattern(getMapEntryListPattern());
  MAP_ENTRY_RULE.setPattern(getMapEntryPattern());
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
  SINGLE_CLASS_ID_RULE.setPattern(getSingleClassIdPattern());
  SINGLE_MAP_OUTPUT_VALUE_RULE.setPattern(getSingleMapOutputValueRulePattern());
  SPECIFICATION_RULE.setPattern(getSpecificationPattern());
  STATEMENT_RULE.setPattern(getStatementPattern());
  STRING_DEFINITION_RULE.setPattern(getStringDefinitionPattern());
  STRING_LITERAL_RULE.setPattern(getStringLiteralPattern());
  SWITCH_CASE_CLAUSE_RULE.setPattern(getSwitchCaseClausePattern());
  SWITCH_DEFAULT_CLAUSE_RULE.setPattern(getSwitchDefaultClausePattern());
  SWITCH_STATEMENT_RULE.setPattern(getSwitchStatementPattern());
  UNARY_EXPRESSION_RULE.setPattern(getUnaryExpressionPattern());
  WHILE_STATEMENT_RULE.setPattern(getWhileStatementPattern());
}
