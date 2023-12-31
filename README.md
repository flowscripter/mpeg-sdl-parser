# mpeg-sdl-parser

> ISO/IEC 14496-34 Syntactic Description Language (MPEG SDL) parser implemented
> in TypeScript

**NOTE: Under development**

## Development

Install [Deno](https://deno.land/manual/getting_started/installation)

Test: `deno test -A --unstable`

Lint: `deno fmt`

## Usage

```typescript
import sdl from "https://deno.land/x/flowscripter_mped_sdl_parser_library/mod.ts";

// Parse SDL and output an abstract syntax tree
console.log(sdl.parse("// hello world"));
```

## Documentation

### Overview

The parser is implemented using Microsoft's Typescript based parser combinator
library [ts-parsec](https://github.com/microsoft/ts-parsec).

Tokenization and parsing rules are developed referencing the SDL EBNF stored in
this repository: [grammar.txt](grammar.txt)

Parsing an SDL definition results in an abstract syntax tree output which can
then be used for further processing in consuming applications.


```mermaid
classDiagram
    
    class Parser {
        parse(definitionString) Definition
    }

    Tokenizer ..> TokenKind

    Parser --> Tokenizer : uses
    
    Parser --> "*" Rule : uses
    
    Parser --> Definition : produces
```

### API

Link to auto-generated API docs for the library:

**NOTE: coming soon!**
[API Documentation](https://doc.deno.land/https://deno.land/x/flowscripter_mpeg_sdl_parser/mod.ts)

## License

MIT © Flowscripter
