/**
 * Raw color palette and semantic role mappings.
 *
 * Base16 Eighties palette + Remedy additions.
 * These are the building blocks — every color in the theme traces back here.
 */

// Raw ANSI palette
export const normal = {
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

export const bright = {
  black:   "#373B41",
  red:     "#CC6666",
  green:   "#B5BD68",
  yellow:  "#F0C674",
  blue:    "#81A2BE",
  magenta: "#B294BB",
  cyan:    "#8ABEB7",
  white:   "#C5C8C6",
};

// Semantic color roles per tone.
// These map palette colors → UI/syntax roles so the UI and overlay modules
// can reference them by name instead of hard-coding hex values.

export const dark = {
  base:       "#352B2A",
  surface:    "#3F3433",
  foreground: "#F7E0B4",
  muted:      "#BAA887",  // text.muted, variable.special
  lineNumber: "#6A5C41",
  comments:   "#7C705A",
  disabled:   "#635A48",
  border:     "#2A2222",
  shadow:     "#1A1615",
  accent:     normal.orange,

  // Syntax role colors (dark uses bright palette for syntax)
  function:    bright.blue,     // #81A2BE
  keyword:     bright.magenta,  // #B294BB
  string:      bright.green,    // #B5BD68
  constructor: bright.yellow,   // #F0C674
  readonly:    "#BAA887",
};

export const lit = {
  base:       "#FCEED1",
  surface:    "#FEF8EB",
  foreground: "#563D0E",
  muted:      "#6B552A",
  lineNumber: "#6B552A",
  comments:   "#AF9054",
  disabled:   "#AF9054",
  border:     "#E4C88D",
  shadow:     "#AF9054",
  accent:     normal.orange,

  // Syntax role colors (bright uses normal palette for syntax)
  function:    normal.blue,     // #5F819D
  keyword:     normal.magenta,  // #85678F
  string:      normal.green,    // #8C9440
  constructor: "#D79A22",       // bright.yellow darkened
  readonly:    "#836731",
};
