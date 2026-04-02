/**
 * Syntax token definitions per tone.
 *
 * Dark uses the bright palette for syntax; Bright uses the normal palette.
 * Tokens that share a color are grouped via helper to stay DRY within each map.
 */

import { normal, bright, dark, lit } from "./palette.mjs";

function c(color) {
  return { color };
}

// Tokens shared between dark and bright (same color regardless of tone)
const shared = {
  "character.special":     c(normal.white),      // #707880
  "comment.error":         c(normal.red),         // #A54242
  "comment.hint":          c(normal.white),       // #707880
  "comment.info":          c(normal.blue),         // #5F819D
  "comment.note":          c(normal.blue),         // #5F819D
  "comment.todo":          c(normal.orange),       // #EB684B
  "comment.warn":          c(normal.yellow),       // #DE935F
  "comment.warning":       c(normal.yellow),       // #DE935F
  "constant":              c(bright.red),          // #CC6666
  "constant.builtin":      c(bright.red),          // #CC6666
  "constant.macro":        c(bright.red),          // #CC6666
  "diff.minus":            c(bright.red),          // #CC6666
  "diff.plus":             c(bright.green),        // #B5BD68
  "emphasis":              { color: bright.white, font_style: "italic" },  // #C5C8C6
  "emphasis.strong":       { color: bright.white, font_weight: 700 },     // #C5C8C6
  "enum":                  c(bright.red),          // #CC6666
  "field":                 c(bright.red),          // #CC6666
  "function.macro":        c(normal.cyan),         // #5E8D87
  "keyword.directive":     c(normal.cyan),         // #5E8D87
  "keyword.directive.define": c(normal.cyan),      // #5E8D87
  "label":                 c(normal.cyan),         // #5E8D87
  "link_text":             c(bright.red),          // #CC6666
  "link_uri":              c(normal.cyan),         // #5E8D87
  "property":              c(bright.red),          // #CC6666
  "string.escape":         c(normal.white),        // #707880
  "string.regex":          c(bright.cyan),         // #8ABEB7
  "string.regexp":         c(bright.cyan),         // #8ABEB7
  "string.special.url":    c(normal.cyan),         // #5E8D87
  "tag.attribute":         c(bright.red),          // #CC6666
  "title":                 { color: bright.red, font_weight: 700 }, // #CC6666
  "type":                  c(bright.red),          // #CC6666
  "type.builtin":          c(bright.red),          // #CC6666
  "type.class.definition": c(bright.red),          // #CC6666
  "type.definition":       c(bright.red),          // #CC6666
  "type.interface":        c(bright.red),          // #CC6666
  "type.super":            c(bright.red),          // #CC6666
  "variable.builtin":      c(bright.red),          // #CC6666
  "variant":               c(bright.red),          // #CC6666
  "attribute":             c(normal.yellow),       // #DE935F
  "boolean":               c(normal.yellow),       // #DE935F
  "character":             c(normal.yellow),       // #DE935F
  "float":                 c(normal.yellow),       // #DE935F
  "number":                c(normal.yellow),       // #DE935F
  "number.float":          c(normal.yellow),       // #DE935F
  "symbol":                c(normal.yellow),       // #DE935F
  "tag":                   c(normal.yellow),       // #DE935F
  "text.literal":          c(normal.yellow),       // #DE935F
};

// Tokens that change between tones, parameterised by palette role
function toneSyntax(t) {
  return {
    "comment":               c(t.comments),
    "comment.doc":           c(t.comments),
    "comment.documentation": c(t.comments),
    "constructor":           c(t.constructor),
    "embedded":              c(t.foreground),
    "function":              c(t.function),
    "function.builtin":      c(t.function),
    "function.call":         c(t.function),
    "function.decorator":    c(t.function),
    "function.method":       c(t.function),
    "function.method.call":  c(t.function),
    "keyword":               c(t.keyword),
    "keyword.conditional":   c(t.keyword),
    "keyword.conditional.ternary": c(t.keyword),
    "keyword.coroutine":     c(t.keyword),
    "keyword.debug":         c(t.keyword),
    "keyword.exception":     c(t.keyword),
    "keyword.export":        c(t.keyword),
    "keyword.function":      c(t.keyword),
    "keyword.import":        c(t.keyword),
    "keyword.modifier":      c(t.keyword),
    "keyword.operator":      c(t.keyword),
    "keyword.repeat":        c(t.keyword),
    "keyword.return":        c(t.keyword),
    "keyword.type":          c(t.keyword),
    "module":                c(t.constructor),
    "namespace":             c(t.constructor),
    "operator":              c(t.foreground),
    "parameter":             c(t.foreground),
    "parent":                c(t.foreground),
    "punctuation":           c(t.comments),
    "punctuation.bracket":   c(t.comments),
    "punctuation.delimiter": c(t.comments),
    "punctuation.list_marker": c(t.comments),
    "punctuation.special":   c(t.comments),
    "punctuation.special.symbol": c(t.comments),
    "string":                c(t.string),
    "string.doc":            c(t.string),
    "string.documentation":  c(t.string),
    "string.special":        c(t.string),
    "string.special.path":   c(t.string),
    "string.special.symbol": c(t.string),
    "tag.delimiter":         c(t.comments),
    "tag.doctype":           c(t.keyword),
    "text":                  c(t.foreground),
    "variable":              c(t.foreground),
    "variable.member":       c(t.foreground),
    "variable.parameter":    c(t.foreground),
    "variable.special":      c(t.readonly),
    "strikethrough":         c(t.comments),
  };
}

export const darkSyntax  = { ...shared, ...toneSyntax(dark) };
export const brightSyntax = { ...shared, ...toneSyntax(lit) };
