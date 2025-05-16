// import { describe, expect, test } from "bun:test";
// import { AlignedModifier } from "../../../src/ast/node/AlignedModifier.ts";
// import { NumberLiteralKind } from "../../../src/ast/node/enum/number_literal_kind.ts";
// import { StringLiteralKind } from "../../../src/ast/node/enum/string_literal_kind.ts";
// import { StringVariableKind } from "../../../src/ast/node/enum/string_variable_kind.ts";
// import { Identifier } from "../../../src/ast/node/Identifier.ts";
// import { NumberLiteral } from "../../../src/ast/node/NumberLiteral.ts";
// import { StringDefinition } from "../../../src/ast/node/StringDefinition.ts";
// import { StringLiteral } from "../../../src/ast/node/StringLiteral.ts";
// import { STRING_DEFINITION_RULE } from "../../../src/parser/syntax_rules.ts";
// import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
// import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
// import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
// import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

// // // TODO: rename all of these and port them to use new framework
// describe("String Definition Pattern Tests", () => {
//   test("Test string definition pattern", () => {
//     testSyntaxPattern(
//       STRING_DEFINITION_RULE,
//       "utf8string foo;",
//       new StringDefinition(
//         false,
//         false,
//         false,
//         undefined,
//         StringVariableKind.UTF8,
//         new Identifier(
//           "foo",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             {
//               row: 1,
//               column: 12,
//               position: 11,
//             },
//             "foo",
//             [],
//             [],
//           ),
//         ),
//         undefined,
//         undefined,
//         undefined,
//         undefined,
//         new SyntaxToken(
//           TokenKind.KEYWORD_UTF8STRING_TOKEN,
//           {
//             row: 1,
//             column: 1,
//             position: 0,
//           },
//           "utf8string",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               {
//                 row: 1,
//                 column: 11,
//                 position: 10,
//               },
//               " ",
//             ),
//           ],
//         ),
//         undefined,
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//           {
//             row: 1,
//             column: 15,
//             position: 14,
//           },
//           ";",
//           [],
//           [],
//         ),
//       ),
//     );
//   });

//   test("Test string definition pattern - const", () => {
//     testSyntaxPattern(
//       STRING_DEFINITION_RULE,
//       "const utf16string foo;",
//       new StringDefinition(
//         false,
//         false,
//         true,
//         undefined,
//         StringVariableKind.UTF16,
//         new Identifier(
//           "foo",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             {
//               row: 1,
//               column: 19,
//               position: 18,
//             },
//             "foo",
//             [],
//             [],
//           ),
//         ),
//         undefined,
//         undefined,
//         undefined,
//         new SyntaxToken(
//           TokenKind.KEYWORD_CONST_TOKEN,
//           {
//             row: 1,
//             column: 1,
//             position: 0,
//           },
//           "const",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               {
//                 row: 1,
//                 column: 6,
//                 position: 5,
//               },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.KEYWORD_UTF16STRING_TOKEN,
//           {
//             row: 1,
//             column: 7,
//             position: 6,
//           },
//           "utf16string",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               {
//                 row: 1,
//                 column: 18,
//                 position: 17,
//               },
//               " ",
//             ),
//           ],
//         ),
//         undefined,
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//           {
//             row: 1,
//             column: 22,
//             position: 21,
//           },
//           ";",
//           [],
//           [],
//         ),
//       ),
//     );
//   });

//   test("Test string definition pattern - const aligned default", () => {
//     testSyntaxPattern(
//       STRING_DEFINITION_RULE,
//       "const aligned utfstring foo;",
//       new StringDefinition(
//         false,
//         false,
//         true,
//         new AlignedModifier(
//           8,
//           true,
//           undefined,
//           new SyntaxToken(
//             TokenKind.KEYWORD_ALIGNED_TOKEN,
//             {
//               row: 1,
//               column: 7,
//               position: 6,
//             },
//             "aligned",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 {
//                   row: 1,
//                   column: 14,
//                   position: 13,
//                 },
//                 " ",
//               ),
//             ],
//           ),
//         ),
//         StringVariableKind.UTF,
//         new Identifier(
//           "foo",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             {
//               row: 1,
//               column: 25,
//               position: 24,
//             },
//             "foo",
//             [],
//             [],
//           ),
//         ),
//         undefined,
//         undefined,
//         undefined,
//         new SyntaxToken(
//           TokenKind.KEYWORD_CONST_TOKEN,
//           {
//             row: 1,
//             column: 1,
//             position: 0,
//           },
//           "const",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               {
//                 row: 1,
//                 column: 6,
//                 position: 5,
//               },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.KEYWORD_UTFSTRING_TOKEN,
//           {
//             row: 1,
//             column: 15,
//             position: 14,
//           },
//           "utfstring",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               {
//                 row: 1,
//                 column: 24,
//                 position: 23,
//               },
//               " ",
//             ),
//           ],
//         ),
//         undefined,
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//           {
//             row: 1,
//             column: 28,
//             position: 27,
//           },
//           ";",
//           [],
//           [],
//         ),
//       ),
//     );
//   });

//   test("Test string definition pattern - aligned explicit", () => {
//     testSyntaxPattern(
//       STRING_DEFINITION_RULE,
//       "aligned (16) utfstring foo;",
//       new StringDefinition(
//         false,
//         false,
//         false,
//         new AlignedModifier(
//           16,
//           false,
//           new NumberLiteral(
//             NumberLiteralKind.INTEGER,
//             16,
//             [
//               new SyntaxToken(
//                 TokenKind.LITERAL_INTEGER_TOKEN,
//                 {
//                   row: 1,
//                   column: 10,
//                   position: 9,
//                 },
//                 "16",
//                 [],
//                 [],
//               ),
//             ],
//           ),
//           new SyntaxToken(
//             TokenKind.KEYWORD_ALIGNED_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             "aligned",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 {
//                   row: 1,
//                   column: 8,
//                   position: 7,
//                 },
//                 " ",
//               ),
//             ],
//           ),
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//             {
//               row: 1,
//               column: 9,
//               position: 8,
//             },
//             "(",
//             [],
//             [],
//           ),
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//             {
//               row: 1,
//               column: 12,
//               position: 11,
//             },
//             ")",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 {
//                   row: 1,
//                   column: 13,
//                   position: 12,
//                 },
//                 " ",
//               ),
//             ],
//           ),
//         ),
//         StringVariableKind.UTF,
//         new Identifier(
//           "foo",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             {
//               row: 1,
//               column: 24,
//               position: 23,
//             },
//             "foo",
//             [],
//             [],
//           ),
//         ),
//         undefined,
//         undefined,
//         undefined,
//         undefined,
//         new SyntaxToken(
//           TokenKind.KEYWORD_UTFSTRING_TOKEN,
//           {
//             row: 1,
//             column: 14,
//             position: 13,
//           },
//           "utfstring",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               {
//                 row: 1,
//                 column: 23,
//                 position: 22,
//               },
//               " ",
//             ),
//           ],
//         ),
//         undefined,
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//           {
//             row: 1,
//             column: 27,
//             position: 26,
//           },
//           ";",
//           [],
//           [],
//         ),
//       ),
//     );
//   });

//   test("Test string definition pattern - reserved const aligned default", () => {
//     testSyntaxPattern(
//       STRING_DEFINITION_RULE,
//       "reserved const aligned utfstring foo;",
//       new StringDefinition(
//         true,
//         false,
//         true,
//         new AlignedModifier(
//           8,
//           true,
//           undefined,
//           new SyntaxToken(
//             TokenKind.KEYWORD_ALIGNED_TOKEN,
//             {
//               row: 1,
//               column: 16,
//               position: 15,
//             },
//             "aligned",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 {
//                   row: 1,
//                   column: 23,
//                   position: 22,
//                 },
//                 " ",
//               ),
//             ],
//           ),
//         ),
//         StringVariableKind.UTF,
//         new Identifier(
//           "foo",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             {
//               row: 1,
//               column: 34,
//               position: 33,
//             },
//             "foo",
//             [],
//             [],
//           ),
//         ),
//         undefined,
//         new SyntaxToken(
//           TokenKind.KEYWORD_RESERVED_TOKEN,
//           {
//             row: 1,
//             column: 1,
//             position: 0,
//           },
//           "reserved",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               {
//                 row: 1,
//                 column: 9,
//                 position: 8,
//               },
//               " ",
//             ),
//           ],
//         ),
//         undefined,
//         new SyntaxToken(
//           TokenKind.KEYWORD_CONST_TOKEN,
//           {
//             row: 1,
//             column: 10,
//             position: 9,
//           },
//           "const",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               {
//                 row: 1,
//                 column: 15,
//                 position: 14,
//               },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.KEYWORD_UTFSTRING_TOKEN,
//           {
//             row: 1,
//             column: 24,
//             position: 23,
//           },
//           "utfstring",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               {
//                 row: 1,
//                 column: 33,
//                 position: 32,
//               },
//               " ",
//             ),
//           ],
//         ),
//         undefined,
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//           {
//             row: 1,
//             column: 37,
//             position: 36,
//           },
//           ";",
//           [],
//           [],
//         ),
//       ),
//     );
//   });

//   test("Test string definition pattern - legacy const aligned default", () => {
//     testSyntaxPattern(
//       STRING_DEFINITION_RULE,
//       "legacy const aligned utfstring foo;",
//       new StringDefinition(
//         false,
//         true,
//         true,
//         new AlignedModifier(
//           8,
//           true,
//           undefined,
//           new SyntaxToken(
//             TokenKind.KEYWORD_ALIGNED_TOKEN,
//             {
//               row: 1,
//               column: 14,
//               position: 13,
//             },
//             "aligned",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 {
//                   row: 1,
//                   column: 21,
//                   position: 20,
//                 },
//                 " ",
//               ),
//             ],
//           ),
//         ),
//         StringVariableKind.UTF,
//         new Identifier(
//           "foo",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             {
//               row: 1,
//               column: 32,
//               position: 31,
//             },
//             "foo",
//             [],
//             [],
//           ),
//         ),
//         undefined,
//         undefined,
//         new SyntaxToken(
//           TokenKind.KEYWORD_LEGACY_TOKEN,
//           {
//             row: 1,
//             column: 1,
//             position: 0,
//           },
//           "legacy",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               {
//                 row: 1,
//                 column: 7,
//                 position: 6,
//               },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.KEYWORD_CONST_TOKEN,
//           {
//             row: 1,
//             column: 8,
//             position: 7,
//           },
//           "const",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               {
//                 row: 1,
//                 column: 13,
//                 position: 12,
//               },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.KEYWORD_UTFSTRING_TOKEN,
//           {
//             row: 1,
//             column: 22,
//             position: 21,
//           },
//           "utfstring",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               {
//                 row: 1,
//                 column: 31,
//                 position: 30,
//               },
//               " ",
//             ),
//           ],
//         ),
//         undefined,
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//           {
//             row: 1,
//             column: 35,
//             position: 34,
//           },
//           ";",
//           [],
//           [],
//         ),
//       ),
//     );
//   });

//   test("Test string definition pattern - both legacy and reserved together fails to parse", () => {
//     expect(() =>
//       testSyntaxPattern(
//         STRING_DEFINITION_RULE,
//         "reserved legacy utfstring foo;",
//         new StringDefinition(
//           true,
//           true,
//           false,
//           undefined,
//           StringVariableKind.UTF,
//           new Identifier(
//             "foo",
//             new SyntaxToken(
//               TokenKind.IDENTIFIER_TOKEN,
//               {
//                 row: 1,
//                 column: 25,
//                 position: 24,
//               },
//               "foo",
//               [],
//               [],
//             ),
//           ),
//           undefined,
//           undefined,
//           undefined,
//           undefined,
//           new SyntaxToken(
//             TokenKind.KEYWORD_UTFSTRING_TOKEN,
//             {
//               row: 1,
//               column: 15,
//               position: 14,
//             },
//             "utfstring",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 {
//                   row: 1,
//                   column: 24,
//                   position: 23,
//                 },
//                 " ",
//               ),
//             ],
//           ),
//           undefined,
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//             {
//               row: 1,
//               column: 28,
//               position: 27,
//             },
//             ";",
//             [],
//             [],
//           ),
//         ),
//       )
//     ).toThrow(
//       "SYNTACTIC ERROR: A string variable cannot be both reserved and legacy",
//     );
//   });

//   test("Test string definition pattern - utfstring with literal", () => {
//     testSyntaxPattern(
//       STRING_DEFINITION_RULE,
//       'utfstring foo=u"hello";',
//       new StringDefinition(
//         false,
//         false,
//         false,
//         undefined,
//         StringVariableKind.UTF,
//         new Identifier(
//           "foo",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             {
//               row: 1,
//               column: 11,
//               position: 10,
//             },
//             "foo",
//             [],
//             [],
//           ),
//         ),
//         new StringLiteral(
//           StringLiteralKind.UTF,
//           "hello",
//           [
//             new SyntaxToken(
//               TokenKind.LITERAL_STRING_UTF_TOKEN,
//               {
//                 row: 1,
//                 column: 15,
//                 position: 14,
//               },
//               'u"hello"',
//               [],
//               [],
//             ),
//           ],
//         ),
//         undefined,
//         undefined,
//         undefined,
//         new SyntaxToken(
//           TokenKind.KEYWORD_UTFSTRING_TOKEN,
//           {
//             row: 1,
//             column: 1,
//             position: 0,
//           },
//           "utfstring",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               {
//                 row: 1,
//                 column: 10,
//                 position: 9,
//               },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
//           {
//             row: 1,
//             column: 14,
//             position: 13,
//           },
//           "=",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//           {
//             row: 1,
//             column: 23,
//             position: 22,
//           },
//           ";",
//           [],
//           [],
//         ),
//       ),
//     );
//   });

//   test("Test string definition pattern - utf16string with literal", () => {
//     testSyntaxPattern(
//       STRING_DEFINITION_RULE,
//       'utf16string foo=u"hello";',
//       new StringDefinition(
//         false,
//         false,
//         false,
//         undefined,
//         StringVariableKind.UTF16,
//         new Identifier(
//           "foo",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             {
//               row: 1,
//               column: 13,
//               position: 12,
//             },
//             "foo",
//             [],
//             [],
//           ),
//         ),
//         new StringLiteral(
//           StringLiteralKind.UTF,
//           "hello",
//           [
//             new SyntaxToken(
//               TokenKind.LITERAL_STRING_UTF_TOKEN,
//               {
//                 row: 1,
//                 column: 17,
//                 position: 16,
//               },
//               'u"hello"',
//               [],
//               [],
//             ),
//           ],
//         ),
//         undefined,
//         undefined,
//         undefined,
//         new SyntaxToken(
//           TokenKind.KEYWORD_UTF16STRING_TOKEN,
//           {
//             row: 1,
//             column: 1,
//             position: 0,
//           },
//           "utf16string",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               {
//                 row: 1,
//                 column: 12,
//                 position: 11,
//               },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
//           {
//             row: 1,
//             column: 16,
//             position: 15,
//           },
//           "=",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//           {
//             row: 1,
//             column: 25,
//             position: 24,
//           },
//           ";",
//           [],
//           [],
//         ),
//       ),
//     );
//   });

//   test("Test string definition pattern - utf8list with literal", () => {
//     testSyntaxPattern(
//       STRING_DEFINITION_RULE,
//       'utf8list foo=u"hello world";',
//       new StringDefinition(
//         false,
//         false,
//         false,
//         undefined,
//         StringVariableKind.UTF8_LIST,
//         new Identifier(
//           "foo",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             {
//               row: 1,
//               column: 10,
//               position: 9,
//             },
//             "foo",
//             [],
//             [],
//           ),
//         ),
//         new StringLiteral(
//           StringLiteralKind.UTF,
//           "hello world",
//           [
//             new SyntaxToken(
//               TokenKind.LITERAL_STRING_UTF_TOKEN,
//               {
//                 row: 1,
//                 column: 14,
//                 position: 13,
//               },
//               'u"hello world"',
//               [],
//               [],
//             ),
//           ],
//         ),
//         undefined,
//         undefined,
//         undefined,
//         new SyntaxToken(
//           TokenKind.KEYWORD_UTF8LIST_TOKEN,
//           {
//             row: 1,
//             column: 1,
//             position: 0,
//           },
//           "utf8list",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               {
//                 row: 1,
//                 column: 9,
//                 position: 8,
//               },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
//           {
//             row: 1,
//             column: 13,
//             position: 12,
//           },
//           "=",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//           {
//             row: 1,
//             column: 28,
//             position: 27,
//           },
//           ";",
//           [],
//           [],
//         ),
//       ),
//     );
//   });

//   test("Test string definition pattern - base64 string literal", () => {
//     testSyntaxPattern(
//       STRING_DEFINITION_RULE,
//       'base64string foo="aGVsbG8K";',
//       new StringDefinition(
//         false,
//         false,
//         false,
//         undefined,
//         StringVariableKind.BASE64,
//         new Identifier(
//           "foo",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             {
//               row: 1,
//               column: 14,
//               position: 13,
//             },
//             "foo",
//             [],
//             [],
//           ),
//         ),
//         new StringLiteral(
//           StringLiteralKind.BASIC,
//           "aGVsbG8K",
//           [
//             new SyntaxToken(
//               TokenKind.LITERAL_STRING_BASIC_TOKEN,
//               {
//                 row: 1,
//                 column: 18,
//                 position: 17,
//               },
//               '"aGVsbG8K"',
//               [],
//               [],
//             ),
//           ],
//         ),
//         undefined,
//         undefined,
//         undefined,
//         new SyntaxToken(
//           TokenKind.KEYWORD_BASE64STRING_TOKEN,
//           {
//             row: 1,
//             column: 1,
//             position: 0,
//           },
//           "base64string",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               {
//                 row: 1,
//                 column: 13,
//                 position: 12,
//               },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
//           {
//             row: 1,
//             column: 17,
//             position: 16,
//           },
//           "=",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//           {
//             row: 1,
//             column: 28,
//             position: 27,
//           },
//           ";",
//           [],
//           [],
//         ),
//       ),
//     );
//   });

//   test("Test string definition pattern - invalid UTF string literal type fails to parse", () => {
//     expect(() =>
//       testSyntaxPattern(
//         STRING_DEFINITION_RULE,
//         'base64string foo = u"aGVsbG8K";',
//         new StringDefinition(
//           false,
//           false,
//           false,
//           undefined,
//           StringVariableKind.BASE64,
//           new Identifier(
//             "foo",
//             new SyntaxToken(
//               TokenKind.IDENTIFIER_TOKEN,
//               {
//                 row: 1,
//                 column: 1,
//                 position: 0,
//               },
//               "foo",
//               [],
//               [],
//             ),
//           ),
//           new StringLiteral(
//             StringLiteralKind.UTF,
//             "aGVsbG8K",
//             [
//               new SyntaxToken(
//                 TokenKind.LITERAL_STRING_UTF_TOKEN,
//                 {
//                   row: 1,
//                   column: 1,
//                   position: 0,
//                 },
//                 'u"aGVsbG8K"',
//                 [],
//                 [],
//               ),
//             ],
//           ),
//           undefined,
//           undefined,
//           undefined,
//           new SyntaxToken(
//             TokenKind.KEYWORD_BASE64STRING_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             "base64string",
//             [],
//             [],
//           ),
//           new SyntaxToken(
//             TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
//             {
//               row: 1,
//               column: 18,
//               position: 17,
//             },
//             "=",
//             [],
//             [],
//           ),
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             ";",
//             [],
//             [],
//           ),
//         ),
//       )
//     ).toThrow(
//       "Illegal string literal type",
//     );
//   });

//   test("Test string definition pattern - invalid basic string literal type fails to parse", () => {
//     expect(() =>
//       testSyntaxPattern(
//         STRING_DEFINITION_RULE,
//         'utf8string foo = "hello";',
//         new StringDefinition(
//           false,
//           false,
//           false,
//           undefined,
//           StringVariableKind.BASE64,
//           new Identifier(
//             "foo",
//             new SyntaxToken(
//               TokenKind.IDENTIFIER_TOKEN,
//               {
//                 row: 1,
//                 column: 12,
//                 position: 11,
//               },
//               "foo",
//               [],
//               [],
//             ),
//           ),
//           new StringLiteral(
//             StringLiteralKind.UTF,
//             "hello",
//             [
//               new SyntaxToken(
//                 TokenKind.LITERAL_STRING_BASIC_TOKEN,
//                 {
//                   row: 1,
//                   column: 18,
//                   position: 17,
//                 },
//                 '"hello"',
//                 [],
//                 [],
//               ),
//             ],
//           ),
//           undefined,
//           undefined,
//           undefined,
//           new SyntaxToken(
//             TokenKind.KEYWORD_UTF8STRING_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             "utf8string",
//             [],
//             [],
//           ),
//           new SyntaxToken(
//             TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
//             {
//               row: 1,
//               column: 16,
//               position: 15,
//             },
//             "=",
//             [],
//             [],
//           ),
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             ";",
//             [],
//             [],
//           ),
//         ),
//       )
//     ).toThrow(
//       "Illegal string literal type",
//     );
//   });

//   test("Test string definition pattern - invalid prefix", () => {
//     expect(() =>
//       testSyntaxPattern(
//         STRING_DEFINITION_RULE,
//         'utf8string foo = u8"hello";',
//         new StringDefinition(
//           false,
//           false,
//           false,
//           undefined,
//           StringVariableKind.UTF8,
//           new Identifier(
//             "foo",
//             new SyntaxToken(
//               TokenKind.IDENTIFIER_TOKEN,
//               {
//                 row: 1,
//                 column: 12,
//                 position: 11,
//               },
//               "foo",
//               [],
//               [],
//             ),
//           ),
//           new StringLiteral(
//             StringLiteralKind.UTF,
//             "hello",
//             [
//               new SyntaxToken(
//                 TokenKind.LITERAL_STRING_BASIC_TOKEN,
//                 {
//                   row: 1,
//                   column: 19,
//                   position: 18,
//                 },
//                 '"hello"',
//                 [],
//                 [],
//               ),
//             ],
//           ),
//           undefined,
//           undefined,
//           undefined,
//           new SyntaxToken(
//             TokenKind.KEYWORD_UTF8STRING_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             "utf8string",
//             [],
//             [],
//           ),
//           new SyntaxToken(
//             TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
//             {
//               row: 1,
//               column: 16,
//               position: 15,
//             },
//             "=",
//             [],
//             [],
//           ),
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_SEMICOLON_TOKEN,
//             {
//               row: 1,
//               column: 1,
//               position: 0,
//             },
//             ";",
//             [],
//             [],
//           ),
//         ),
//       )
//     ).toThrow(
//       "Unable to consume token: u8",
//     );
//   });
// });
