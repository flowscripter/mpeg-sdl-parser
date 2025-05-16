// import { describe, expect, test } from "bun:test";
// import { expectEOF, expectSingleResult } from "typescript-parsec";
// import { ClassDeclaration } from "../../../src/ast/node/ClassDeclaration.ts";
// import { Identifier } from "../../../src/ast/node/Identifier.ts";
// import { Specification } from "../../../src/ast/node/Specification.ts";
// import {
//   initRules,
//   SPECIFICATION_RULE,
// } from "../../../src/parser/syntax_rules.ts";
// import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
// import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
// import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
// import { Tokenizer } from "../../../src/tokenizer/Tokenizer.ts";

// // // TODO: rename all of these and port them to use new framework
// describe("Specification Pattern Tests", () => {
//   test("Test specification pattern - no declarations fails to parse ", () => {
//     const tokenizer = new Tokenizer();
//     const token = tokenizer.parse("");

//     initRules();

//     expect(() => SPECIFICATION_RULE.parse(token)).toThrow(
//       "INTERNAL ERROR: Expected at least one global declaration",
//     );
//   });

//   test("Test specification pattern", () => {
//     initRules();

//     const tokenizer = new Tokenizer();
//     const token = tokenizer.parse("class A {}");

//     const actual = expectSingleResult(
//       expectEOF(
//         SPECIFICATION_RULE.parse(token),
//       ),
//     );

//     expect(
//       actual,
//     ).toEqual(
//       new Specification(
//         [
//           new ClassDeclaration(
//             undefined,
//             undefined,
//             false,
//             new Identifier(
//               "A",
//               new SyntaxToken(
//                 TokenKind.IDENTIFIER_TOKEN,
//                 {
//                   row: 1,
//                   column: 7,
//                   position: 6,
//                 },
//                 "A",
//                 [],
//                 [
//                   new Trivia(TokenKind.WHITESPACE_TOKEN, {
//                     row: 1,
//                     column: 8,
//                     position: 7,
//                   }, " "),
//                 ],
//               ),
//             ),
//             undefined,
//             undefined,
//             undefined,
//             [],
//             undefined,
//             new SyntaxToken(
//               TokenKind.KEYWORD_CLASS_TOKEN,
//               {
//                 row: 1,
//                 column: 1,
//                 position: 0,
//               },
//               "class",
//               [],
//               [
//                 new Trivia(TokenKind.WHITESPACE_TOKEN, {
//                   row: 1,
//                   column: 6,
//                   position: 5,
//                 }, " "),
//               ],
//             ),
//             new SyntaxToken(
//               TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//               {
//                 row: 1,
//                 column: 9,
//                 position: 8,
//               },
//               "{",
//               [],
//               [],
//             ),
//             new SyntaxToken(
//               TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//               {
//                 row: 1,
//                 column: 10,
//                 position: 9,
//               },
//               "}",
//               [],
//               [],
//             ),
//           ),
//         ],
//         new SyntaxToken(
//           TokenKind.EOF_TOKEN,
//           {
//             row: 1,
//             column: 11,
//             position: 10,
//           },
//           "",
//           [],
//           [],
//         ),
//       ),
//     );
//   });

//   test("Test specification pattern - line breaks", () => {
//     initRules();

//     const tokenizer = new Tokenizer();
//     const token = tokenizer.parse("// hello world\nclass A {\n}");

//     const actual = expectSingleResult(
//       expectEOF(
//         SPECIFICATION_RULE.parse(token),
//       ),
//     );

//     expect(
//       actual,
//     ).toEqual(
//       new Specification(
//         [
//           new ClassDeclaration(
//             undefined,
//             undefined,
//             false,
//             new Identifier(
//               "A",
//               new SyntaxToken(
//                 TokenKind.IDENTIFIER_TOKEN,
//                 {
//                   row: 2,
//                   column: 7,
//                   position: 21,
//                 },
//                 "A",
//                 [],
//                 [
//                   new Trivia(TokenKind.WHITESPACE_TOKEN, {
//                     row: 2,
//                     column: 8,
//                     position: 22,
//                   }, " "),
//                 ],
//               ),
//             ),
//             undefined,
//             undefined,
//             undefined,
//             [],
//             undefined,
//             new SyntaxToken(
//               TokenKind.KEYWORD_CLASS_TOKEN,
//               {
//                 row: 2,
//                 column: 1,
//                 position: 15,
//               },
//               "class",
//               [
//                 new Trivia(TokenKind.COMMENT_TOKEN, {
//                   row: 1,
//                   column: 1,
//                   position: 0,
//                 }, "// hello world"),
//                 new Trivia(TokenKind.WHITESPACE_TOKEN, {
//                   row: 1,
//                   column: 15,
//                   position: 14,
//                 }, "\n"),
//               ],
//               [
//                 new Trivia(TokenKind.WHITESPACE_TOKEN, {
//                   row: 2,
//                   column: 6,
//                   position: 20,
//                 }, " "),
//               ],
//             ),
//             new SyntaxToken(
//               TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//               {
//                 row: 2,
//                 column: 9,
//                 position: 23,
//               },
//               "{",
//               [],
//               [],
//             ),
//             new SyntaxToken(
//               TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//               {
//                 row: 3,
//                 column: 1,
//                 position: 25,
//               },
//               "}",
//               [
//                 new Trivia(TokenKind.WHITESPACE_TOKEN, {
//                   row: 2,
//                   column: 10,
//                   position: 24,
//                 }, "\n"),
//               ],
//               [],
//             ),
//           ),
//         ],
//         new SyntaxToken(
//           TokenKind.EOF_TOKEN,
//           {
//             row: 3,
//             column: 2,
//             position: 26,
//           },
//           "",
//           [],
//           [],
//         ),
//       ),
//     );
//   });
// });
