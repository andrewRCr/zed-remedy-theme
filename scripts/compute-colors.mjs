/**
 * Remedy Theme — Color Computation Script
 *
 * One-off script to compute derived color values needed for the Zed theme
 * that aren't directly available in the VS Code build output.
 *
 * Primary use: dim terminal colors (Zed supports terminal.ansi.dim_* which VS Code lacks)
 * Secondary use: verify/document the transforms used in the original Remedy source.
 *
 * Source: https://github.com/robertrossmann/vscode-remedy
 * The original theme uses the `color` npm package for all transforms.
 *
 * Usage:
 *   npm install color
 *   node scripts/compute-colors.mjs
 */

import Color from "color";

// =============================================================================
// RAW PALETTE — Base16 Eighties + Remedy additions
// These are the raw input colors, identical across dark/bright variants.
// =============================================================================

const normal = {
  black:   "#282A2E",
  red:     "#A54242",
  green:   "#8C9440",
  yellow:  "#DE935F",
  blue:    "#5F819D",
  magenta: "#85678F",
  cyan:    "#5E8D87",
  white:   "#707880",
  orange:  "#EB684B", // Remedy's signature accent
};

const bright = {
  black:   "#373B41",
  red:     "#CC6666",
  green:   "#B5BD68",
  yellow:  "#F0C674",
  blue:    "#81A2BE",
  magenta: "#B294BB",
  cyan:    "#8ABEB7",
  white:   "#C5C8C6",
};

// =============================================================================
// DARK VARIANT — derived values
// =============================================================================

const darkBase = Color("#352B2A");
const darkForeground = Color(bright.yellow).lighten(0.2);
// VS Code output: #F7E0B4

const darkComments = darkForeground.darken(0.5).desaturate(0.8);
// VS Code output: #7C705A

const darkMuted = darkBase.mix(darkForeground, 0.3);
// Used for: editorLineNumber, placeholders

const darkHover = darkBase.mix(darkForeground, 0.15);
// Used for: toolbar hover, list hover backgrounds

const darkBorder = darkBase.darken(0.2);
// VS Code output: ~#2A2222

const darkShadow = darkBase.darken(0.5);
// VS Code output: ~#1A1615

const darkDisabled = darkForeground.darken(0.6).desaturate(0.8);
// VS Code output: ~#635A48

const darkStatusBar = darkForeground.darken(0.4).desaturate(0.5);
// VS Code output: ~#95815B

console.log("=== DARK VARIANT ===");
console.log(`base:            ${darkBase.hex()}`);
console.log(`foreground:      ${darkForeground.hex()}`);
console.log(`comments:        ${darkComments.hex()}`);
console.log(`muted:           ${darkMuted.hex()}`);
console.log(`hover:           ${darkHover.hex()}`);
console.log(`border:          ${darkBorder.hex()}`);
console.log(`shadow:          ${darkShadow.hex()}`);
console.log(`disabled:        ${darkDisabled.hex()}`);
console.log(`statusBar:       ${darkStatusBar.hex()}`);
console.log();

// =============================================================================
// BRIGHT VARIANT — derived values
// =============================================================================

const brightBase = Color("#FCEED1");
const brightModYellow = Color(bright.yellow).darken(0.3).desaturate(0.1);
// This modified yellow replaces bright.yellow in the bright variant
// Used for: classes, namespaces → VS Code output: #D79A22

const brightForeground = brightModYellow.darken(0.6);
// VS Code output: #563D0E

const brightComments = brightForeground.lighten(1.6).desaturate(0.5);
// VS Code output: #AF9054

const brightMuted = brightBase.mix(brightForeground, 0.3);
// Used for: editorLineNumber, placeholders

const brightHover = brightBase.mix(brightForeground, 0.15);

const brightBorder = brightBase.darken(0.2).desaturate(0.3);
// VS Code output: ~#E4C88D

const brightShadow = brightComments;
// In bright variant, shadow = text.dimmed = comments color

console.log("=== BRIGHT VARIANT ===");
console.log(`base:            ${brightBase.hex()}`);
console.log(`modifiedYellow:  ${brightModYellow.hex()}`);
console.log(`foreground:      ${brightForeground.hex()}`);
console.log(`comments:        ${brightComments.hex()}`);
console.log(`muted:           ${brightMuted.hex()}`);
console.log(`hover:           ${brightHover.hex()}`);
console.log(`border:          ${brightBorder.hex()}`);
console.log(`shadow:          ${brightShadow.hex()}`);
console.log();

// =============================================================================
// DIM TERMINAL COLORS — needed for Zed (not present in VS Code theme)
// Computed by darkening normal colors by ~30%
// =============================================================================

console.log("=== DIM TERMINAL COLORS ===");
const dimFactor = 0.3;
for (const [name, hex] of Object.entries(normal)) {
  if (name === "orange") continue; // not an ANSI color
  const dimmed = Color(hex).darken(dimFactor);
  console.log(`dim_${name.padEnd(8)} ${dimmed.hex()}`);
}

// Also compute dim versions of the bright terminal colors used as normal in VS Code
// (VS Code uses normal palette for terminal.ansi*, but bright_black and bright_white
// differ from the raw palette in the build output)
console.log();
console.log("=== BRIGHT TERMINAL (from VS Code build output) ===");
const vscBright = {
  black: "#535961",  // different from bright.black (#373B41)
  white: "#EEEFEE",  // different from bright.white (#C5C8C6)
};
console.log(`bright_black (VS Code): ${vscBright.black}`);
console.log(`bright_white (VS Code): ${vscBright.white}`);

// Dim versions of these
console.log(`dim bright_black: ${Color(vscBright.black).darken(dimFactor).hex()}`);
console.log(`dim bright_white: ${Color(vscBright.white).darken(dimFactor).hex()}`);
console.log();

// =============================================================================
// READONLY VARIABLE COLOR — from semantic tokens
// =============================================================================

const darkReadonly = darkForeground.darken(0.2).desaturate(0.3);
console.log("=== READONLY ===");
console.log(`dark readonly:   ${darkReadonly.hex()}`);
// VS Code output: #BAA887
console.log();

// =============================================================================
// VERIFICATION — compare computed values against VS Code build output
// =============================================================================

console.log("=== VERIFICATION ===");
const checks = [
  ["dark foreground",  darkForeground.hex(),  "#F7E0B4"],
  ["dark comments",    darkComments.hex(),    "#7C705A"],
  ["dark border",      darkBorder.hex(),      "#2A2222"],
  ["dark shadow",      darkShadow.hex(),      "#1A1615"],
  ["bright modYellow", brightModYellow.hex(), "#D79A22"],
  ["bright foreground",brightForeground.hex(),"#563D0E"],
  ["bright comments",  brightComments.hex(),  "#AF9054"],
];

for (const [name, computed, expected] of checks) {
  const match = computed.toUpperCase() === expected.toUpperCase() ? "OK" : "MISMATCH";
  console.log(`  ${match}: ${name.padEnd(20)} computed=${computed} expected=${expected}`);
}
