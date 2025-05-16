// import { describe, test } from "bun:test";
// import { AlignedModifier } from "../../../src/ast/node/AlignedModifier.ts";
// import { BitModifier } from "../../../src/ast/node/BitModifier.ts";
// import { ClassDeclaration } from "../../../src/ast/node/ClassDeclaration.ts";
// import { ClassIdRange } from "../../../src/ast/node/ClassIdRange.ts";
// import { ElementaryType } from "../../../src/ast/node/ElementaryType.ts";
// import { ElementaryTypeKind } from "../../../src/ast/node/enum/elementary_type_kind.ts";
// import { NumberLiteralKind } from "../../../src/ast/node/enum/number_literal_kind.ts";
// import { ExpandableModifier } from "../../../src/ast/node/ExpandableModifier.ts";
// import { ExtendedClassIdRange } from "../../../src/ast/node/ExtendedClassIdRange.ts";
// import { ExtendsModifier } from "../../../src/ast/node/ExtendsModifier.ts";
// import { Identifier } from "../../../src/ast/node/Identifier.ts";
// import { NumberLiteral } from "../../../src/ast/node/NumberLiteral.ts";
// import { Parameter } from "../../../src/ast/node/Parameter.ts";
// import { ParameterList } from "../../../src/ast/node/ParameterList.ts";
// import { ParameterValueList } from "../../../src/ast/node/ParameterValueList.ts";
// import { SingleClassId } from "../../../src/ast/node/SingleClassId.ts";
// import { CLASS_DECLARATION_RULE } from "../../../src/parser/syntax_rules.ts";
// import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
// import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
// import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
// import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

// // // TODO: rename all of these and port them to use new framework
// describe("Class Declararation Pattern Tests", () => {
//   test("Test class declaration pattern", () => {
//     testSyntaxPattern(
//       CLASS_DECLARATION_RULE,
//       "class A {}",
//       new ClassDeclaration(
//         undefined,
//         undefined,
//         false,
//         new Identifier(
//           "A",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             { row: 1, column: 7, position: 6 },
//             "A",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 { row: 1, column: 8, position: 7 },
//                 " ",
//               ),
//             ],
//           ),
//         ),
//         undefined,
//         undefined,
//         undefined,
//         [],
//         undefined,
//         new SyntaxToken(
//           TokenKind.KEYWORD_CLASS_TOKEN,
//           { row: 1, column: 1, position: 0 },
//           "class",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               { row: 1, column: 6, position: 5 },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//           { row: 1, column: 9, position: 8 },
//           "{",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//           { row: 1, column: 10, position: 9 },
//           "}",
//           [],
//           [],
//         ),
//       ),
//     );
//   });

//   test("Test class declaration pattern - single parameter with single id", () => {
//     testSyntaxPattern(
//       CLASS_DECLARATION_RULE,
//       "class A(int a) {}",
//       new ClassDeclaration(
//         undefined,
//         undefined,
//         false,
//         new Identifier(
//           "A",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             { row: 1, column: 7, position: 6 },
//             "A",
//             [],
//             [],
//           ),
//         ),
//         new ParameterList(
//           [
//             new Parameter(
//               undefined,
//               new ElementaryType(
//                 ElementaryTypeKind.INTEGER,
//                 undefined,
//                 new SyntaxToken(
//                   TokenKind.KEYWORD_INT_TOKEN,
//                   { row: 1, column: 9, position: 8 },
//                   "int",
//                   [],
//                   [
//                     new Trivia(
//                       TokenKind.WHITESPACE_TOKEN,
//                       { row: 1, column: 12, position: 11 },
//                       " ",
//                     ),
//                   ],
//                 ),
//               ),
//               new Identifier(
//                 "a",
//                 new SyntaxToken(
//                   TokenKind.IDENTIFIER_TOKEN,
//                   { row: 1, column: 13, position: 12 },
//                   "a",
//                   [],
//                   [],
//                 ),
//               ),
//             ),
//           ],
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//             { row: 1, column: 8, position: 7 },
//             "(",
//             [],
//             [],
//           ),
//           undefined,
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//             { row: 1, column: 14, position: 13 },
//             ")",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 { row: 1, column: 15, position: 14 },
//                 " ",
//               ),
//             ],
//           ),
//         ),
//         undefined,
//         undefined,
//         [],
//         undefined,
//         new SyntaxToken(
//           TokenKind.KEYWORD_CLASS_TOKEN,
//           { row: 1, column: 1, position: 0 },
//           "class",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               { row: 1, column: 6, position: 5 },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//           { row: 1, column: 16, position: 15 },
//           "{",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//           { row: 1, column: 17, position: 16 },
//           "}",
//           [],
//           [],
//         ),
//       ),
//     );
//   });

//   test("Test class declaration pattern - all features", () => {
//     testSyntaxPattern(
//       CLASS_DECLARATION_RULE,
//       "aligned(8) expandable(20) abstract class A (int a, B b) extends C(1, d) : bit(3) id=1..2,5 {}",
//       new ClassDeclaration(
//         new AlignedModifier(
//           8,
//           false,
//           new NumberLiteral(
//             NumberLiteralKind.INTEGER,
//             8,
//             [
//               new SyntaxToken(
//                 TokenKind.LITERAL_INTEGER_TOKEN,
//                 { row: 1, column: 9, position: 8 },
//                 "8",
//                 [],
//                 [],
//               ),
//             ],
//           ),
//           new SyntaxToken(
//             TokenKind.KEYWORD_ALIGNED_TOKEN,
//             { row: 1, column: 1, position: 0 },
//             "aligned",
//             [],
//             [],
//           ),
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//             { row: 1, column: 8, position: 7 },
//             "(",
//             [],
//             [],
//           ),
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//             { row: 1, column: 10, position: 9 },
//             ")",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 { row: 1, column: 11, position: 10 },
//                 " ",
//               ),
//             ],
//           ),
//         ),
//         new ExpandableModifier(
//           new NumberLiteral(
//             NumberLiteralKind.INTEGER,
//             20,
//             [
//               new SyntaxToken(
//                 TokenKind.LITERAL_INTEGER_TOKEN,
//                 { row: 1, column: 23, position: 22 },
//                 "20",
//                 [],
//                 [],
//               ),
//             ],
//           ),
//           new SyntaxToken(
//             TokenKind.KEYWORD_EXPANDABLE_TOKEN,
//             { row: 1, column: 12, position: 11 },
//             "expandable",
//             [],
//             [],
//           ),
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//             { row: 1, column: 22, position: 21 },
//             "(",
//             [],
//             [],
//           ),
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//             { row: 1, column: 25, position: 24 },
//             ")",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 { row: 1, column: 26, position: 25 },
//                 " ",
//               ),
//             ],
//           ),
//         ),
//         true,
//         new Identifier(
//           "A",
//           new SyntaxToken(
//             TokenKind.IDENTIFIER_TOKEN,
//             { row: 1, column: 42, position: 41 },
//             "A",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 { row: 1, column: 43, position: 42 },
//                 " ",
//               ),
//             ],
//           ),
//         ),
//         new ParameterList(
//           [
//             new Parameter(
//               undefined,
//               new ElementaryType(
//                 ElementaryTypeKind.INTEGER,
//                 undefined,
//                 new SyntaxToken(
//                   TokenKind.KEYWORD_INT_TOKEN,
//                   { row: 1, column: 45, position: 44 },
//                   "int",
//                   [],
//                   [
//                     new Trivia(
//                       TokenKind.WHITESPACE_TOKEN,
//                       { row: 1, column: 48, position: 47 },
//                       " ",
//                     ),
//                   ],
//                 ),
//               ),
//               new Identifier(
//                 "a",
//                 new SyntaxToken(
//                   TokenKind.IDENTIFIER_TOKEN,
//                   { row: 1, column: 49, position: 48 },
//                   "a",
//                   [],
//                   [],
//                 ),
//               ),
//             ),
//             new Parameter(
//               new Identifier(
//                 "B",
//                 new SyntaxToken(
//                   TokenKind.IDENTIFIER_TOKEN,
//                   { row: 1, column: 52, position: 51 },
//                   "B",
//                   [],
//                   [
//                     new Trivia(
//                       TokenKind.WHITESPACE_TOKEN,
//                       { row: 1, column: 53, position: 52 },
//                       " ",
//                     ),
//                   ],
//                 ),
//               ),
//               undefined,
//               new Identifier(
//                 "b",
//                 new SyntaxToken(
//                   TokenKind.IDENTIFIER_TOKEN,
//                   { row: 1, column: 54, position: 53 },
//                   "b",
//                   [],
//                   [],
//                 ),
//               ),
//             ),
//           ],
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//             { row: 1, column: 44, position: 43 },
//             "(",
//             [],
//             [],
//           ),
//           [
//             new SyntaxToken(
//               TokenKind.PUNCTUATOR_COMMA_TOKEN,
//               { row: 1, column: 50, position: 49 },
//               ",",
//               [],
//               [
//                 new Trivia(
//                   TokenKind.WHITESPACE_TOKEN,
//                   { row: 1, column: 51, position: 50 },
//                   " ",
//                 ),
//               ],
//             ),
//           ],
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//             { row: 1, column: 55, position: 54 },
//             ")",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 { row: 1, column: 56, position: 55 },
//                 " ",
//               ),
//             ],
//           ),
//         ),
//         new ExtendsModifier(
//           new Identifier(
//             "C",
//             new SyntaxToken(
//               TokenKind.IDENTIFIER_TOKEN,
//               { row: 1, column: 65, position: 64 },
//               "C",
//               [],
//               [],
//             ),
//           ),
//           new ParameterValueList(
//             [
//               new NumberLiteral(
//                 NumberLiteralKind.INTEGER,
//                 1,
//                 [
//                   new SyntaxToken(
//                     TokenKind.LITERAL_INTEGER_TOKEN,
//                     { row: 1, column: 67, position: 66 },
//                     "1",
//                     [],
//                     [],
//                   ),
//                 ],
//               ),
//               new Identifier(
//                 "d",
//                 new SyntaxToken(
//                   TokenKind.IDENTIFIER_TOKEN,
//                   { row: 1, column: 70, position: 69 },
//                   "d",
//                   [],
//                   [],
//                 ),
//               ),
//             ],
//             new SyntaxToken(
//               TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//               { row: 1, column: 66, position: 65 },
//               "(",
//               [],
//               [],
//             ),
//             [
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_COMMA_TOKEN,
//                 { row: 1, column: 68, position: 67 },
//                 ",",
//                 [],
//                 [
//                   new Trivia(
//                     TokenKind.WHITESPACE_TOKEN,
//                     { row: 1, column: 69, position: 68 },
//                     " ",
//                   ),
//                 ],
//               ),
//             ],
//             new SyntaxToken(
//               TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//               { row: 1, column: 71, position: 70 },
//               ")",
//               [],
//               [
//                 new Trivia(
//                   TokenKind.WHITESPACE_TOKEN,
//                   { row: 1, column: 72, position: 71 },
//                   " ",
//                 ),
//               ],
//             ),
//           ),
//           new SyntaxToken(
//             TokenKind.KEYWORD_EXTENDS_TOKEN,
//             { row: 1, column: 57, position: 56 },
//             "extends",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 { row: 1, column: 64, position: 63 },
//                 " ",
//               ),
//             ],
//           ),
//         ),
//         new BitModifier(
//           new NumberLiteral(
//             NumberLiteralKind.INTEGER,
//             3,
//             [
//               new SyntaxToken(
//                 TokenKind.LITERAL_INTEGER_TOKEN,
//                 { row: 1, column: 79, position: 78 },
//                 "3",
//                 [],
//                 [],
//               ),
//             ],
//           ),
//           new Identifier(
//             "id",
//             new SyntaxToken(
//               TokenKind.IDENTIFIER_TOKEN,
//               { row: 1, column: 82, position: 81 },
//               "id",
//               [],
//               [],
//             ),
//           ),
//           new ExtendedClassIdRange(
//             [
//               new ClassIdRange(
//                 new SingleClassId(
//                   new NumberLiteral(
//                     NumberLiteralKind.INTEGER,
//                     1,
//                     [
//                       new SyntaxToken(
//                         TokenKind.LITERAL_INTEGER_TOKEN,
//                         { row: 1, column: 85, position: 84 },
//                         "1",
//                         [],
//                         [],
//                       ),
//                     ],
//                   ),
//                 ),
//                 new SingleClassId(
//                   new NumberLiteral(
//                     NumberLiteralKind.INTEGER,
//                     2,
//                     [
//                       new SyntaxToken(
//                         TokenKind.LITERAL_INTEGER_TOKEN,
//                         { row: 1, column: 88, position: 87 },
//                         "2",
//                         [],
//                         [],
//                       ),
//                     ],
//                   ),
//                 ),
//                 new SyntaxToken(
//                   TokenKind.OPERATOR_RANGE_TOKEN,
//                   { row: 1, column: 86, position: 85 },
//                   "..",
//                   [],
//                   [],
//                 ),
//               ),
//               new SingleClassId(
//                 new NumberLiteral(
//                   NumberLiteralKind.INTEGER,
//                   5,
//                   [
//                     new SyntaxToken(
//                       TokenKind.LITERAL_INTEGER_TOKEN,
//                       { row: 1, column: 90, position: 89 },
//                       "5",
//                       [],
//                       [
//                         new Trivia(
//                           TokenKind.WHITESPACE_TOKEN,
//                           { row: 1, column: 91, position: 90 },
//                           " ",
//                         ),
//                       ],
//                     ),
//                   ],
//                 ),
//               ),
//             ],
//             [
//               new SyntaxToken(
//                 TokenKind.PUNCTUATOR_COMMA_TOKEN,
//                 { row: 1, column: 89, position: 88 },
//                 ",",
//                 [],
//                 [],
//               ),
//             ],
//           ),
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_COLON_TOKEN,
//             { row: 1, column: 73, position: 72 },
//             ":",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 { row: 1, column: 74, position: 73 },
//                 " ",
//               ),
//             ],
//           ),
//           new SyntaxToken(
//             TokenKind.KEYWORD_BIT_TOKEN,
//             { row: 1, column: 75, position: 74 },
//             "bit",
//             [],
//             [],
//           ),
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
//             { row: 1, column: 78, position: 77 },
//             "(",
//             [],
//             [],
//           ),
//           new SyntaxToken(
//             TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
//             { row: 1, column: 80, position: 79 },
//             ")",
//             [],
//             [
//               new Trivia(
//                 TokenKind.WHITESPACE_TOKEN,
//                 { row: 1, column: 81, position: 80 },
//                 " ",
//               ),
//             ],
//           ),
//           new SyntaxToken(
//             TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
//             { row: 1, column: 84, position: 83 },
//             "=",
//             [],
//             [],
//           ),
//         ),
//         [],
//         new SyntaxToken(
//           TokenKind.KEYWORD_ABSTRACT_TOKEN,
//           { row: 1, column: 27, position: 26 },
//           "abstract",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               { row: 1, column: 35, position: 34 },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.KEYWORD_CLASS_TOKEN,
//           { row: 1, column: 36, position: 35 },
//           "class",
//           [],
//           [
//             new Trivia(
//               TokenKind.WHITESPACE_TOKEN,
//               { row: 1, column: 41, position: 40 },
//               " ",
//             ),
//           ],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
//           { row: 1, column: 92, position: 91 },
//           "{",
//           [],
//           [],
//         ),
//         new SyntaxToken(
//           TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
//           { row: 1, column: 93, position: 92 },
//           "}",
//           [],
//           [],
//         ),
//       ),
//     );
//   });
// });
