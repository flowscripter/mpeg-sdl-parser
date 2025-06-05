import type { Text } from "@codemirror/state";
import type Location from "./Location.ts";
import { getLocationFromTextPosition } from "./util/locationUtils.ts";

/**
 * Base error class.
 */
export abstract class ParseError extends Error {
  protected constructor(
    public errorMessage: string,
    public location?: Location,
  ) {
    super(
      errorMessage +
        (location
          ? ` => { row: ${location.row}, column: ${location.column}, position: ${location.position} }`
          : ""),
    );
  }
}

/**
 * Indicates an internal logic error in the parsing implementation.
 */
export class InternalParseError extends ParseError {
  constructor(errorMessage: string, location?: Location) {
    super(`INTERNAL ERROR: ${errorMessage}`, location);
  }
}

/**
 * Indicates a syntactic error when parsing.
 */
export class SyntacticParseError extends ParseError {
  constructor(
    errorMessage: string,
    location?: Location,
    public errorLine?: string,
    public preceedingLines?: string[],
  ) {
    super(`SYNTACTIC ERROR: ${errorMessage}`, location);
  }
}

/**
 * Helper function to create a SyntacticParseError from a position in the text.
 *
 * @param text The text to parse.
 * @param position The position in the text, 0-based.
 */
export function createSyntacticParseError(
  text: Text,
  position: number,
): SyntacticParseError {
  const line = text.lineAt(position);
  const location = getLocationFromTextPosition(text, position);
  const preceedingLines = [];
  // Collect up to two preceding lines if available
  if (location.row > 1) {
    // First preceding line (if exists)
    preceedingLines.push(text.line(location.row - 1).text);
    // Second preceding line (if exists)
    if (location.row > 2) {
      preceedingLines.unshift(text.line(location.row - 2).text);
    }
  }

  return new SyntacticParseError(
    "Parse error",
    location,
    line.text,
    preceedingLines,
  );
}
