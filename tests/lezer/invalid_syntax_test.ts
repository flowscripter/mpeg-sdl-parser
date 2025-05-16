import { describe, expect, test } from "bun:test";

import { createStrictSdlParser } from "../../src/lezer/createSdlParser.ts";
import SdlStringInput from "../../src/lezer/SdlStringInput.ts";

const sdlParser = await createStrictSdlParser();

describe("Invalid Syntax Tests", () => {
  // TODO: add all of these to the collate errors tests and ensure error includes: missing or unexpected token

  test("No declarations fails to parse", () => {
    const sdlStringInput = new SdlStringInput("");

    expect(() => sdlParser.parse(sdlStringInput)).toThrow(
      "SYNTACTIC ERROR: Parse error => { row: 1, column: 1, position: 0}",
    );
  });

  test("No class parameter values in parenthesis fails to parse", () => {
    const sdlStringInput = new SdlStringInput("class A {ClassD d();}");

    expect(() => sdlParser.parse(sdlStringInput)).toThrow(
      "SYNTACTIC ERROR: Parse error => { row: 1, column: 19, position: 18}",
    );
  });

  test("Trailing comma in class parameter values fails to parse", () => {
    const sdlStringInput = new SdlStringInput("class A {ClassD d(3,);}");

    expect(() => sdlParser.parse(sdlStringInput)).toThrow(
      "SYNTACTIC ERROR: Parse error => { row: 1, column: 21, position: 20}",
    );
  });

  test("Mix of concatenated stting literal types fails to parse", () => {
    const sdlStringInput = new SdlStringInput(
      'class A {utf8string d = "hello" u"world";}',
    );

    expect(() => sdlParser.parse(sdlStringInput)).toThrow(
      "SYNTACTIC ERROR: Parse error => { row: 1, column: 21, position: 20}",
    );
  });

  test("Both legacy and reserved together fails to parse", () => {
    const sdlStringInput = new SdlStringInput(
      "class A {reserved legacy utfstring foo;}",
    );

    expect(() => sdlParser.parse(sdlStringInput)).toThrow(
      "SYNTACTIC ERROR: Parse error => { row: 1, column: 19, position: 18}",
    );
  });

  test("Invalid UTF string literal type fails to parse", () => {
    const sdlStringInput = new SdlStringInput(
      'class A {base64string foo = u"aGVsbG8K";}',
    );

    expect(() => sdlParser.parse(sdlStringInput)).toThrow(
      "SYNTACTIC ERROR: Parse error => { row: 1, column: 29, position: 28}",
    );
  });

  test("Invalid basic string literal type fails to parse", () => {
    const sdlStringInput = new SdlStringInput(
      'class A {utf8string foo = "hello";}',
    );

    expect(() => sdlParser.parse(sdlStringInput)).toThrow(
      "SYNTACTIC ERROR: Parse error => { row: 1, column: 27, position: 26}",
    );
  });

  test("Invalid prefix for string literal", () => {
    const sdlStringInput = new SdlStringInput(
      'class A {utf8string foo = u8"hello";}',
    );

    expect(() => sdlParser.parse(sdlStringInput)).toThrow(
      "SYNTACTIC ERROR: Parse error => { row: 1, column: 28, position: 27}",
    );
  });

  test("Illegal alignment bit count value fails to parse", () => {
    const sdlStringInput = new SdlStringInput(
      "class A {aligned(17) utf8string foo;}",
    );

    expect(() => sdlParser.parse(sdlStringInput)).toThrow(
      "SYNTACTIC ERROR: Parse error => { row: 1, column: 18, position: 17}",
    );
  });
});
