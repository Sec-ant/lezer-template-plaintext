/// <reference types="../src/vite-env.d.ts" />

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parser } from "../src/index";

// Load patterns from fixture files (one per line, # for comments)
function loadPatterns(filename: string): string[] {
  const content = readFileSync(`./tests/fixtures/${filename}`, "utf-8");
  return content
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
}

function assertNoErrors(source: string) {
  const tree = parser.parse(source);
  expect(tree.type.name).toBe("TemplatePlaintextText");
  expect(tree.length).toBe(source.length);
  let hasError = false;
  tree.iterate({
    enter: (node) => {
      if (node.type.isError) hasError = true;
    },
  });
  if (hasError) {
    console.log("Unexpected error in pattern:", JSON.stringify(source));
  }
  expect(hasError).toBe(false);
}

describe("Template Plaintext Grammar", () => {
  it("plain text only", () => {
    loadPatterns("plaintext.txt").forEach(assertNoErrors);
  });

  it("single variables", () => {
    loadPatterns("variables.txt").forEach(assertNoErrors);
  });

  it("mixed text and variables", () => {
    loadPatterns("mixed.txt").forEach(assertNoErrors);
  });

  it("escapes inside variables and text", () => {
    loadPatterns("escapes.txt").forEach(assertNoErrors);
  });

  it("edge cases (may contain errors)", () => {
    const patterns = loadPatterns("edge-cases.txt");
    patterns.forEach((p) => {
      const tree = parser.parse(p);
      expect(tree.type.name).toBe("TemplatePlaintextText");
    });
  });
});
