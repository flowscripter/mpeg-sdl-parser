import { apply, opt_sc, seq } from "../../../deps.ts";
import AlignedModifier from "../../abstract_syntax_tree/node/AlignedModifier.ts";
import NumberLiteralKind from "../../abstract_syntax_tree/node/enum/number_literal_kind.ts";
import NumberLiteral from "../../abstract_syntax_tree/node/NumberLiteral.ts";
import TokenKind from "../../tokenizer/enum/token_kind.ts";
import { getToken } from "../../tokenizer/parsec/ParsecTokenWrapper.ts";
import SyntaxToken from "../../tokenizer/token/SyntaxToken.ts";
import {
  InternalParserError,
  SyntacticParserError,
} from "../../util/ParserError.ts";
import { NUMBER_LITERAL_RULE } from "../syntax_rules.ts";

function getAlignedModifier(
  values: [
    SyntaxToken,
    SyntaxToken | undefined,
    NumberLiteral | undefined,
    SyntaxToken | undefined,
  ],
): AlignedModifier {
  const [
    alignedToken,
    openParenthesisToken,
    numberLiteral,
    closeParenthesisToken,
  ] = values;

  let bitCount = 8;

  if (numberLiteral) {
    if (
      (numberLiteral.numberLiteralKind !== NumberLiteralKind.INTEGER) &&
      (numberLiteral.numberLiteralKind !== NumberLiteralKind.BINARY) &&
      (numberLiteral.numberLiteralKind !== NumberLiteralKind.HEXADECIMAL) &&
      (numberLiteral.numberLiteralKind !== NumberLiteralKind.MULTIPLE_CHARACTER)
    ) {
      throw new InternalParserError(
        `Unsupported NumberLiteralKind: ${
          NumberLiteralKind[numberLiteral.numberLiteralKind]
        } for aligned bit count`,
        numberLiteral.tokens[0],
      );
    }

    bitCount = numberLiteral.value;

    if (
      (bitCount !== 8) && (bitCount !== 16) && (bitCount !== 32) &&
      (bitCount !== 64) && (bitCount !== 128)
    ) {
      throw new SyntacticParserError(
        `Illegal aligned bit count: ${bitCount}, allowed values are 8, 16, 32, 64 and 128`,
        numberLiteral.tokens[0],
      );
    }
  }

  return new AlignedModifier(
    bitCount,
    numberLiteral === undefined,
    numberLiteral,
    alignedToken,
    openParenthesisToken,
    closeParenthesisToken,
  );
}

function getAlignedModifierPattern() {
  return apply(
    seq(
      getToken(TokenKind.KEYWORD_ALIGNED_TOKEN),
      opt_sc(
        getToken(TokenKind.PUNCTUATOR_OPEN_PARENTHESIS_TOKEN),
      ),
      opt_sc(
        NUMBER_LITERAL_RULE,
      ),
      opt_sc(
        getToken(TokenKind.PUNCTUATOR_CLOSE_PARENTHESIS_TOKEN),
      ),
    ),
    getAlignedModifier,
  );
}

export default getAlignedModifierPattern;
