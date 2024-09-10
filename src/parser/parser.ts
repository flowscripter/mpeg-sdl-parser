import { expectEOF, expectSingleResult } from "../../deps.ts";
import * as parserRules from "./parser_rules.ts";
import Tokenizer from "../tokenizer/tokenizer.ts";
import Specification from "../abstract_syntax_tree/node/Specification.ts";

export function parse(definition: string): Specification {
  const tokenizer = new Tokenizer();
  const token = tokenizer.parse(definition);

  // TODO: wrap in own errors => specifically catch Parsec Error and convert to Syntax Error
  //  error: Error: {"index":6,"rowBegin":1,"columnBegin":7,"rowEnd":1,"columnEnd":8}: The parser cannot reach the end of file, stops at "." at position {"index":6,"rowBegin":1,"columnBegin":7,"rowEnd":1,"columnEnd":8}.
  return expectSingleResult(
    expectEOF(parserRules.SPECIFICATION_RULE.parse(token)),
  );
}
