import {
  expectEOF,
  expectSingleResult,
  type TokenError,
} from "typescript-parsec";
import type { Specification } from "../abstract_syntax_tree/node/Specification.ts";
import { Tokenizer } from "../tokenizer/Tokenizer.ts";
import {
  InternalParserError,
  LexicalParserError,
} from "../util/ParserError.ts";
import * as rules from "./syntax_rules.ts";

/**
 * The `Parser` class is responsible for parsing a given specification string
 * into a `Specification` object. It utilizes a `Tokenizer` to tokenize the input
 * string and applies parsing rules to generate the final specification.
 */
export class Parser {
  private tokenizer: Tokenizer;

  /**
   * Constructs a new instance of the Parser class.
   * Initializes the tokenizer and sets up the parsing rules.
   */
  constructor() {
    this.tokenizer = new Tokenizer();

    rules.initRules();
  }

  /**
   * Parses the given specification string and returns a Specification object.
   *
   * @param specificationString - The string containing the specification to be parsed.
   * @returns The parsed Specification object.
   * @throws {InternalParserError} If an unexpected error occurs during parsing.
   * @throws {LexicalParserError} If a lexical error occurs during parsing, providing the error message and location.
   */
  public parse(specificationString: string): Specification {
    const token = this.tokenizer.parse(specificationString);

    try {
      return expectSingleResult(
        expectEOF(
          rules.SPECIFICATION_RULE.parse(token),
        ),
      );
    } catch (error) {
      if (!(error instanceof Error)) {
        throw new InternalParserError(
          "Unexpected error: " + JSON.stringify(error),
        );
      }

      const tokenError = error as TokenError;

      if (!tokenError.errorMessage) {
        throw new InternalParserError(
          "Unexpected error: " + tokenError.message,
        );
      }

      if (!tokenError.pos) {
        throw new InternalParserError(
          "Unexpected error: " + tokenError.errorMessage,
        );
      }

      const location = {
        row: tokenError.pos.rowBegin,
        column: tokenError.pos.columnBegin,
        position: tokenError.pos.index,
      };

      throw new LexicalParserError(tokenError.errorMessage, location);
    }
  }
}
