enum NodeKind {
  COMMENT,
  IDENTIFIER,
  NUMBER_LITERAL,
  STRING_LITERAL,
  UNARY_OPERATOR,
  POSTFIX_OPERATOR,
  UNARY_EXPRESSION,
  MULTIPLICATiVE_EXPRESSION,
  ADDITIVE_EXPRESSION,
  SHIFT_EXPRESSION,
  RELATIONAL_EXPRESSION,
  EQUALITY_EXPRESSION,
  BITWISE_EXPRESSION,
  BINARY_EXPRESSION,
  ASSIGNMENT_EXPRESSION,
  EXPRESSION_STATEMENT,
  CLASS_MEMBER_ACCESS_EXPRESSION, // TODO: implement support
  LENGTH_OF_EXPRESSION,
  ALIGNMENT,
  NON_PARSABLE_DEFINITION, // TODO: implement support
  PARSABLE_DEFINITION, // TODO: implement support
  MAP_DECLARATION, // TODO: implement support
  MAP_DEFINITION, // TODO: implement support
  CLASS_ID_SPECIFICATION, // TODO: implement support
  CLASS_DEFINITION_BIT_ATTRIBUTE, // TODO: implement support
  CLASS_DEFINITION_PARAMETER,
  CLASS_DECLARATION, // TODO: implement support
  STRING_DEFINITION,
  CLASS_DEFINITION, // TODO: implement support
  ELEMENTARY_TYPE_ARRAY_ITEM_TYPE, // TODO: implement support
  ARRAY_ELEMENT_ACCESS_EXPRESSION,
  ARRAY_DIMENSION, // TODO: implement support
  ARRAY_DEFINITION, // TODO: implement support
  IF_STATEMENT, // TODO: implement support
  SWITCH_STATEMENT, // TODO: implement support
  FOR_STATEMENT, // TODO: implement support
  DO_STATEMENT, // TODO: implement support
  WHILE_STATEMENT, // TODO: implement support
  COMPOUND_STATEMENT,
  SPECIFICATION,
}

export default NodeKind;
