# mpeg-sdl-parser

> ISO/IEC 14496-34 Syntactic Description Language (MPEG SDL) parser implemented
> in TypeScript

**NOTE: Under development**

- fix GitHub workflows
- implement control flow parsing: `do`, `for`, `if`, `switch`, `while`
- publish to registry
- provide separate CLI module: 
    - test library module exports
    - implement pretty printer
    - implement syntax highlighter
- update this readme with:
    - import location for module
    - updated UML diagram
    - link to API documentation
    - link to CLI
- implement semantic checks

## Development

Install [Deno](https://docs.deno.com/runtime/getting_started/installation/)

Lint: `deno fmt`

Test: `deno test -A`

## Usage

```typescript
// TODO: location pending
// import * from "https://deno.land/x/flowscripter_mped_sdl_parser_library/mod.ts";

const parser = new Parser();

// Parse SDL and produce an AST (abstract syntax tree)

const ast = parser.parse("computed int i;");

console.log(JSON.stringify(ast));

class MyNodeVisitor implements NodeVisitor {
  visitBefore(node: AbstractNode): boolean {
    return true;
  }

  visitAfter(_node: AbstractNode): boolean {
    return true;
  }
}

const myNodeVisitor = new MyNodeVisitor();
const traversingVisitor = new TraversingVisitor(myNodeVisitor);

// Traverse the AST

ast.accept(traversingVisitor);

```

## Documentation

### Overview

The parser is implemented using Microsoft's Typescript based parser combinator
library [ts-parsec](https://github.com/microsoft/ts-parsec).

Tokenization and parsing rules are developed referencing the SDL EBNF stored in
this repository: [grammar.txt](grammar.txt)

Parsing an SDL definition results in an abstract syntax tree output which can
then be used for further processing in consuming applications.

**NOTE: TODO: diagram below updating soon!**

```mermaid
classDiagram
    
    class Parser {
        parse(specificationString) Specification
    }

    Tokenizer ..> TokenKind

    Parser --> Tokenizer : uses
    
    Parser --> "*" Rule : uses
    
    Parser --> Definition : produces
```

### API

Link to auto-generated API docs for the library:

**NOTE: TODO: coming soon!**
[API Documentation](https://doc.deno.land/https://deno.land/x/flowscripter_mpeg_sdl_parser/mod.ts)

### Debug Logging

Internal framework logging can be enabled by setting the `MPEG_SDL_PARSER_DEBUG`
environment variable. (Permission will need to be granted to the CLI to access
the environment to look for this environment variable i.e. `--allow-env`.)

The `logger` implementation will detect this and define a default Deno
`ConsoleHandler` logger with `DEBUG` level which is used by internal
implementation classes such as the `parser` and `tokenizer`.

## License

MIT © Flowscripter
