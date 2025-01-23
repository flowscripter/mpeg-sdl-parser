# mpeg-sdl-parser

> ISO/IEC 14496-34 Syntactic Description Language (MPEG SDL) parser implemented
> in TypeScript

[![version](https://img.shields.io/github/v/release/flowscripter/mpeg-sdl-parser?sort=semver)](https://github.com/flowscripter/mpeg-sdl-parser/releases)
[![build](https://img.shields.io/github/actions/workflow/status/flowscripter/mpeg-sdl-parser/release-deno-library.yml)](https://github.com/flowscripter/mpeg-sdl-parser/actions/workflows/release-deno-library.yml)
[![coverage](https://codecov.io/gh/flowscripter/mpeg-sdl-parser/branch/main/graph/badge.svg?token=EMFT2938ZF)](https://codecov.io/gh/flowscripter/mpeg-sdl-parser)
[![deno doc](https://doc.deno.land/badge.svg)](https://jsr.io/@flowscripter/mpeg-sdl-parser/doc)
[![license: MIT](https://img.shields.io/github/license/flowscripter/mpeg-sdl-parser)](https://github.com/flowscripter/mpeg-sdl-parser/blob/main/LICENSE)

**NOTE: Under development**

- implement control flow parsing: `switch`, `while`
- provide separate CLI module:
  - test library module exports
  - implement pretty printer
  - implement syntax highlighter
- update this readme with:
  - link to CLI
- implement semantic checks

## Development

Install [Deno](https://docs.deno.com/runtime/getting_started/installation/)

Lint: `deno fmt && deno lint mod.ts deps.ts src/ tests/`

Test: `deno test -A`

## Usage

Grab with your preferred package manager from
https://jsr.io/@flowscripter/mpeg-sdl-parser

```typescript
import * as mpeg_sdl_parser from "@flowscripter/mpeg-sdl-parser";

const parser = new Parser();

// Parse SDL and produce an abstract syntax tree (AST)

const ast = parser.parse("computed int i;");

console.log(JSON.stringify(ast));

// Traverse the AST

class MyNodeHandler implements NodeHandler {
  beforeVisit(node: AbstractCompositeNode) {
    console.log("About to visit child nodes");
  }

  visit(node: AbstractLeafNode) {
    console.log("Visiting leaf node");
  }

  afterVisit(node: AbstractCompositeNode) {
    console.log("Finished visiting child nodes");
  }
}

const myNodeHandler = new MyNodeHandler();

dispatch(ast, myNodeHandler);
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
  class Location {
    position: number
    row: number
    column: number
  }

  class AbstractToken {
    tokenKind: TokenKind
    text: string
  }

  class SyntaxToken {
  }

  class TriviaToken {
  }

  class ParsecTokenWrapper {
    getSyntaxToken() SyntaxToken
  }

  class TokenPattern {
    tokenKind: TokenKind
    regex: RegExp
  }

  class Tokenizer {
    parse(input: string) ParsecTokenWrapper
  }

  class AbstractNode {
    nodeKind: NodeKind
    accept(visitor: NodeVisitor): boolean
    getSyntaxTokenIterable(): IterableIterator
  }

  class AbstractLeafNode {
    isCompositeNode = false
  }

  class AbstractCompositeNode {
    isCompositeNode = true
    getChildNodeIterable() IterableIterator
  }

  class Rule {
    tokenKind: TokenKind
    setPattern(): Parser
  }
  
  class Parser {
    parse(specificationString: string) Specification
  }

  class NodeVisitor {
    visit(node: AbstractNode)
  }

  class TraversingVisitor {
  }

  class NodeHandler {
  }

  TriviaToken --|> AbstractToken
  SyntaxToken --|> AbstractToken

  AbstractToken --> Location : location
  SyntaxToken --> "*" TriviaToken : leadingTrivia
  SyntaxToken --> "*" TriviaToken : trailingTrivia

  AbstractNode --> Location : location
  AbstractNode --> "*" SyntaxToken : syntaxTokens
  AbstractLeafNode --|> AbstractNode
  AbstractCompositeNode --|> AbstractNode

  ComponentNodeX "*" --|> AbstractCompositeNode
  LeafNodeX "*" --|> AbstractLeafNode

  AbstractCompositeNode --> "*" AbstractNode : childNodes

  Specification --|> AbstractCompositeNode

  Tokenizer --> "*" TokenPattern: syntaxTokenPatterns
  Tokenizer --> "*" TokenPattern: leadingTriviaTokenPatterns
  Tokenizer --> "*" TokenPattern: trailingTriviaTokenPatterns
  Tokenizer ..> ParsecTokenWrapper: produces

  ParsecTokenWrapper ..> AbstractToken: provides

  Parser --> Tokenizer : uses
  Parser --> "*" Rule : uses
  Parser ..> Specification : produces

  TraversingVisitor --|> NodeVisitor

  NodeVisitor ..> AbstractNode : visits
```

### API

Link to auto-generated API docs for the library:

[API Documentation](https://jsr.io/@flowscripter/mpeg-sdl-parser/doc)

### Debug Logging

Internal framework logging can be enabled by setting the `MPEG_SDL_PARSER_DEBUG`
environment variable. (Permission will need to be granted to the CLI to access
the environment to look for this environment variable i.e. `--allow-env`.)

The `logger` implementation will detect this and define a default Deno
`ConsoleHandler` logger with `DEBUG` level which is used by internal
implementation classes such as the `parser` and `tokenizer`.

## License

MIT © Flowscripter
