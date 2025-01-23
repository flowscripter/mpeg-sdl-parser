import { AlignedModifier } from "../../../src/abstract_syntax_tree/node/AlignedModifier.ts";
import { BitModifier } from "../../../src/abstract_syntax_tree/node/BitModifier.ts";
import { ClassDeclaration } from "../../../src/abstract_syntax_tree/node/ClassDeclaration.ts";
import { ClassIdRange } from "../../../src/abstract_syntax_tree/node/ClassIdRange.ts";
import { ElementaryType } from "../../../src/abstract_syntax_tree/node/ElementaryType.ts";
import { ElementaryTypeKind } from "../../../src/abstract_syntax_tree/node/enum/elementary_type_kind.ts";
import { NumberLiteralKind } from "../../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import { ExpandableModifier } from "../../../src/abstract_syntax_tree/node/ExpandableModifier.ts";
import { ExtendedClassIdRange } from "../../../src/abstract_syntax_tree/node/ExtendedClassIdRange.ts";
import { ExtendsModifier } from "../../../src/abstract_syntax_tree/node/ExtendsModifier.ts";
import { Identifier } from "../../../src/abstract_syntax_tree/node/Identifier.ts";
import { NumberLiteral } from "../../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import { Parameter } from "../../../src/abstract_syntax_tree/node/Parameter.ts";
import { ParameterList } from "../../../src/abstract_syntax_tree/node/ParameterList.ts";
import { ParameterValueList } from "../../../src/abstract_syntax_tree/node/ParameterValueList.ts";
import { SingleClassId } from "../../../src/abstract_syntax_tree/node/SingleClassId.ts";
import { CLASS_DECLARATION_RULE } from "../../../src/parser/syntax_rules.ts";
import { TokenKind } from "../../../src/tokenizer/enum/token_kind.ts";
import { SyntaxToken } from "../../../src/tokenizer/token/SyntaxToken.ts";
import { Trivia } from "../../../src/tokenizer/token/TriviaToken.ts";
import testSyntaxPattern from "../syntax_pattern_test_helper.ts";

Deno.test("Test class declaration pattern", () => {
  testSyntaxPattern(
    CLASS_DECLARATION_RULE,
    "class A {}",
    new ClassDeclaration(
      undefined,
      undefined,
      false,
      new Identifier(
        "A",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 6, position: 6 },
          "A",
          [],
          [
            new Trivia(
              TokenKind.WHITESPACE_TOKEN,
              { row: 0, column: 7, position: 7 },
              " ",
            ),
          ],
        ),
      ),
      undefined,
      undefined,
      undefined,
      [],
      undefined,
      new SyntaxToken(
        TokenKind.KEYWORD_CLASS_TOKEN,
        { row: 0, column: 0, position: 0 },
        "class",
        [],
        [
          new Trivia(
            TokenKind.WHITESPACE_TOKEN,
            { row: 0, column: 5, position: 5 },
            " ",
          ),
        ],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
        { row: 0, column: 8, position: 8 },
        "{",
        [],
        [],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
        { row: 0, column: 9, position: 9 },
        "}",
        [],
        [],
      ),
    ),
  );
});

Deno.test("Test class declaration pattern - all features", () => {
  testSyntaxPattern(
    CLASS_DECLARATION_RULE,
    "aligned(8) expandable(20) abstract class A (int a, B b) extends C(1, d) : bit(3) id=1..2,5 {}",
    new ClassDeclaration(
      new AlignedModifier(
        8,
        false,
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          8,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              { row: 0, column: 8, position: 8 },
              "8",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_ALIGNED_TOKEN,
          { row: 0, column: 0, position: 0 },
          "aligned",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          { row: 0, column: 7, position: 7 },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          { row: 0, column: 9, position: 9 },
          ")",
          [],
          [
            new Trivia(
              TokenKind.WHITESPACE_TOKEN,
              { row: 0, column: 10, position: 10 },
              " ",
            ),
          ],
        ),
      ),
      new ExpandableModifier(
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          20,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              { row: 0, column: 22, position: 22 },
              "20",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_EXPANDABLE_TOKEN,
          { row: 0, column: 11, position: 11 },
          "expandable",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          { row: 0, column: 21, position: 21 },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          { row: 0, column: 24, position: 24 },
          ")",
          [],
          [
            new Trivia(
              TokenKind.WHITESPACE_TOKEN,
              { row: 0, column: 25, position: 25 },
              " ",
            ),
          ],
        ),
      ),
      true,
      new Identifier(
        "A",
        new SyntaxToken(
          TokenKind.IDENTIFIER_TOKEN,
          { row: 0, column: 41, position: 41 },
          "A",
          [],
          [
            new Trivia(
              TokenKind.WHITESPACE_TOKEN,
              { row: 0, column: 42, position: 42 },
              " ",
            ),
          ],
        ),
      ),
      new ParameterList(
        [
          new Parameter(
            undefined,
            new ElementaryType(
              ElementaryTypeKind.INTEGER,
              undefined,
              new SyntaxToken(
                TokenKind.KEYWORD_INT_TOKEN,
                { row: 0, column: 44, position: 44 },
                "int",
                [],
                [
                  new Trivia(
                    TokenKind.WHITESPACE_TOKEN,
                    { row: 0, column: 47, position: 47 },
                    " ",
                  ),
                ],
              ),
            ),
            new Identifier(
              "a",
              new SyntaxToken(
                TokenKind.IDENTIFIER_TOKEN,
                { row: 0, column: 48, position: 48 },
                "a",
                [],
                [],
              ),
            ),
          ),
          new Parameter(
            new Identifier(
              "B",
              new SyntaxToken(
                TokenKind.IDENTIFIER_TOKEN,
                { row: 0, column: 51, position: 51 },
                "B",
                [],
                [
                  new Trivia(
                    TokenKind.WHITESPACE_TOKEN,
                    { row: 0, column: 52, position: 52 },
                    " ",
                  ),
                ],
              ),
            ),
            undefined,
            new Identifier(
              "b",
              new SyntaxToken(
                TokenKind.IDENTIFIER_TOKEN,
                { row: 0, column: 53, position: 53 },
                "b",
                [],
                [],
              ),
            ),
          ),
        ],
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          { row: 0, column: 43, position: 43 },
          "(",
          [],
          [],
        ),
        [
          new SyntaxToken(
            TokenKind.PUNCTUATOR_COMMA_TOKEN,
            { row: 0, column: 49, position: 49 },
            ",",
            [],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                { row: 0, column: 50, position: 50 },
                " ",
              ),
            ],
          ),
        ],
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          { row: 0, column: 54, position: 54 },
          ")",
          [],
          [
            new Trivia(
              TokenKind.WHITESPACE_TOKEN,
              { row: 0, column: 55, position: 55 },
              " ",
            ),
          ],
        ),
      ),
      new ExtendsModifier(
        new Identifier(
          "C",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            { row: 0, column: 64, position: 64 },
            "C",
            [],
            [],
          ),
        ),
        new ParameterValueList(
          [
            new NumberLiteral(
              NumberLiteralKind.INTEGER,
              1,
              [
                new SyntaxToken(
                  TokenKind.LITERAL_INTEGER_TOKEN,
                  { row: 0, column: 66, position: 66 },
                  "1",
                  [],
                  [],
                ),
              ],
            ),
            new Identifier(
              "d",
              new SyntaxToken(
                TokenKind.IDENTIFIER_TOKEN,
                { row: 0, column: 69, position: 69 },
                "d",
                [],
                [],
              ),
            ),
          ],
          new SyntaxToken(
            TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
            { row: 0, column: 65, position: 65 },
            "(",
            [],
            [],
          ),
          [
            new SyntaxToken(
              TokenKind.PUNCTUATOR_COMMA_TOKEN,
              { row: 0, column: 67, position: 67 },
              ",",
              [],
              [
                new Trivia(
                  TokenKind.WHITESPACE_TOKEN,
                  { row: 0, column: 68, position: 68 },
                  " ",
                ),
              ],
            ),
          ],
          new SyntaxToken(
            TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
            { row: 0, column: 70, position: 70 },
            ")",
            [],
            [
              new Trivia(
                TokenKind.WHITESPACE_TOKEN,
                { row: 0, column: 71, position: 71 },
                " ",
              ),
            ],
          ),
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_EXTENDS_TOKEN,
          { row: 0, column: 56, position: 56 },
          "extends",
          [],
          [
            new Trivia(
              TokenKind.WHITESPACE_TOKEN,
              { row: 0, column: 63, position: 63 },
              " ",
            ),
          ],
        ),
      ),
      new BitModifier(
        new NumberLiteral(
          NumberLiteralKind.INTEGER,
          3,
          [
            new SyntaxToken(
              TokenKind.LITERAL_INTEGER_TOKEN,
              { row: 0, column: 78, position: 78 },
              "3",
              [],
              [],
            ),
          ],
        ),
        new Identifier(
          "id",
          new SyntaxToken(
            TokenKind.IDENTIFIER_TOKEN,
            { row: 0, column: 81, position: 81 },
            "id",
            [],
            [],
          ),
        ),
        new ExtendedClassIdRange(
          [
            new ClassIdRange(
              new SingleClassId(
                new NumberLiteral(
                  NumberLiteralKind.INTEGER,
                  1,
                  [
                    new SyntaxToken(
                      TokenKind.LITERAL_INTEGER_TOKEN,
                      { row: 0, column: 84, position: 84 },
                      "1",
                      [],
                      [],
                    ),
                  ],
                ),
              ),
              new SingleClassId(
                new NumberLiteral(
                  NumberLiteralKind.INTEGER,
                  2,
                  [
                    new SyntaxToken(
                      TokenKind.LITERAL_INTEGER_TOKEN,
                      { row: 0, column: 87, position: 87 },
                      "2",
                      [],
                      [],
                    ),
                  ],
                ),
              ),
              new SyntaxToken(
                TokenKind.OPERATOR_RANGE_TOKEN,
                { row: 0, column: 85, position: 85 },
                "..",
                [],
                [],
              ),
            ),
            new SingleClassId(
              new NumberLiteral(
                NumberLiteralKind.INTEGER,
                5,
                [
                  new SyntaxToken(
                    TokenKind.LITERAL_INTEGER_TOKEN,
                    { row: 0, column: 89, position: 89 },
                    "5",
                    [],
                    [
                      new Trivia(
                        TokenKind.WHITESPACE_TOKEN,
                        { row: 0, column: 90, position: 90 },
                        " ",
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
          [
            new SyntaxToken(
              TokenKind.PUNCTUATOR_COMMA_TOKEN,
              { row: 0, column: 88, position: 88 },
              ",",
              [],
              [],
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_COLON_TOKEN,
          { row: 0, column: 72, position: 72 },
          ":",
          [],
          [
            new Trivia(
              TokenKind.WHITESPACE_TOKEN,
              { row: 0, column: 73, position: 73 },
              " ",
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.KEYWORD_BIT_TOKEN,
          { row: 0, column: 74, position: 74 },
          "bit",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN,
          { row: 0, column: 77, position: 77 },
          "(",
          [],
          [],
        ),
        new SyntaxToken(
          TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN,
          { row: 0, column: 79, position: 79 },
          ")",
          [],
          [
            new Trivia(
              TokenKind.WHITESPACE_TOKEN,
              { row: 0, column: 80, position: 80 },
              " ",
            ),
          ],
        ),
        new SyntaxToken(
          TokenKind.OPERATOR_ASSIGNMENT_TOKEN,
          { row: 0, column: 83, position: 83 },
          "=",
          [],
          [],
        ),
      ),
      [],
      new SyntaxToken(
        TokenKind.KEYWORD_ABSTRACT_TOKEN,
        { row: 0, column: 26, position: 26 },
        "abstract",
        [],
        [
          new Trivia(
            TokenKind.WHITESPACE_TOKEN,
            { row: 0, column: 34, position: 34 },
            " ",
          ),
        ],
      ),
      new SyntaxToken(
        TokenKind.KEYWORD_CLASS_TOKEN,
        { row: 0, column: 35, position: 35 },
        "class",
        [],
        [
          new Trivia(
            TokenKind.WHITESPACE_TOKEN,
            { row: 0, column: 40, position: 40 },
            " ",
          ),
        ],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_OPEN_BRACE_TOKEN,
        { row: 0, column: 91, position: 91 },
        "{",
        [],
        [],
      ),
      new SyntaxToken(
        TokenKind.PUNCTUATOR_CLOSE_BRACE_TOKEN,
        { row: 0, column: 92, position: 92 },
        "}",
        [],
        [],
      ),
    ),
  );
});
