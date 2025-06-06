import { type BuildOptions, buildParser } from "@lezer/generator";
import { ContextTracker, LRParser as LezerParser } from "@lezer/lr";
import { promises as fs } from "node:fs";
import path from "node:path";
import getLogger, { debugEnabled } from "../util/logger.ts";
import { Text } from "@codemirror/state";
import type { Input } from "@lezer/common";
import { SyntacticParseError } from "../ParseError.ts";

const logger = getLogger("SdlParser");

let lenientSdlParser: LezerParser | undefined;
let strictSdlParser: LezerParser | undefined;

/**
 * Create an in memory lenient Lezer based parser using the SDL grammar and store it as a "singleton".
 */
export async function createLenientSdlParser(): Promise<LezerParser> {
  if (!lenientSdlParser) {
    const fileName = "sdl.lezer.grammar";
    const grammarPath = new URL(
      path.join("../..", "grammar", fileName),
      import.meta.url,
    );
    const grammarText = await fs.readFile(grammarPath, "utf-8");

    const buildOptions: BuildOptions = {
      fileName,
      warn: logger.warn,
    };

    if (debugEnabled) {
      // Define a custom context tracker for debug logging via the framework wide logger
      const contextTracker = new ContextTracker<number>({
        start: 0,
        shift: (_context, term, stack, _input) => {
          const termName = lenientSdlParser?.getName(term) ?? "unknown";

          logger.debug("shift term: %s at position %d", termName, stack.pos);

          return 0;
        },
        reduce: (_context, term, stack, _input) => {
          const termName = lenientSdlParser?.getName(term) ?? "unknown";

          logger.debug("reduce term: %s at position %d", termName, stack.pos);

          return 0;
        },
        reuse: (_context, node, stack, _input) => {
          const nodeName = lenientSdlParser?.getName(node.type.id) ?? "unknown";

          logger.debug("reuse node: %s at position %d", nodeName, stack.pos);

          return 0;
        },
        strict: false,
      });

      buildOptions.contextTracker = contextTracker;
    }

    lenientSdlParser = buildParser(grammarText, buildOptions);
  }

  return lenientSdlParser;
}

/**
 * Create an in memory strict Lezer based parser using the SDL grammar and store it as a "singleton".
 */
export async function createStrictSdlParser(): Promise<LezerParser> {
  if (!strictSdlParser) {
    strictSdlParser = (await createLenientSdlParser()).configure({
      strict: true,
    });

    // Wrap the parser's parse method to catch errors and wrap them in ParseError
    const originalParseFunc = strictSdlParser.parse.bind(strictSdlParser);

    strictSdlParser.parse = (input: Input | string, ...args) => {
      try {
        return originalParseFunc(input, ...args);
      } catch (err) {
        // parse position out of error message which takes the form "No parse at 0"
        const errorMessage = (err as Error).message;
        const match = errorMessage.match(/No parse at (\d+)/);
        let position = 0;
        if (match) {
          const parsed = parseInt(match[1], 10);
          position = isNaN(parsed) ? 0 : parsed;
        }

        let inputText: string;

        if (typeof input === "string") {
          inputText = input;
        } else {
          inputText = input.read(0, input.length);
        }

        const text = Text.of(
          inputText.split("\n"),
        );

        throw SyntacticParseError.fromTextAndPosition(text, position);
      }
    };
  }

  return strictSdlParser;
}
