/**
 * Enum representing different kinds of nodes.
 */
export enum NodeKind {
  /** Output value node */
  AGGREGATE_OUTPUT_VALUE,
  /** Aligned modifier node */
  ALIGNED_MODIFIER,
  /** Array dimension node */
  ARRAY_DIMENSION,
  /** Array element access node */
  ARRAY_ELEMENT_ACCESS,
  /** Bit modifier node */
  BIT_MODIFIER,
  /** Class ID node */
  CLASS_ID,
  /** Class member access node */
  CLASS_MEMBER_ACCESS,
  /** Elementary type node */
  ELEMENTARY_TYPE,
  /** Expandable modifier node */
  EXPANDABLE_MODIFIER,
  /** Expression node */
  EXPRESSION,
  /** Extends modifier node */
  EXTENDS_MODIFIER,
  /** Identifier node */
  IDENTIFIER,
  /** Length attribute node */
  LENGTH_ATTRIBUTE,
  /** Map entry node */
  MAP_ENTRY,
  /** Number literal node */
  NUMBER_LITERAL,
  /** Parameter node */
  PARAMETER,
  /** Parameter list node */
  PARAMETER_LIST,
  /** Parameter value list node */
  PARAMETER_VALUE_LIST,
  /** Specification node */
  SPECIFICATION,
  /** Statement node */
  STATEMENT,
  /** String literal node */
  STRING_LITERAL,
  /** Switch case clause node */
  SWITCH_CASE_CLAUSE,
  /** Switch default clause node */
  SWITCH_DEFAULT_CLAUSE,
}
