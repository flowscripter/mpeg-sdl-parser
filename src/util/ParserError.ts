import type { SyntaxToken } from "../tokenizer/token/SyntaxToken.ts";
import type { Location } from "../tokenizer/token/Location.ts";

/**
 * Base error class.
 */
abstract class ParserError extends Error {
  protected constructor(
    public errorMessage: string,
    public location?: Location,
    public token?: SyntaxToken,
  ) {
    super(
      errorMessage +
        (location
          ? ` => { row: ${location.row}, column: ${location.column}, position: ${location.position} }`
          : "") +
        (token ? ` => ${token}` : ""),
    );
  }
}

/**
 * Indicates an internal logic error in the parsing implementation.
 */
export class InternalParserError extends ParserError {
  constructor(errorMessage: string, token?: SyntaxToken) {
    super(`INTERNAL ERROR: ${errorMessage}`, token?.location, token);
  }
}

/**
 * Indicates a lexical error when parsing.
 */
export class LexicalParserError extends ParserError {
  constructor(errorMessage: string, location: Location) {
    super(`LEXICAL ERROR: ${errorMessage}`, location);
  }
}

/**
 * Indicates a syntactic error when parsing.
 */
export class SyntacticParserError extends ParserError {
  constructor(errorMessage: string, token?: SyntaxToken) {
    super(`SYNTACTIC ERROR: ${errorMessage}`, token?.location, token);
  }
}

/**
 * Indicates a semantic error when parsing.
 */
export class SemanticParserError extends ParserError {
  constructor(errorMessage: string, token?: SyntaxToken) {
    super(`SEMANTIC ERROR: ${errorMessage}`, token?.location, token);
  }
}
