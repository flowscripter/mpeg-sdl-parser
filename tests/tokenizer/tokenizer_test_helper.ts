import { TokenKind } from "../../src/tokenizer/enum/token_kind.ts";
import { Tokenizer } from "../../src/tokenizer/Tokenizer.ts";
import { assertEquals, assertNotEquals } from "../test_deps.ts";

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

    assertNotEquals(parsecTokenWrapper, undefined);

    const syntaxToken = parsecTokenWrapper!.getSyntaxToken();

    assertEquals(
      syntaxToken.tokenKind,
      tokenKind,
      `token.tokenKind: ${TokenKind[syntaxToken.tokenKind]} != ${
        TokenKind[expectedToken[0]]
      }, text: ${syntaxToken.text} for text: ${syntaxToken.text}`,
    );
    assertEquals(
      syntaxToken.text,
      text,
      `token.text: ${syntaxToken.text} != ${expectedToken[1]} for tokenKind: ${
        TokenKind[syntaxToken.tokenKind]
      }`,
    );

    assertEquals(
      syntaxToken.leadingTrivia.length,
      leadingTriviaTokenKinds.length,
      `token.leadingTrivia.length: ${syntaxToken.leadingTrivia.length} != ${leadingTriviaTokenKinds.length} for tokenKind: ${
        TokenKind[syntaxToken.tokenKind]
      } with text: ${syntaxToken.text}`,
    );

    for (let i = 0; i < leadingTriviaTokenKinds.length; i++) {
      const actual = syntaxToken.leadingTrivia[i].tokenKind;
      const expected = leadingTriviaTokenKinds[i];
      assertEquals(
        actual,
        expected,
        `token.leadingTrivia[${i}].tokenKind: ${actual} != ${expected} for tokenKind: ${
          TokenKind[syntaxToken.tokenKind]
        } with text: ${syntaxToken.text}`,
      );
    }

    assertEquals(
      syntaxToken.leadingTrivia.length,
      leadingTriviaTexts.length,
      `token.leadingTrivia.length: ${syntaxToken.leadingTrivia.length} != ${leadingTriviaTexts.length} for tokenKind: ${
        TokenKind[syntaxToken.tokenKind]
      } with text: ${syntaxToken.text}`,
    );

    for (let i = 0; i < leadingTriviaTexts.length; i++) {
      const actual = syntaxToken.leadingTrivia[i].text;
      const expected = leadingTriviaTexts[i];
      assertEquals(
        actual,
        expected,
        `token.leadingTrivia[${i}].text: ${actual} != ${expected} for tokenKind: ${
          TokenKind[syntaxToken.tokenKind]
        } with text: ${syntaxToken.text}`,
      );
    }

    assertEquals(
      syntaxToken.trailingTrivia.length,
      trailingTriviaTokenKinds.length,
      `token.trailingTrivia.length: ${syntaxToken.trailingTrivia.length} != ${trailingTriviaTokenKinds.length} for tokenKind: ${
        TokenKind[syntaxToken.tokenKind]
      } with text: ${syntaxToken.text}`,
    );

    for (let i = 0; i < trailingTriviaTokenKinds.length; i++) {
      const actual = syntaxToken.trailingTrivia[i].tokenKind;
      const expected = trailingTriviaTokenKinds[i];
      assertEquals(
        actual,
        expected,
        `token.trailingTrivia[${i}].tokenKind: ${actual} != ${expected} for tokenKind: ${
          TokenKind[syntaxToken.tokenKind]
        } with text: ${syntaxToken.text}`,
      );
    }

    assertEquals(
      syntaxToken.trailingTrivia.length,
      trailingTriviaTexts.length,
      `token.trailingTrivia.length: ${syntaxToken.trailingTrivia.length} != ${trailingTriviaTexts.length} for tokenKind: ${
        TokenKind[syntaxToken.tokenKind]
      } with text: ${syntaxToken.text}`,
    );

    for (let i = 0; i < trailingTriviaTexts.length; i++) {
      const actual = syntaxToken.trailingTrivia[i].text;
      const expected = trailingTriviaTexts[i];
      assertEquals(
        actual,
        expected,
        `token.trailingTrivia[${i}].text: ${actual} != ${expected} for tokenKind: ${
          TokenKind[syntaxToken.tokenKind]
        } with text: ${syntaxToken.text}`,
      );
    }

    parsecTokenWrapper = parsecTokenWrapper!.next;
  }
  assertEquals(parsecTokenWrapper, undefined);
}

export default testTokenizer;
