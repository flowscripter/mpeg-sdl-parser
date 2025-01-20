import { expectEOF, expectSingleResult, TokenError } from "../../deps.ts";
import Specification from "../abstract_syntax_tree/node/Specification.ts";
import Tokenizer from "../tokenizer/Tokenizer.ts";
import {
  InternalParserError,
  LexicalParserError,
} from "../util/ParserError.ts";
import * as rules from "./syntax_rules.ts";

class Parser {
  private tokenizer: Tokenizer;

  constructor() {
    this.tokenizer = new Tokenizer();

    rules.initRules();
  }

  parse(specificationString: string): Specification {
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

      // note that the Parsec position has 1-based row and column values
      const location = {
        row: tokenError.pos.rowBegin - 1,
        column: tokenError.pos.columnBegin - 1,
        position: tokenError.pos.index,
      };

      throw new LexicalParserError(tokenError.errorMessage, location);
    }
  }
}

export default Parser;
