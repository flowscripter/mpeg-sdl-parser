/**
 * Represents a location within a text document.
 *
 * @interface Location
 * @property {number} position - The zero-based index position within the entire text.
 * @property {number} row - The zero-based row number in the text document.
 * @property {number} column - The zero-based column number in the text document.
 */
interface Location {
  readonly position: number;
  readonly row: number;
  readonly column: number;
}

export default Location;
