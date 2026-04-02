/**
 * Dark opaque UI style — all non-syntax, non-terminal, non-player keys.
 */

import { normal, bright, dark } from "./palette.mjs";

const t = dark;

export const darkUi = {
  "background":            t.base,
  "text":                  t.foreground,
  "text.muted":            t.muted,
  "text.placeholder":      t.muted,
  "text.disabled":         t.disabled,
  "text.accent":           t.accent,
  "icon":                  t.foreground,
  "icon.muted":            t.disabled,
  "icon.disabled":         t.disabled,
  "icon.placeholder":      t.disabled,
  "icon.accent":           t.accent,

  "border":                t.border,
  "border.variant":        t.border,
  "border.focused":        `${t.accent}66`,
  "border.selected":       t.accent,
  "border.transparent":    "#00000000",
  "border.disabled":       `${t.border}66`,

  "elevated_surface.background": t.base,
  "surface.background":    t.surface,
  "drop_target.background": `${t.foreground}22`,

  "element.background":    "#00000000",
  "element.hover":         `${t.foreground}11`,
  "element.active":        `${t.accent}BB`,
  "element.selected":      `${t.accent}66`,
  "element.disabled":      `${t.disabled}33`,

  "ghost_element.background": "#00000000",
  "ghost_element.hover":      `${t.foreground}09`,
  "ghost_element.active":     `${t.accent}44`,
  "ghost_element.selected":   `${t.accent}33`,
  "ghost_element.disabled":   `${t.disabled}22`,

  "panel.background":      t.base,
  "panel.focused_border":  `${t.accent}66`,
  "tab_bar.background":    t.base,
  "tab.active_background": t.surface,
  "tab.inactive_background": t.base,
  "toolbar.background":    t.surface,
  "title_bar.background":  t.base,
  "title_bar.inactive_background": t.surface,
  "status_bar.background": t.base,

  "scrollbar.thumb.background":       `${t.accent}22`,
  "scrollbar.thumb.hover_background": `${t.accent}44`,
  "scrollbar.thumb.border":           "#00000000",
  "scrollbar.track.background":       "#00000000",
  "scrollbar.track.border":           "#00000000",

  "editor.background":     t.surface,
  "editor.foreground":     t.foreground,
  "editor.gutter.background": t.surface,
  "editor.line_number":    t.lineNumber,
  "editor.active_line_number": t.foreground,
  "editor.active_line.background": `${t.foreground}09`,
  "editor.highlighted_line.background": `${t.foreground}11`,
  "editor.indent_guide":        `${t.lineNumber}33`,
  "editor.indent_guide_active": `${t.lineNumber}99`,
  "editor.wrap_guide":          `${t.lineNumber}99`,
  "editor.invisible":           `${t.lineNumber}99`,
  "editor.subheader.background": t.base,
  "editor.document_highlight.read_background":  `${normal.cyan}44`,
  "editor.document_highlight.write_background": `${t.accent}33`,

  "search.match_background": `${normal.cyan}44`,

  "error":              normal.red,
  "error.background":   `${normal.red}22`,
  "error.border":       `${normal.red}44`,
  "warning":            normal.yellow,
  "warning.background": `${normal.yellow}22`,
  "warning.border":     `${normal.yellow}44`,
  "info":               normal.blue,
  "info.background":    `${normal.blue}22`,
  "info.border":        `${normal.blue}44`,
  "hint":               normal.white,
  "hint.background":    `${normal.white}22`,
  "hint.border":        `${normal.white}44`,
  "success":            normal.green,
  "success.background": `${normal.green}22`,
  "success.border":     `${normal.green}44`,

  "created":            bright.green,
  "created.background": `${bright.green}22`,
  "created.border":     `${bright.green}44`,
  "modified":           bright.blue,
  "modified.background": `${bright.blue}22`,
  "modified.border":    `${bright.blue}44`,
  "deleted":            bright.red,
  "deleted.background": `${bright.red}22`,
  "deleted.border":     `${bright.red}44`,
  "conflict":           bright.yellow,
  "conflict.background": `${bright.yellow}22`,
  "conflict.border":    `${bright.yellow}44`,

  "hidden":             t.disabled,
  "hidden.background":  `${t.disabled}22`,
  "hidden.border":      `${t.disabled}44`,
  "ignored":            t.disabled,
  "ignored.background": `${t.disabled}22`,
  "ignored.border":     `${t.disabled}44`,

  "renamed":            normal.magenta,
  "renamed.background": `${normal.magenta}22`,
  "renamed.border":     `${normal.magenta}44`,

  "predictive":            t.lineNumber,
  "predictive.background": `${t.lineNumber}22`,
  "predictive.border":     `${t.lineNumber}44`,

  // Terminal chrome (ANSI slots are in terminal.mjs)
  "terminal.background":        t.base,
  "terminal.foreground":        t.foreground,
  "terminal.bright_foreground": t.foreground,
  "terminal.dim_foreground":    t.lineNumber,
};
