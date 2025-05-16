import { buildParser } from "@lezer/generator";
import { LRParser as LezerParser } from "@lezer/lr";
import fs from "node:fs/promises";
import path from "node:path";
import getLogger from "../util/logger.ts";
import { createSyntacticParseError } from "../ParseError.ts";
import { Text } from "@codemirror/state";
import type { Input } from "@lezer/common";

const sdlParserLogger = getLogger("SdlParser");

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

    lenientSdlParser = buildParser(grammarText, {
      fileName,
      warn: sdlParserLogger.warn,
    });
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

        throw createSyntacticParseError(text, position);
      }
    };
  }

  return strictSdlParser;
}
