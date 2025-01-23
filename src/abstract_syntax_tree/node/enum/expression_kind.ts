/**
 * Enum representing different kinds of expressions.
 */
enum ExpressionKind {
  /** Binary expression */
  BINARY,
  /** Length of expression */
  LENGTH_OF,
  /** Postfix expression */
  POSTFIX,
  /** Primary expression */
  PRIMARY,
  /** Unary expression */
  UNARY,
}

export default ExpressionKind;
