import { expectEOF, expectSingleResult } from "../../deps.ts";
import * as rules from "./rules.ts";
import Tokenizer from "../tokenizer/tokenizer.ts";
import * as ast from "../abstract_syntax_tree/abstract_syntax_tree.ts";

export function parse(definition: string): ast.Definition {
  const tokenizer = new Tokenizer();
  const token = tokenizer.parse(definition);

  return expectSingleResult(
    expectEOF(rules.DEFINITION_RULE.parse(token)),
  );
}
