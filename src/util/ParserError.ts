import { Token } from "../../deps.ts";
import TokenKind from "../tokenizer/enum/token_kind.ts";

/**
 * Base error class.
 */
abstract class ParserError extends Error {
  protected constructor(
    public errorMessage: string,
    public token?: Token<TokenKind>,
  ) {
    super(errorMessage + (token ? ` => ${token}` : ""));
  }
}

/**
 * Indicates an internal logic error in the parsing implementation.
 */
export class InternalParserError extends ParserError {
  constructor(public errorMessage: string, public token?: Token<TokenKind>) {
    super(`INTERNAL ERROR: ${errorMessage}`, token);
  }
}

/**
 * Indicates a syntactic error when parsing.
 */
export class SyntacticParserError extends ParserError {
  constructor(public errorMessage: string, public token: Token<TokenKind>) {
    super(`SYNTACTIC ERROR: ${errorMessage}`, token);
  }
}

/**
 * Indicates a semantic error when parsing.
 */
export class SemanticParserError extends ParserError {
  constructor(public errorMessage: string, public token: Token<TokenKind>) {
    super(`SEMANTIC ERROR: ${errorMessage}`, token);
  }
}
