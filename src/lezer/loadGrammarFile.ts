import path from "node:path";

const fileName = "sdl.lezer.grammar";

/**
 * This function exists separarately to allow the use of the Bun macro
 * to load the grammar file at build time. This preents the need to ship
 * the grammar file with the library, but also allows the runtime 
 * compilation of the grammar file into a parser module. This might
 * be useful to allow the use of different grammars at runtime.
 * @returns 
 */
export function loadGrammarFile(): Promise<string> {
  const grammarPath = new URL(
    path.join("../..", "grammar", fileName),
    import.meta.url,
  );

  return Bun.readableStreamToText(Bun.file(grammarPath).stream());
}
