/**
 * Remedy Theme — Build Script
 *
 * Composes the source definitions in src/ into themes/remedy.json.
 * The output is a fully materialized JSON file that Zed can consume directly.
 *
 * Usage: node scripts/build-theme.mjs
 */

import { writeFileSync } from "fs";
import { dark, lit } from "../src/palette.mjs";
import { darkSyntax, brightSyntax } from "../src/syntax.mjs";
import { terminalAnsi } from "../src/terminal.mjs";
import { darkPlayers, brightPlayers } from "../src/players.mjs";
import { darkUi } from "../src/ui-dark.mjs";
import { brightUi } from "../src/ui-bright.mjs";
import { blurredOverlay } from "../src/overlay-blurred.mjs";
import { transparentOverlay } from "../src/overlay-transparent.mjs";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Canonical syntax key order — matches the hand-authored original.
 * Mostly alphabetical, with a few intentional exceptions
 * (emphasis/emphasis.strong before embedded; strikethrough at end).
 */
const SYNTAX_KEY_ORDER = [
  "attribute", "boolean", "character", "character.special",
  "comment", "comment.doc", "comment.documentation", "comment.error",
  "comment.hint", "comment.info", "comment.note", "comment.todo",
  "comment.warn", "comment.warning",
  "constant", "constant.builtin", "constant.macro", "constructor",
  "diff.minus", "diff.plus",
  "emphasis", "emphasis.strong", "embedded",
  "enum", "field", "float",
  "function", "function.builtin", "function.call", "function.decorator",
  "function.macro", "function.method", "function.method.call",
  "keyword", "keyword.conditional", "keyword.conditional.ternary",
  "keyword.coroutine", "keyword.debug", "keyword.directive",
  "keyword.directive.define", "keyword.exception", "keyword.export",
  "keyword.function", "keyword.import", "keyword.modifier",
  "keyword.operator", "keyword.repeat", "keyword.return", "keyword.type",
  "label", "link_text", "link_uri",
  "module", "namespace", "number", "number.float",
  "operator", "parameter", "parent", "property",
  "punctuation", "punctuation.bracket", "punctuation.delimiter",
  "punctuation.list_marker", "punctuation.special", "punctuation.special.symbol",
  "string", "string.doc", "string.documentation", "string.escape",
  "string.regex", "string.regexp", "string.special", "string.special.path",
  "string.special.symbol", "string.special.url",
  "symbol", "tag", "tag.attribute", "tag.delimiter", "tag.doctype",
  "text", "text.literal", "title",
  "type", "type.builtin", "type.class.definition", "type.definition",
  "type.interface", "type.super",
  "variable", "variable.builtin", "variable.member", "variable.parameter",
  "variable.special", "variant", "strikethrough",
];

/** Order syntax keys to match the canonical order. */
function orderSyntax(obj) {
  const ordered = {};
  for (const key of SYNTAX_KEY_ORDER) {
    if (key in obj) ordered[key] = obj[key];
  }
  return ordered;
}

/** Assemble a complete theme style object from its parts. */
function buildStyle(ui, syntax, players, ansi) {
  // Extract terminal chrome keys (terminal.background, etc.) from ui,
  // then merge ANSI slots after them for correct key ordering.
  const terminalChromeKeys = Object.keys(ui).filter(k => k.startsWith("terminal."));
  const nonTerminal = {};
  const terminalChrome = {};
  for (const [k, v] of Object.entries(ui)) {
    if (k.startsWith("terminal.")) {
      terminalChrome[k] = v;
    } else {
      nonTerminal[k] = v;
    }
  }

  return {
    ...nonTerminal,
    players,
    syntax: orderSyntax(syntax),
    ...terminalChrome,
    ...ansi,
  };
}

/** Apply an overlay (shallow merge) on top of a base style. */
function applyOverlay(base, overlay) {
  // Preserve key order: start with overlay keys that come before existing keys,
  // then merge. For "background.appearance" which must be first in style, we
  // rebuild the object with it at the top.
  const merged = { ...base, ...overlay };

  // Ensure background.appearance (if present) comes first
  if ("background.appearance" in merged) {
    const { "background.appearance": appearance, ...rest } = merged;
    return { "background.appearance": appearance, ...rest };
  }
  return merged;
}

// ---------------------------------------------------------------------------
// Compose all 6 variants
// ---------------------------------------------------------------------------

const darkOpaqueStyle = buildStyle(darkUi, darkSyntax, darkPlayers, terminalAnsi);
const darkBlurredStyle = applyOverlay(darkOpaqueStyle, blurredOverlay(dark));
const darkTransparentStyle = applyOverlay(darkBlurredStyle, transparentOverlay());

const brightOpaqueStyle = buildStyle(brightUi, brightSyntax, brightPlayers, terminalAnsi);
const brightBlurredStyle = applyOverlay(brightOpaqueStyle, blurredOverlay(lit));
const brightTransparentStyle = applyOverlay(brightBlurredStyle, transparentOverlay());

const output = {
  $schema: "https://zed.dev/schema/themes/v0.2.0.json",
  name: "Remedy",
  author: "Andrew Creekmore (original theme by Robert Rossmann)",
  themes: [
    { name: "Remedy Dark",                appearance: "dark",  style: darkOpaqueStyle },
    { name: "Remedy Dark (blur)",          appearance: "dark",  style: darkBlurredStyle },
    { name: "Remedy Dark (transparent)",   appearance: "dark",  style: darkTransparentStyle },
    { name: "Remedy Bright",               appearance: "light", style: brightOpaqueStyle },
    { name: "Remedy Bright (blur)",        appearance: "light", style: brightBlurredStyle },
    { name: "Remedy Bright (transparent)", appearance: "light", style: brightTransparentStyle },
  ],
};

// ---------------------------------------------------------------------------
// Write output
// ---------------------------------------------------------------------------

const json = JSON.stringify(output, null, 2) + "\n";
writeFileSync("themes/remedy.json", json);
console.log(`Built themes/remedy.json (${json.length} bytes, ${output.themes.length} variants)`);
