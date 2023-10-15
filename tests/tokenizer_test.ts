import { assertNotEquals, assertStrictEquals } from "./test_deps.ts";
import tokenizer from "../src/tokenizer.ts";
import TokenKind from "../src/token_kind.ts";

function testTokenizer(
  input: string,
  expectedTokens: [TokenKind, string][],
): void {
  let token = tokenizer.parse(input);
  assertNotEquals(token, undefined);

  for (const expectedToken of expectedTokens) {
    assertNotEquals(token, undefined);
    assertStrictEquals(
      token!.kind,
      expectedToken[0],
      `${TokenKind[token!.kind]} != ${TokenKind[expectedToken[0]]}`,
    );
    assertStrictEquals(token!.text, expectedToken[1]);
    token = token!.next;
  }
  assertStrictEquals(token, undefined);
}

Deno.test("Test whitespace token is ignored", () => {
  const input = "\r\n   \t";
  const token = tokenizer.parse(input);

  assertStrictEquals(token, undefined);
});

Deno.test("Test comment token is ignored", () => {
  const input = "// ignore me";
  const token = tokenizer.parse(input);

  assertStrictEquals(token, undefined);
});

Deno.test("Test value tokens", () => {
  const input = "0b0 0b010101 0b0101.0101 0b0101.0101.01 " +
    "0xA 0xAB01AB 0xAB01.AB01 0xAB01.AB01.AB " +
    "1 123 0 -1 " +
    "0.1 1.1 1.1e1 1.1e-1 -0.1 -1.1 -1.1e1 -1.1e-1";
  const expected: [TokenKind, string][] = [
    [TokenKind.ValueBinary, "0b0"],
    [TokenKind.ValueBinary, "0b010101"],
    [TokenKind.ValueBinary, "0b0101.0101"],
    [TokenKind.ValueBinary, "0b0101.0101.01"],
    [TokenKind.ValueHexadecimal, "0xA"],
    [TokenKind.ValueHexadecimal, "0xAB01AB"],
    [TokenKind.ValueHexadecimal, "0xAB01.AB01"],
    [TokenKind.ValueHexadecimal, "0xAB01.AB01.AB"],
    [TokenKind.ValuePositiveInteger, "1"],
    [TokenKind.ValuePositiveInteger, "123"],
    [TokenKind.ValueInteger, "0"],
    [TokenKind.ValueInteger, "-1"],
    [TokenKind.ValueFloat, "0.1"],
    [TokenKind.ValueFloat, "1.1"],
    [TokenKind.ValueFloat, "1.1e1"],
    [TokenKind.ValueFloat, "1.1e-1"],
    [TokenKind.ValueFloat, "-0.1"],
    [TokenKind.ValueFloat, "-1.1"],
    [TokenKind.ValueFloat, "-1.1e1"],
    [TokenKind.ValueFloat, "-1.1e-1"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test string literal tokens", () => {
  const input = "\"Hello πό\"\"\uFEFFHello πό\"\"R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=\"";
  const expected: [TokenKind, string][] = [
    [TokenKind.StringLiteral, "\"Hello πό\""],
    [TokenKind.StringLiteral, "\"\uFEFFHello πό\""],
    [TokenKind.StringLiteral, "\"R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=\""],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test operator tokens with and without whitespace", () => {
  // whitespace added where necessary to avoid operator aliasing
  let input = "++--*/%+-<<>>< <=> >===!=&|&&||...=";
  const expected: [TokenKind, string][] = [
    [TokenKind.OperatorPostfixIncrement, "++"],
    [TokenKind.OperatorPostfixDecrement, "--"],
    [TokenKind.OperatorMultiply, "*"],
    [TokenKind.OperatorDivide, "/"],
    [TokenKind.OperatorModulus, "%"],
    [TokenKind.OperatorAdd, "+"],
    [TokenKind.OperatorSubtract, "-"],
    [TokenKind.OperatorShiftLeft, "<<"],
    [TokenKind.OperatorShiftRight, ">>"],
    [TokenKind.OperatorLessThan, "<"],
    [TokenKind.OperatorLessThanOrEqual, "<="],
    [TokenKind.OperatorGreaterThan, ">"],
    [TokenKind.OperatorGreaterThanOrEqual, ">="],
    [TokenKind.OperatorEqual, "=="],
    [TokenKind.OperatorNotEqual, "!="],
    [TokenKind.OperatorBinaryAnd, "&"],
    [TokenKind.OperatorBinaryOr, "|"],
    [TokenKind.OperatorLogicalAnd, "&&"],
    [TokenKind.OperatorLogicalOr, "||"],
    [TokenKind.OperatorRange, ".."],
    [TokenKind.OperatorClassMemberAccess, "."],
    [TokenKind.OperatorAssignment, "="],
  ];

  testTokenizer(input, expected);

  input = "++ -- * / % + - << >> < <= > >= == != & | && || .. . =";

  testTokenizer(input, expected);
});

Deno.test("Test punctuator tokens with and without whitespace", () => {
  let input = '(){}[]:;,';
  const expected: [TokenKind, string][] = [
    [TokenKind.PunctuatorOpenParenthesis, "("],
    [TokenKind.PunctuatorCloseParenthesis, ")"],
    [TokenKind.PunctuatorOpenBrace, "{"],
    [TokenKind.PunctuatorCloseBrace, "}"],
    [TokenKind.PunctuatorOpenBracket, "["],
    [TokenKind.PunctuatorCloseBracket, "]"],
    [TokenKind.PunctuatorColon, ":"],
    [TokenKind.PunctuatorSemicolon, ";"],
    [TokenKind.PunctuatorComma, ","]
  ];

  testTokenizer(input, expected);

  input = '( ) { } [ ] : ; ,';

  testTokenizer(input, expected);
});

Deno.test("Test keyword tokens", () => {
  const input =
    "abstract aligned base64string bit break case class const default do else expandable extends " +
    "float for if int lengthof map switch type unsigned utf8string utf8list utfstring while";
  const expected: [TokenKind, string][] = [
    [TokenKind.KeywordAbstract, "abstract"],
    [TokenKind.KeywordAligned, "aligned"],
    [TokenKind.KeywordBase64String, "base64string"],
    [TokenKind.KeywordBit, "bit"],
    [TokenKind.KeywordBreak, "break"],
    [TokenKind.KeywordCase, "case"],
    [TokenKind.KeywordClass, "class"],
    [TokenKind.KeywordConst, "const"],
    [TokenKind.KeywordDefault, "default"],
    [TokenKind.KeywordDo, "do"],
    [TokenKind.KeywordElse, "else"],
    [TokenKind.KeywordExpandable, "expandable"],
    [TokenKind.KeywordExtends, "extends"],
    [TokenKind.KeywordFloat, "float"],
    [TokenKind.KeywordFor, "for"],
    [TokenKind.KeywordIf, "if"],
    [TokenKind.KeywordInt, "int"],
    [TokenKind.KeywordLengthof, "lengthof"],
    [TokenKind.KeywordMap, "map"],
    [TokenKind.KeywordSwitch, "switch"],
    [TokenKind.KeywordType, "type"],
    [TokenKind.KeywordUnsigned, "unsigned"],
    [TokenKind.KeywordUtf8String, "utf8string"],
    [TokenKind.KeywordUtf8List, "utf8list"],
    [TokenKind.KeywordUtfString, "utfstring"],
    [TokenKind.KeywordWhile, "while"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Test identifier token", () => {
  const input = "helloWorld";
  const expected: [TokenKind, string][] = [
    [TokenKind.Identifier, "helloWorld"],
  ];

  testTokenizer(input, expected);
});

Deno.test("Mixture of tokens", () => {
  const input = "for (i=0; i < size; i++) {\n";
  const expected: [TokenKind, string][] = [
    [TokenKind.KeywordFor, "for"],
    [TokenKind.PunctuatorOpenParenthesis, "("],
    [TokenKind.Identifier, "i"],
    [TokenKind.OperatorAssignment, "="],
    [TokenKind.ValueInteger, "0"],
    [TokenKind.PunctuatorSemicolon, ";"],
    [TokenKind.Identifier, "i"],
    [TokenKind.OperatorLessThan, "<"],
    [TokenKind.Identifier, "size"],
    [TokenKind.PunctuatorSemicolon, ";"],
    [TokenKind.Identifier, "i"],
    [TokenKind.OperatorPostfixIncrement, "++"],
    [TokenKind.PunctuatorCloseParenthesis, ")"],
    [TokenKind.PunctuatorOpenBrace, "{"],
  ];

  testTokenizer(input, expected);
});
