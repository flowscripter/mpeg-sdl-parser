import type TokenKind from "../enum/token_kind.ts";
import type Location from "./Location.ts";

abstract class AbstractToken {
  constructor(
    public readonly tokenKind: TokenKind,
    public readonly location: Location,
    public readonly text: string,
  ) {
  }
}

export default AbstractToken;
