import type { Location } from "../../Location";
import type { Trivia } from "./Trivia";

/**
 * ParseToken represents a token from the parsing process.
 */
export interface Token {
  readonly text: string;
  readonly location: Location;
  leadingTrivia: Trivia[];
  trailingTrivia: Trivia[];
}
