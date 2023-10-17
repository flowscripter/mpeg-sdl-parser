import { expectEOF, expectSingleResult } from "../deps.ts";
import * as rules from "./rules.ts";
import tokenizer from "./tokenizer/tokenizer.ts";
import * as ast from "./abstract_syntax_tree/abstract_syntax_tree.ts";

export function parse(definition: string): ast.Definition {
  return expectSingleResult(
    expectEOF(rules.DEFINITION_PARSER.parse(tokenizer.parse(definition))),
  );
}
