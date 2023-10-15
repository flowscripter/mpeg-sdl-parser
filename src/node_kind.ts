enum NodeKind {
  NUMBER_VALUE,
  STRING_LITERAL,
  UNARY_OPERATOR,
  BINARY_OPERATOR,
  UNARY_EXPRESSION,
  EXPRESSION,
  IDENTIFIER,
  ASSIGNMENT_EXPRESSION,
  CLASS_MEMBER_EXPRESSION,
  LENGTH_OF_EXPRESSION,
  NON_PARSABLE_VARIABLE_DEFINITION,
  PARSABLE_VALUE_VARIABLE_DEFINITION,
  MAP_DEFINITION,
  MAP_VARIABLE_DEFINITION,
  CLASS_DEFINITION,
  UTF_STRING_LITERAL,
  STRING_VARIABLE_DEFINITION,
  CLASS_VARIABLE_DEFINITION,
  ARRAY_VARIABLE_DEFINITION,
  IF_STATEMENT,
  SWITCH_STATEMENT,
  FOR_STATEMENT,
  DO_STATEMENT,
  WHILE_STATEMENT,
  COMPOUND_STATEMENT,
  DEFINITION,
}

export default NodeKind;
