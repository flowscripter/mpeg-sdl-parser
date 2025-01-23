import type { TokenKind } from "../enum/token_kind.ts";
import type { Location } from "./Location.ts";

/**
 * Represents an abstract base class for tokens.
 * This class should be extended by specific token implementations.
 *
 * @abstract
 */
export abstract class AbstractToken {
  constructor(
    public readonly tokenKind: TokenKind,
    public readonly location: Location,
    public readonly text: string,
  ) {
  }
}
