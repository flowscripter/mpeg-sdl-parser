import { expect } from "bun:test";
import { TokenKind } from "../../src/tokenizer/enum/token_kind.ts";
import { Tokenizer } from "../../src/tokenizer/Tokenizer.ts";

function testTokenizer(
  input: string,
  expectedTokens: [
    TokenKind,
    string,
    TokenKind[],
    string[],
    TokenKind[],
    string[],
  ][],
): void {
  const tokenizer = new Tokenizer();
  let parsecTokenWrapper = tokenizer.parse(input);

  for (const expectedToken of expectedTokens) {
    const [
      tokenKind,
      text,
      leadingTriviaTokenKinds,
      leadingTriviaTexts,
      trailingTriviaTokenKinds,
      trailingTriviaTexts,
    ] = expectedToken;

    expect(parsecTokenWrapper).not.toBeUndefined();

    const syntaxToken = parsecTokenWrapper!.getSyntaxToken();

    expect(
      syntaxToken.tokenKind,
      `token.tokenKind: ${TokenKind[syntaxToken.tokenKind]} != ${
        TokenKind[expectedToken[0]]
      }, text: ${syntaxToken.text} for text: ${syntaxToken.text}`,
    ).toEqual(
      tokenKind,
    );
    expect(
      syntaxToken.text,
      `token.text: ${syntaxToken.text} != ${expectedToken[1]} for tokenKind: ${
        TokenKind[syntaxToken.tokenKind]
      }`,
    ).toEqual(
      text,
    );

    expect(
      syntaxToken.leadingTrivia.length,
      `token.leadingTrivia.length: ${syntaxToken.leadingTrivia.length} != ${leadingTriviaTokenKinds.length} for tokenKind: ${
        TokenKind[syntaxToken.tokenKind]
      } with text: ${syntaxToken.text}`,
    ).toEqual(
      leadingTriviaTokenKinds.length,
    );

    for (let i = 0; i < leadingTriviaTokenKinds.length; i++) {
      const actual = syntaxToken.leadingTrivia[i].tokenKind;
      const expected = leadingTriviaTokenKinds[i];
      expect(
        actual,
        `token.leadingTrivia[${i}].tokenKind: ${actual} != ${expected} for tokenKind: ${
          TokenKind[syntaxToken.tokenKind]
        } with text: ${syntaxToken.text}`,
      ).toEqual(
        expected,
      );
    }

    expect(
      syntaxToken.leadingTrivia.length,
      `token.leadingTrivia.length: ${syntaxToken.leadingTrivia.length} != ${leadingTriviaTexts.length} for tokenKind: ${
        TokenKind[syntaxToken.tokenKind]
      } with text: ${syntaxToken.text}`,
    ).toEqual(
      leadingTriviaTexts.length,
    );

    for (let i = 0; i < leadingTriviaTexts.length; i++) {
      const actual = syntaxToken.leadingTrivia[i].text;
      const expected = leadingTriviaTexts[i];
      expect(
        actual,
        `token.leadingTrivia[${i}].text: ${actual} != ${expected} for tokenKind: ${
          TokenKind[syntaxToken.tokenKind]
        } with text: ${syntaxToken.text}`,
      ).toEqual(
        expected,
      );
    }

    expect(
      syntaxToken.trailingTrivia.length,
      `token.trailingTrivia.length: ${syntaxToken.trailingTrivia.length} != ${trailingTriviaTokenKinds.length} for tokenKind: ${
        TokenKind[syntaxToken.tokenKind]
      } with text: ${syntaxToken.text}`,
    ).toEqual(
      trailingTriviaTokenKinds.length,
    );

    for (let i = 0; i < trailingTriviaTokenKinds.length; i++) {
      const actual = syntaxToken.trailingTrivia[i].tokenKind;
      const expected = trailingTriviaTokenKinds[i];
      expect(
        actual,
        `token.trailingTrivia[${i}].tokenKind: ${actual} != ${expected} for tokenKind: ${
          TokenKind[syntaxToken.tokenKind]
        } with text: ${syntaxToken.text}`,
      ).toEqual(
        expected,
      );
    }

    expect(
      syntaxToken.trailingTrivia.length,
      `token.trailingTrivia.length: ${syntaxToken.trailingTrivia.length} != ${trailingTriviaTexts.length} for tokenKind: ${
        TokenKind[syntaxToken.tokenKind]
      } with text: ${syntaxToken.text}`,
    ).toEqual(
      trailingTriviaTexts.length,
    );

    for (let i = 0; i < trailingTriviaTexts.length; i++) {
      const actual = syntaxToken.trailingTrivia[i].text;
      const expected = trailingTriviaTexts[i];
      expect(
        actual,
        `token.trailingTrivia[${i}].text: ${actual} != ${expected} for tokenKind: ${
          TokenKind[syntaxToken.tokenKind]
        } with text: ${syntaxToken.text}`,
      ).toEqual(
        expected,
      );
    }

    parsecTokenWrapper = parsecTokenWrapper!.next;
  }
  expect(parsecTokenWrapper).toBeUndefined();
}

export default testTokenizer;
