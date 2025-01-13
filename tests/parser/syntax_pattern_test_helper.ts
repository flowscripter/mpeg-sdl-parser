import {
  expectEOF,
  expectSingleResult,
  kleft,
  Rule,
  rule,
} from "../../deps.ts";
import AbstractNode from "../../src/abstract_syntax_tree/node/AbstractNode.ts";
import { initRules } from "../../src/parser/syntax_rules.ts";
import TokenKind from "../../src/tokenizer/enum/token_kind.ts";
import { getToken } from "../../src/tokenizer/parsec/ParsecTokenWrapper.ts";
import Tokenizer from "../../src/tokenizer/Tokenizer.ts";
import { assertEquals } from "../test_deps.ts";

function testSyntaxPattern(
  patternToTest: Rule<TokenKind, AbstractNode>,
  input: string,
  expected: AbstractNode,
): void {
  initRules();

  const tokenizer = new Tokenizer();
  const token = tokenizer.parse(input);
  const TEST_RULE = rule<TokenKind, AbstractNode>();

  TEST_RULE.setPattern(
    kleft(
      patternToTest,
      getToken(TokenKind.EOF_TOKEN),
    ),
  );

  const actual = expectSingleResult(
    expectEOF(
      TEST_RULE.parse(token),
    ),
  );

  assertEquals(actual, expected);
}

export default testSyntaxPattern;
