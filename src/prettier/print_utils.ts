import type { Doc } from "prettier";
import { doc } from "prettier";
const { hardline, indent, join } = doc.builders;

export function cleanupTrivia(node: AbstractNode) {
  for (const token of node.getSyntaxTokenIterable()) {
    token.leadingTrivia = token.leadingTrivia.filter((trivia) =>
      trivia.tokenKind !== TokenKind.WHITESPACE_TOKEN
    );
    token.trailingTrivia = token.trailingTrivia.filter((trivia) =>
      trivia.tokenKind !== TokenKind.WHITESPACE_TOKEN
    );
  }
}

function getCommentString(trivia: Trivia): string {
  if (trivia.tokenKind !== TokenKind.COMMENT_TOKEN) {
    throw new Error(
      "Logic Error: Expected a comment token: " + JSON.stringify(trivia),
    );
  }
  if (!trivia.text.startsWith("//")) {
    throw new Error(
      "Logic Error: Expected comment to start with // : " +
        JSON.stringify(trivia),
    );
  }
  // Remove leading "//" from the comment text
  const commentText = trivia.text.replace(/^\s*\/\/\s*/, "").trim();
  return "// " + commentText;
}

/**
 * Returns a doc for the leading trivia of a syntax token.
 * @param syntaxToken The syntax token to get the leading trivia for.
 * @param indentLeadingTriviaAsIndentIsCompleting Whether to indent the leading trivia as if it is completing a line.
 *
 * Note that if indentLeadingTriviaAsIndentIsCompleting is true, the leading trivia will include a hardline as this
 * is required to perform the indent.
 */
function getLeadingTriviaDoc(
  syntaxToken: SyntaxToken,
  indentLeadingTriviaAsIndentIsCompleting: boolean,
): Doc[] {
  if (!syntaxToken.leadingTrivia.length) {
    if (indentLeadingTriviaAsIndentIsCompleting) {
      return [hardline];
    }
    return [];
  }

  const elements = join(
    hardline,
    syntaxToken.leadingTrivia.map((trivia) => getCommentString(trivia)),
  );

  if (indentLeadingTriviaAsIndentIsCompleting) {
    return [
      indent(
        [hardline, elements],
      ),
      hardline,
    ];
  }

  return [
    elements,
    hardline,
  ];
}

function getTrailingTriviaDoc(syntaxToken: SyntaxToken): Doc[] {
  if (!syntaxToken.trailingTrivia.length) {
    return [];
  }

  return [
    " ",
    join(
      hardline,
      syntaxToken.trailingTrivia.map((trivia) => getCommentString(trivia)),
    ),
    hardline,
  ];
}

export function getDocWithTrivia(
  token: SyntaxToken,
  indentLeadingTriviaAsIndentIsCompleting = false,
): Doc[] {
  const leadingTriviaDoc = getLeadingTriviaDoc(
    token,
    indentLeadingTriviaAsIndentIsCompleting,
  );
  const trailingTriviaDoc = getTrailingTriviaDoc(token);

  return [
    leadingTriviaDoc,
    token.text,
    trailingTriviaDoc,
  ];
}

export function addCommaSeparatorsToDoc(
  valuesDoc: Doc[],
  commaSeparatorTokens: SyntaxToken[] | undefined,
): Doc[] {
  if (commaSeparatorTokens === undefined) {
    if (valuesDoc.length > 1) {
      throw new Error(
        `Logic Error: Number of values: ${valuesDoc.length} and no comma separators provided`,
      );
    }
    return valuesDoc;
  }

  if (valuesDoc.length !== commaSeparatorTokens.length + 1) {
    throw new Error(
      `Logic Error: Number of values: ${valuesDoc.length} and comma separators: ${commaSeparatorTokens.length} are not as expected`,
    );
  }

  const result: Doc[] = [];
  for (let i = 0; i < valuesDoc.length; i++) {
    if (i < commaSeparatorTokens.length) {
      result.push([
        valuesDoc[i],
        getDocWithTrivia(commaSeparatorTokens[i]),
      ]);
    } else {
      result.push(valuesDoc[i]);
    }
  }

  return result;
}
