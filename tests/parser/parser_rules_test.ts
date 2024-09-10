import { assertEquals, assertThrows } from "../test_deps.ts";
import Tokenizer from "../../src/tokenizer/tokenizer.ts";
import { expectEOF, expectSingleResult, Rule } from "../../deps.ts";
import * as parserRules from "../../src/parser/parser_rules.ts";
import TokenKind from "../../src/tokenizer/enum/token_kind.ts";
import { SyntacticParserError } from "../../src/util/ParserError.ts";
import Node from "../../src/abstract_syntax_tree/Node.ts";
import Alignment from "../../src/abstract_syntax_tree/node/Alignment.ts";
import AssignmentExpression from "../../src/abstract_syntax_tree/node/AssignmentExpression.ts";
import BinaryExpression from "../../src/abstract_syntax_tree/node/BinaryExpression.ts";
import Comment from "../../src/abstract_syntax_tree/node/Comment.ts";
import CompoundStatement from "../../src/abstract_syntax_tree/node/CompoundStatement.ts";
import ExpressionStatement from "../../src/abstract_syntax_tree/node/ExpressionStatement.ts";
import Identifier from "../../src/abstract_syntax_tree/node/Identifier.ts";
import LengthOfExpression from "../../src/abstract_syntax_tree/node/LengthOfExpression.ts";
import NumberLiteral from "../../src/abstract_syntax_tree/node/NumberLiteral.ts";
import Specification from "../../src/abstract_syntax_tree/node/Specification.ts";
import Statement from "../../src/abstract_syntax_tree/node/Statement.ts";
import StringDefinition from "../../src/abstract_syntax_tree/node/StringDefinition.ts";
import StringLiteral from "../../src/abstract_syntax_tree/node/StringLiteral.ts";
import UnaryExpression from "../../src/abstract_syntax_tree/node/UnaryExpression.ts";
import NodeKind from "../../src/abstract_syntax_tree/node/enum/node_kind.ts";
import BinaryOperatorKind from "../../src/abstract_syntax_tree/node/enum/binary_operator_kind.ts";
import NumberLiteralKind from "../../src/abstract_syntax_tree/node/enum/number_literal_kind.ts";
import PostfixOperatorKind from "../../src/abstract_syntax_tree/node/enum/postfix_operator_kind.ts";
import StringLiteralKind from "../../src/abstract_syntax_tree/node/enum/string_literal_kind.ts";
import StringVariableKind from "../../src/abstract_syntax_tree/node/enum/string_variable_kind.ts";
import UnaryOperatorKind from "../../src/abstract_syntax_tree/node/enum/unary_operator_kind.ts";

function testRule(
  rule: Rule<TokenKind, Node>,
  input: string,
  expected: Node,
): void {
  const tokenizer = new Tokenizer();
  const token = tokenizer.parse(input);
  const actual = expectSingleResult(expectEOF(rule.parse(token)));

  assertEquals(actual, expected);
}

Deno.test("Test comment rule", () => {
  testRule(
    parserRules.COMMENT_RULE,
    "// hello world",
    new Comment({ row: 0, column: 0, position: 0 }, {
      row: 0,
      column: 3,
      position: 3,
    }, "hello world"),
  );

  // whitespace
  testRule(
    parserRules.COMMENT_RULE,
    "//  hello world ",
    new Comment({ row: 0, column: 0, position: 0 }, {
      row: 0,
      column: 4,
      position: 4,
    }, "hello world"),
  );
});

Deno.test("Test identifier rule", () => {
  testRule(
    parserRules.IDENTIFIER_RULE,
    "foobar",
    new Identifier({ row: 0, column: 0, position: 0 }, "foobar"),
  );
  testRule(
    parserRules.IDENTIFIER_RULE,
    " foobar ",
    new Identifier({ row: 0, column: 1, position: 1 }, "foobar"),
  );
});

Deno.test("Test unary expression rule", () => {
  // number literal
  testRule(
    parserRules.UNARY_EXPRESSION_RULE,
    "1",
    new UnaryExpression(
      { row: 0, column: 0, position: 0 },
      undefined,
      undefined,
      new NumberLiteral(
        { row: 0, column: 0, position: 0 },
        NumberLiteralKind.INTEGER,
        1,
        "1",
      ),
      undefined,
    ),
  );

  // identifier and postfix operator
  testRule(
    parserRules.UNARY_EXPRESSION_RULE,
    "i++",
    new UnaryExpression(
      { row: 0, column: 0, position: 0 },
      undefined,
      undefined,
      new Identifier({ row: 0, column: 0, position: 0 }, "i"),
      undefined,
      PostfixOperatorKind.POSTFIX_INCREMENT,
      { row: 0, column: 1, position: 1 },
    ),
  );

  // lengthof operator
  testRule(
    parserRules.UNARY_EXPRESSION_RULE,
    "lengthof(i)",
    new UnaryExpression(
      { row: 0, column: 0, position: 0 },
      undefined,
      undefined,
      new LengthOfExpression(
        { row: 0, column: 0, position: 0 },
        { row: 0, column: 8, position: 8 },
        new Identifier({ row: 0, column: 9, position: 9 }, "i"),
        { row: 0, column: 10, position: 10 },
      ),
      undefined,
    ),
  );

  // lengthof with whitespace
  testRule(
    parserRules.UNARY_EXPRESSION_RULE,
    "lengthof ( i )",
    new UnaryExpression(
      { row: 0, column: 0, position: 0 },
      undefined,
      undefined,
      new LengthOfExpression(
        { row: 0, column: 0, position: 0 },
        { row: 0, column: 9, position: 9 },
        new Identifier({ row: 0, column: 11, position: 11 }, "i"),
        { row: 0, column: 13, position: 13 },
      ),
      undefined,
    ),
  );

  // expression in parenthesis
  testRule(
    parserRules.UNARY_EXPRESSION_RULE,
    "(1*2)",
    new UnaryExpression(
      { row: 0, column: 0, position: 0 },
      undefined,
      { row: 0, column: 0, position: 0 },
      new BinaryExpression(
        new UnaryExpression(
          { row: 0, column: 1, position: 1 },
          undefined,
          undefined,
          new NumberLiteral(
            { row: 0, column: 1, position: 1 },
            NumberLiteralKind.INTEGER,
            1,
            "1",
          ),
          undefined,
        ),
        BinaryOperatorKind.MULTIPLY,
        { row: 0, column: 2, position: 2 },
        new UnaryExpression(
          { row: 0, column: 3, position: 3 },
          undefined,
          undefined,
          new NumberLiteral(
            { row: 0, column: 3, position: 3 },
            NumberLiteralKind.INTEGER,
            2,
            "2",
          ),
          undefined,
        ),
      ),
      { row: 0, column: 4, position: 4 },
    ),
  );

  // expression in parenthesis with postfix operator and whitespace
  testRule(
    parserRules.UNARY_EXPRESSION_RULE,
    "( 1 * 2 ) ++",
    new UnaryExpression(
      { row: 0, column: 0, position: 0 },
      undefined,
      { row: 0, column: 0, position: 0 },
      new BinaryExpression(
        new UnaryExpression(
          { row: 0, column: 2, position: 2 },
          undefined,
          undefined,
          new NumberLiteral(
            { row: 0, column: 2, position: 2 },
            NumberLiteralKind.INTEGER,
            1,
            "1",
          ),
          undefined,
        ),
        BinaryOperatorKind.MULTIPLY,
        { row: 0, column: 4, position: 4 },
        new UnaryExpression(
          { row: 0, column: 6, position: 6 },
          undefined,
          undefined,
          new NumberLiteral(
            { row: 0, column: 6, position: 6 },
            NumberLiteralKind.INTEGER,
            2,
            "2",
          ),
          undefined,
        ),
      ),
      { row: 0, column: 8, position: 8 },
      PostfixOperatorKind.POSTFIX_INCREMENT,
      { row: 0, column: 10, position: 10 },
    ),
  );

  // TODO: further tests for
  //     ClassMemberAccessExpression |
  //     ArrayElementAccessExpression |
});

/*
Deno.test("Test binary expression rule - simple", () => {
  const input = "1 * 2";
  const expected: BinaryExpression = {
    kind: NodeKind.BINARY_EXPRESSION,
    leftOperand: {
      kind: NodeKind.UNARY_EXPRESSION,
      operatorTarget: {
        kind: NodeKind.NUMBER_LITERAL,
        numberLiteralKind: NumberLiteralKind.INTEGER,
        value: 1,
        verbatimValue: "1",
        location: { row: 0, column: 0 },
      },
    },
    binaryOperatorKind: BinaryOperatorKind.MULTIPLY,
    binaryOperatorLocation: { row: 0, column: 2 },
    rightOperand: {
      kind: NodeKind.UNARY_EXPRESSION,
      operatorTarget: {
        kind: NodeKind.NUMBER_LITERAL,
        numberLiteralKind: NumberLiteralKind.INTEGER,
        value: 2,
        verbatimValue: "2",
        location: { row: 0, column: 0 },
      },
    },
  };

  testRule(parserRules.BINARY_EXPRESSION_RULE, input, expected);
});

Deno.test("Test binary expression rule - mixed unary and binary", () => {
  const input = "i++ * lengthof(j)";
  const expected: BinaryExpression = {
    kind: NodeKind.BINARY_EXPRESSION,
    leftOperand: {
      kind: NodeKind.UNARY_EXPRESSION,
      operatorTarget: {
        kind: NodeKind.IDENTIFIER,
        name: "i",
        location: { row: 0, column: 0 },
      },
      postfixOperatorKind: PostfixOperatorKind.POSTFIX_INCREMENT,
    },
    binaryOperatorKind: BinaryOperatorKind.MULTIPLY,
    binaryOperatorLocation: { row: 0, column: 4 },
    rightOperand: {
      kind: NodeKind.UNARY_EXPRESSION,
      operatorTarget: {
        kind: NodeKind.LENGTH_OF_EXPRESSION,
        valueTarget: {
          kind: NodeKind.IDENTIFIER,
          name: "j",
          location: { row: 0, column: 15 },
        },
        location: { row: 0, column: 6 },
      },
    },
  };

  testRule(parserRules.BINARY_EXPRESSION_RULE, input, expected);
});

Deno.test("Test binary expression rule - nested", () => {
  const input = "((1 * 2) + 3) / (2 * 3)";
  const expected: BinaryExpression = {
    kind: NodeKind.BINARY_EXPRESSION,
    leftOperand: {
      kind: NodeKind.UNARY_EXPRESSION,
      operatorTarget: {
        kind: NodeKind.NUMBER_LITERAL,
        numberLiteralKind: NumberLiteralKind.INTEGER,
        value: 1,
        verbatimValue: "1",
        location: { row: 0, column: 2 },
      },
    },
    binaryOperatorKind: BinaryOperatorKind.MULTIPLY,
    binaryOperatorLocation: { row: 0, column: 4 },
    rightOperand: {
      kind: NodeKind.UNARY_EXPRESSION,
      operatorTarget: {
        kind: NodeKind.NUMBER_LITERAL,
        numberLiteralKind: NumberLiteralKind.INTEGER,
        value: 2,
        verbatimValue: "2",
        location: { row: 0, column: 6 },
      },
    },
  };

  testRule(parserRules.BINARY_EXPRESSION_RULE, input, expected);
});

Deno.test("Test binary expression rule - left associativity", () => {
  const input = "1 * 2 / 4";
  const expected: BinaryExpression = {
    kind: NodeKind.BINARY_EXPRESSION,
    leftOperand: {
      kind: NodeKind.UNARY_EXPRESSION,
      operatorTarget: {
        kind: NodeKind.NUMBER_LITERAL,
        numberLiteralKind: NumberLiteralKind.INTEGER,
        value: 1,
        verbatimValue: "1",
        location: { row: 0, column: 0 },
      },
    },
    binaryOperatorKind: BinaryOperatorKind.MULTIPLY,
    binaryOperatorLocation: { row: 0, column: 2 },
    rightOperand: {
      kind: NodeKind.UNARY_EXPRESSION,
      operatorTarget: {
        kind: NodeKind.NUMBER_LITERAL,
        numberLiteralKind: NumberLiteralKind.INTEGER,
        value: 2,
        verbatimValue: "2",
        location: { row: 0, column: 4 },
      },
    },
  };

  testRule(parserRules.BINARY_EXPRESSION_RULE, input, expected);
});

Deno.test("Test binary expression rule - precedence", () => {
  const input = "1 + 2 * 3 >> 2";
  const expected: BinaryExpression = {
    kind: NodeKind.BINARY_EXPRESSION,
    leftOperand: {
      kind: NodeKind.UNARY_EXPRESSION,
      operatorTarget: {
        kind: NodeKind.NUMBER_LITERAL,
        numberLiteralKind: NumberLiteralKind.INTEGER,
        value: 1,
        verbatimValue: "1",
      },
    },
    binaryOperatorKind: BinaryOperatorKind.MULTIPLY,
    rightOperand: {
      kind: NodeKind.UNARY_EXPRESSION,
      operatorTarget: {
        kind: NodeKind.NUMBER_LITERAL,
        numberLiteralKind: NumberLiteralKind.INTEGER,
        value: 2,
        verbatimValue: "2",
      },
    },
  };

  testRule(parserRules.BINARY_EXPRESSION_RULE, input, expected);
});

Deno.test("Test assignment expression rule", () => {
  const input = "i = 1 * 2";
  const expected: AssignmentExpression = {
    kind: NodeKind.ASSIGNMENT_EXPRESSION,
    valueTarget: {
      kind: NodeKind.IDENTIFIER,
      name: "i",
    },
    expression: {
      kind: NodeKind.BINARY_EXPRESSION,
      leftOperand: {
        kind: NodeKind.UNARY_EXPRESSION,
        operatorTarget: {
          kind: NodeKind.NUMBER_LITERAL,
          numberLiteralKind: NumberLiteralKind.INTEGER,
          value: 1,
          verbatimValue: "1",
        },
      },
      binaryOperatorKind: BinaryOperatorKind.MULTIPLY,
      rightOperand: {
        kind: NodeKind.UNARY_EXPRESSION,
        operatorTarget: {
          kind: NodeKind.NUMBER_LITERAL,
          numberLiteralKind: NumberLiteralKind.INTEGER,
          value: 2,
          verbatimValue: "2",
        },
      },
    },
  };

  testRule(parserRules.ASSIGNMENT_EXPRESSION_RULE, input, expected);

  // TODO: further test for valueTarget of ClassMemberAccessExpression
  // TODO: further test for valueTarget of ArrayElementAccessExpression
});

Deno.test("Test expression statement rule", () => {
  // assignment expression
  let input = "i = 1 * 2;";
  let expected: ExpressionStatement = {
    kind: NodeKind.EXPRESSION_STATEMENT,
    assignmentExpression: {
      kind: NodeKind.ASSIGNMENT_EXPRESSION,
      valueTarget: {
        kind: NodeKind.IDENTIFIER,
        name: "i",
      },
      expression: {
        kind: NodeKind.BINARY_EXPRESSION,
        leftOperand: {
          kind: NodeKind.UNARY_EXPRESSION,
          operatorTarget: {
            kind: NodeKind.NUMBER_LITERAL,
            numberLiteralKind: NumberLiteralKind.INTEGER,
            value: 1,
            verbatimValue: "1",
          },
        },
        binaryOperatorKind: BinaryOperatorKind.MULTIPLY,
        rightOperand: {
          kind: NodeKind.UNARY_EXPRESSION,
          operatorTarget: {
            kind: NodeKind.NUMBER_LITERAL,
            numberLiteralKind: NumberLiteralKind.INTEGER,
            value: 2,
            verbatimValue: "2",
          },
        },
      },
    },
  };

  testRule(parserRules.EXPRESSION_STATEMENT_RULE, input, expected);

  // expression
  input = "i++;";
  expected = {
    kind: NodeKind.EXPRESSION_STATEMENT,
    expression: {
      kind: NodeKind.UNARY_EXPRESSION,
      operatorTarget: {
        kind: NodeKind.IDENTIFIER,
        name: "i",
      },
      postfixOperatorKind: PostfixOperatorKind.POSTFIX_INCREMENT,
    },
  };

  testRule(parserRules.EXPRESSION_STATEMENT_RULE, input, expected);
});

Deno.test("Test compound statement rule", () => {
  const input = "{ utf8string foo; utf8string bar; }";
  const expected: CompoundStatement = {
    kind: NodeKind.COMPOUND_STATEMENT,
    statements: [
      {
        kind: NodeKind.STRING_DEFINITION,
        isConst: false,
        stringVariableKind: StringVariableKind.UTF8,
        identifier: {
          kind: NodeKind.IDENTIFIER,
          name: "foo",
        },
      },
      {
        kind: NodeKind.STRING_DEFINITION,
        isConst: false,
        stringVariableKind: StringVariableKind.UTF8,
        identifier: {
          kind: NodeKind.IDENTIFIER,
          name: "bar",
        },
      },
    ],
  };

  testRule(parserRules.COMPOUND_STATEMENT_RULE, input, expected);
});

Deno.test("Test compound statement rule - nested", () => {
  const input = "{ utf8string foo; { utf8string bar1; utf8string bar2; } }";
  const expected: CompoundStatement = {
    kind: NodeKind.COMPOUND_STATEMENT,
    statements: [
      {
        kind: NodeKind.STRING_DEFINITION,
        isConst: false,
        stringVariableKind: StringVariableKind.UTF8,
        identifier: {
          kind: NodeKind.IDENTIFIER,
          name: "foo",
        },
      },
      {
        kind: NodeKind.COMPOUND_STATEMENT,
        statements: [
          {
            kind: NodeKind.STRING_DEFINITION,
            isConst: false,
            stringVariableKind: StringVariableKind.UTF8,
            identifier: {
              kind: NodeKind.IDENTIFIER,
              name: "bar1",
            },
          },
          {
            kind: NodeKind.STRING_DEFINITION,
            isConst: false,
            stringVariableKind: StringVariableKind.UTF8,
            identifier: {
              kind: NodeKind.IDENTIFIER,
              name: "bar2",
            },
          },
        ],
      },
    ],
  };

  testRule(parserRules.COMPOUND_STATEMENT_RULE, input, expected);
});

Deno.test("Test compound statement rule - commented", () => {
  const input = "{ utf8string foo; // foo \n utf8string bar; // bar \n}";
  const expected: CompoundStatement = {
    kind: NodeKind.COMPOUND_STATEMENT,
    statements: [
      {
        kind: NodeKind.STRING_DEFINITION,
        isConst: false,
        stringVariableKind: StringVariableKind.UTF8,
        identifier: {
          kind: NodeKind.IDENTIFIER,
          name: "foo",
        },
      },
      {
        kind: NodeKind.COMMENT,
        comment: "foo",
      },
      {
        kind: NodeKind.STRING_DEFINITION,
        isConst: false,
        stringVariableKind: StringVariableKind.UTF8,
        identifier: {
          kind: NodeKind.IDENTIFIER,
          name: "bar",
        },
      },
      {
        kind: NodeKind.COMMENT,
        comment: "bar",
      },
    ],
  };

  testRule(parserRules.COMPOUND_STATEMENT_RULE, input, expected);
});

Deno.test("Test lengthof expression rule", () => {
  let input = "lengthof(i)";
  const expected: LengthOfExpression = {
    kind: NodeKind.LENGTH_OF_EXPRESSION,
    valueTarget: {
      kind: NodeKind.IDENTIFIER,
      name: "i",
    },
  };

  testRule(parserRules.LENGTHOF_EXPRESSION_RULE, input, expected);

  // whitespace
  input = " lengthof ( i ) ";
  testRule(parserRules.LENGTHOF_EXPRESSION_RULE, input, expected);

  // TODO: further tests for class member and array element access
});

Deno.test("Test number literal rule", () => {
  let input = "123";
  let expected: NumberLiteral = {
    kind: NodeKind.NUMBER_LITERAL,
    numberLiteralKind: NumberLiteralKind.INTEGER,
    value: 123,
    verbatimValue: "123",
  };

  testRule(parserRules.NUMBER_LITERAL_RULE, input, expected);

  input = "123.1";
  expected = {
    kind: NodeKind.NUMBER_LITERAL,
    numberLiteralKind: NumberLiteralKind.DECIMAL,
    value: 123.1,
    verbatimValue: "123.1",
  };

  testRule(parserRules.NUMBER_LITERAL_RULE, input, expected);

  input = "123.1e123";
  expected = {
    kind: NodeKind.NUMBER_LITERAL,
    numberLiteralKind: NumberLiteralKind.FLOATING_POINT,
    value: 123.1e123,
    verbatimValue: "123.1e123",
  };

  testRule(parserRules.NUMBER_LITERAL_RULE, input, expected);

  input = "0b11";
  expected = {
    kind: NodeKind.NUMBER_LITERAL,
    numberLiteralKind: NumberLiteralKind.BINARY,
    value: 3,
    verbatimValue: "0b11",
  };

  testRule(parserRules.NUMBER_LITERAL_RULE, input, expected);

  input = "0b0000.101";
  expected = {
    kind: NodeKind.NUMBER_LITERAL,
    numberLiteralKind: NumberLiteralKind.BINARY,
    value: 5,
    verbatimValue: "0b0000.101",
  };

  testRule(parserRules.NUMBER_LITERAL_RULE, input, expected);

  input = "0x0F";
  expected = {
    kind: NodeKind.NUMBER_LITERAL,
    numberLiteralKind: NumberLiteralKind.HEXADECIMAL,
    value: 15,
    verbatimValue: "0x0F",
  };

  testRule(parserRules.NUMBER_LITERAL_RULE, input, expected);

  input = "0x0000.FF";
  expected = {
    kind: NodeKind.NUMBER_LITERAL,
    numberLiteralKind: NumberLiteralKind.HEXADECIMAL,
    value: 255,
    verbatimValue: "0x0000.FF",
  };

  testRule(parserRules.NUMBER_LITERAL_RULE, input, expected);

  // whitespace
  input = " 0x0000.FF ";
  expected = {
    kind: NodeKind.NUMBER_LITERAL,
    numberLiteralKind: NumberLiteralKind.HEXADECIMAL,
    value: 255,
    verbatimValue: "0x0000.FF",
  };

  testRule(parserRules.NUMBER_LITERAL_RULE, input, expected);
});

// TODO: test line breaks
Deno.test("Test string literal rule", () => {
  let input = '"hello"';
  let expected: StringLiteral = {
    kind: NodeKind.STRING_LITERAL,
    stringLiteralKind: StringLiteralKind.BASIC,
    value: "hello",
    verbatimValue: '"hello"',
  };

  testRule(parserRules.STRING_LITERAL_RULE, input, expected);

  input = '"hello \\"world\\""';
  expected = {
    kind: NodeKind.STRING_LITERAL,
    stringLiteralKind: StringLiteralKind.BASIC,
    value: 'hello "world"',
    verbatimValue: '"hello \\"world\\""',
  };

  testRule(parserRules.STRING_LITERAL_RULE, input, expected);

  input = '"hello \\\\world\\\\"';
  expected = {
    kind: NodeKind.STRING_LITERAL,
    stringLiteralKind: StringLiteralKind.BASIC,
    value: "hello \\world\\",
    verbatimValue: '"hello \\\\world\\\\"',
  };

  testRule(parserRules.STRING_LITERAL_RULE, input, expected);

  input = 'u8"hello πό"';
  expected = {
    kind: NodeKind.STRING_LITERAL,
    stringLiteralKind: StringLiteralKind.UTF8,
    value: "hello πό",
    verbatimValue: 'u8"hello πό"',
  };

  testRule(parserRules.STRING_LITERAL_RULE, input, expected);

  input = 'u"hello πό"';
  expected = {
    kind: NodeKind.STRING_LITERAL,
    stringLiteralKind: StringLiteralKind.UTF16,
    value: "hello πό",
    verbatimValue: 'u"hello πό"',
  };

  testRule(parserRules.STRING_LITERAL_RULE, input, expected);

  input = 'u"hello \\u1234"';
  expected = {
    kind: NodeKind.STRING_LITERAL,
    stringLiteralKind: StringLiteralKind.UTF16,
    value: "hello \u{1234}",
    verbatimValue: 'u"hello \\u1234"',
  };

  testRule(parserRules.STRING_LITERAL_RULE, input, expected);

  input = 'u"hello \\U00001234"';
  expected = {
    kind: NodeKind.STRING_LITERAL,
    stringLiteralKind: StringLiteralKind.UTF16,
    value: "hello \u{1234}",
    verbatimValue: 'u"hello \\U00001234"',
  };

  testRule(parserRules.STRING_LITERAL_RULE, input, expected);
});

Deno.test("Test alignment rule", () => {
  let input = "aligned";
  let expected: Alignment = {
    kind: NodeKind.ALIGNMENT,
    bitAlignment: 8,
    isDefault8BitAlignment: true,
  };

  testRule(parserRules.ALIGNMENT_RULE, input, expected);

  input = "aligned(8)";
  expected = {
    kind: NodeKind.ALIGNMENT,
    bitAlignment: 8,
    isDefault8BitAlignment: false,
  };

  testRule(parserRules.ALIGNMENT_RULE, input, expected);

  input = "aligned(16)";
  expected = {
    kind: NodeKind.ALIGNMENT,
    bitAlignment: 16,
    isDefault8BitAlignment: false,
  };

  testRule(parserRules.ALIGNMENT_RULE, input, expected);

  // whitespace
  input = " aligned ( 16 ) ";
  testRule(parserRules.ALIGNMENT_RULE, input, expected);
});

Deno.test("Test alignment with illegal bit alignment value fails to parse", () => {
  const input = "aligned(17)";
  const expected: Alignment = {
    kind: NodeKind.ALIGNMENT,
    bitAlignment: 17,
    isDefault8BitAlignment: false,
  };

  assertThrows(
    () => testRule(parserRules.ALIGNMENT_RULE, input, expected),
    SyntacticParserError,
    "Illegal bit alignment",
  );
});

Deno.test("Test string definition rule", () => {
  let input = "utf8string foo;";
  const expected: StringDefinition = {
    kind: NodeKind.STRING_DEFINITION,
    isConst: false,
    stringVariableKind: StringVariableKind.UTF8,
    identifier: {
      kind: NodeKind.IDENTIFIER,
      name: "foo",
    },
  };

  testRule(parserRules.STRING_DEFINITION_RULE, input, expected);

  input = "const utfstring foo;";
  expected.isConst = true;
  expected.stringVariableKind = StringVariableKind.UTF16;

  testRule(parserRules.STRING_DEFINITION_RULE, input, expected);

  input = "aligned utfstring foo;";
  expected.isConst = false;
  expected.alignment = {
    kind: NodeKind.ALIGNMENT,
    isDefault8BitAlignment: true,
    bitAlignment: 8,
  };

  testRule(parserRules.STRING_DEFINITION_RULE, input, expected);

  input = "aligned (16) utfstring foo;";
  expected.alignment.isDefault8BitAlignment = false;
  expected.alignment.bitAlignment = 16;

  testRule(parserRules.STRING_DEFINITION_RULE, input, expected);

  input = 'utfstring foo = u"hello";';
  delete expected.alignment;
  expected.stringLiteral = {
    kind: NodeKind.STRING_LITERAL,
    stringLiteralKind: StringLiteralKind.UTF16,
    value: "hello",
    verbatimValue: 'u"hello"',
  };

  testRule(parserRules.STRING_DEFINITION_RULE, input, expected);

  input = 'utf8list foo = u8"hello world";';
  expected.stringVariableKind = StringVariableKind.UTF8_LIST;
  expected.stringLiteral = {
    kind: NodeKind.STRING_LITERAL,
    stringLiteralKind: StringLiteralKind.UTF8,
    value: "hello world",
    verbatimValue: 'u8"hello world"',
  };

  testRule(parserRules.STRING_DEFINITION_RULE, input, expected);

  input = 'base64string foo = "aGVsbG8K";';
  expected.stringVariableKind = StringVariableKind.BASE64;
  expected.stringLiteral = {
    kind: NodeKind.STRING_LITERAL,
    stringLiteralKind: StringLiteralKind.BASIC,
    value: "aGVsbG8K",
    verbatimValue: '"aGVsbG8K"',
  };

  testRule(parserRules.STRING_DEFINITION_RULE, input, expected);
});

Deno.test("Test string definition with differing string literal type fails to parse", () => {
  let input = 'base64string foo = u"aGVsbG8K";';
  const expected: StringDefinition = {
    kind: NodeKind.STRING_DEFINITION,
    isConst: false,
    stringVariableKind: StringVariableKind.UTF8,
    identifier: {
      kind: NodeKind.IDENTIFIER,
      name: "foo",
    },
  };

  assertThrows(
    () => testRule(parserRules.STRING_DEFINITION_RULE, input, expected),
    SyntacticParserError,
    "Illegal string literal type",
  );

  input = 'utf8string foo = "hello";';

  assertThrows(
    () => testRule(parserRules.STRING_DEFINITION_RULE, input, expected),
    SyntacticParserError,
    "Illegal string literal type",
  );

  input = 'utfstring foo = u8"hello";';

  assertThrows(
    () => testRule(parserRules.STRING_DEFINITION_RULE, input, expected),
    SyntacticParserError,
    "Illegal string literal type",
  );
});

Deno.test("Test statement rule for comment", () => {
  const input = "// hello world";
  const expected: Statement = {
    kind: NodeKind.COMMENT,
    comment: "hello world",
  };

  testRule(parserRules.STATEMENT_RULE, input, expected);
});

Deno.test("Test statement rule for string definition", () => {
  const input = "utf8string foo;";
  const expected: Statement = {
    kind: NodeKind.STRING_DEFINITION,
    isConst: false,
    stringVariableKind: StringVariableKind.UTF8,
    identifier: {
      kind: NodeKind.IDENTIFIER,
      name: "foo",
    },
  };

  testRule(parserRules.STATEMENT_RULE, input, expected);
});

Deno.test("Test statement rule for compound statement", () => {
  const input = "{ utf8string foo; utf8string bar; }";
  const expected: Statement = {
    kind: NodeKind.COMPOUND_STATEMENT,
    statements: [
      {
        kind: NodeKind.STRING_DEFINITION,
        isConst: false,
        stringVariableKind: StringVariableKind.UTF8,
        identifier: {
          kind: NodeKind.IDENTIFIER,
          name: "foo",
        },
      },
      {
        kind: NodeKind.STRING_DEFINITION,
        isConst: false,
        stringVariableKind: StringVariableKind.UTF8,
        identifier: {
          kind: NodeKind.IDENTIFIER,
          name: "bar",
        },
      },
    ],
  };

  testRule(parserRules.STATEMENT_RULE, input, expected);
});

Deno.test("Test statement rule for compound statement - with new lines and comments", () => {
  const input = "{ // foo \n utf8string foo; \n // bar \n utf8string bar; \n }";
  const expected: Statement = {
    kind: NodeKind.COMPOUND_STATEMENT,
    statements: [
      {
        kind: NodeKind.COMMENT,
        comment: "foo",
      },
      {
        kind: NodeKind.STRING_DEFINITION,
        isConst: false,
        stringVariableKind: StringVariableKind.UTF8,
        identifier: {
          kind: NodeKind.IDENTIFIER,
          name: "foo",
        },
      },
      {
        kind: NodeKind.COMMENT,
        comment: "bar",
      },
      {
        kind: NodeKind.STRING_DEFINITION,
        isConst: false,
        stringVariableKind: StringVariableKind.UTF8,
        identifier: {
          kind: NodeKind.IDENTIFIER,
          name: "bar",
        },
      },
    ],
  };

  testRule(parserRules.STATEMENT_RULE, input, expected);
});

Deno.test("Test statement rule for compound statement - with comments and commented statements", () => {
  const input = "{ \n // foo \n utf8string foo; \n utf8string bar; // bar\n }";
  const expected: Statement = {
    kind: NodeKind.COMPOUND_STATEMENT,
    statements: [
      {
        kind: NodeKind.COMMENT,
        comment: "foo",
      },
      {
        kind: NodeKind.STRING_DEFINITION,
        isConst: false,
        stringVariableKind: StringVariableKind.UTF8,
        identifier: {
          kind: NodeKind.IDENTIFIER,
          name: "foo",
        },
      },
      {
        kind: NodeKind.STRING_DEFINITION,
        isConst: false,
        stringVariableKind: StringVariableKind.UTF8,
        identifier: {
          kind: NodeKind.IDENTIFIER,
          name: "bar",
        },
      },
      {
        kind: NodeKind.COMMENT,
        comment: "bar",
      },
    ],
  };

  testRule(parserRules.STATEMENT_RULE, input, expected);
});

Deno.test("Test specification rule", () => {
  let input = "// hello world";
  let expected: Specification = {
    kind: NodeKind.SPECIFICATION,
    globals: [
      {
        kind: NodeKind.COMMENT,
        comment: "hello world",
      },
    ],
  };

  testRule(parserRules.SPECIFICATION_RULE, input, expected);

  input = "// hello \n // world";
  expected = {
    kind: NodeKind.SPECIFICATION,
    globals: [
      {
        kind: NodeKind.COMMENT,
        comment: "hello",
      },
      {
        kind: NodeKind.COMMENT,
        comment: "world",
      },
    ],
  };

  testRule(parserRules.SPECIFICATION_RULE, input, expected);

  // TODO: add tests for class_declaration and class_declaration followed by comment
});
*/
