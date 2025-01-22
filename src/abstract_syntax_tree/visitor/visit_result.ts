/**
 * Enum representing the possible results of a visit operation.
 */
enum VisitResult {
  /**
   * Continue visiting nodes.
   */
  CONTINUE,

  /**
   * Skip visiting the current node's children or siblings.
   */
  SKIP,

  /**
   * Stop visiting nodes.
   */
  STOP,
}

export default VisitResult;
