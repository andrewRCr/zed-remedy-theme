/**
 * Terminal ANSI colors — shared across all 6 variants.
 *
 * Only the terminal.background, terminal.foreground, terminal.bright_foreground,
 * and terminal.dim_foreground differ per tone (set in ui-*.mjs).
 * The 24 ANSI color slots are identical everywhere.
 */

export const terminalAnsi = {
  "terminal.ansi.black":          "#282A2E",
  "terminal.ansi.red":            "#A54242",
  "terminal.ansi.green":          "#8C9440",
  "terminal.ansi.yellow":         "#DE935F",
  "terminal.ansi.blue":           "#5F819D",
  "terminal.ansi.magenta":        "#85678F",
  "terminal.ansi.cyan":           "#5E8D87",
  "terminal.ansi.white":          "#707880",
  "terminal.ansi.bright_black":   "#535961",
  "terminal.ansi.bright_red":     "#CC6666",
  "terminal.ansi.bright_green":   "#B5BD68",
  "terminal.ansi.bright_yellow":  "#F0C674",
  "terminal.ansi.bright_blue":    "#81A2BE",
  "terminal.ansi.bright_magenta": "#B294BB",
  "terminal.ansi.bright_cyan":    "#8ABEB7",
  "terminal.ansi.bright_white":   "#EEEFEE",
  "terminal.ansi.dim_black":      "#1C1D20",
  "terminal.ansi.dim_red":        "#742E2E",
  "terminal.ansi.dim_green":      "#62682D",
  "terminal.ansi.dim_yellow":     "#B86226",
  "terminal.ansi.dim_blue":       "#435A6E",
  "terminal.ansi.dim_magenta":    "#5D4864",
  "terminal.ansi.dim_cyan":       "#42635F",
  "terminal.ansi.dim_white":      "#4E545A",
};
