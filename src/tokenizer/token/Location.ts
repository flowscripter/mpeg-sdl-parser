/**
 * Represents a location within a text document.
 *
 * @interface Location
 * @property {number} position - The zero-based index position within the entire text.
 * @property {number} row - The one-based row number in the text document.
 * @property {number} column - The one-based column number in the text document.
 */
export interface Location {
  readonly position: number;
  readonly row: number;
  readonly column: number;
}
