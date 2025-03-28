/**
 * Enum representing different kinds of nodes.
 */
export enum NodeKind {
  /** Aligned modifier node */
  ALIGNED_MODIFIER,
  /** Array dimension node */
  ARRAY_DIMENSION,
  /** Array element access node */
  ARRAY_ELEMENT_ACCESS,
  /** Array element type node */
  ARRAY_ELEMENT_TYPE,
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
  /** If clause node */
  IF_CLAUSE,
  /** Length attribute node */
  LENGTH_ATTRIBUTE,
  /** Map entry node */
  MAP_ENTRY,
  /** Map entry list node */
  MAP_ENTRY_LIST,
  /** Map output value node */
  MAP_OUTPUT_VALUE,
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
