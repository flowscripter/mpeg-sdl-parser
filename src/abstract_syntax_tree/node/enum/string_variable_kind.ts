/**
 * Enum representing the kinds of string variables.
 */
enum StringVariableKind {
  /**
   * Represents a UTF-8 string variable.
   */
  UTF8,
  /**
   * Represents a UTF-16 string variable.
   */
  UTF16,
  /**
   * Represents a UTF string variable.
   */
  UTF,
  /**
   * Represents a list of UTF-8 string variables.
   */
  UTF8_LIST,
  /**
   * Represents a Base64 encoded string variable.
   */
  BASE64,
}

export default StringVariableKind;
