/**
 * Blurred overlay — keys that change when going from opaque → blurred.
 *
 * Takes a tone's semantic tokens (from palette.mjs) and returns the ~19 keys
 * that differ from the opaque base.
 */

export function blurredOverlay(t) {
  return {
    "background.appearance": "blurred",
    "background":            `${t.base}D7`,
    "border":                `${t.border}66`,
    "border.variant":        `${t.border}66`,
    "border.disabled":       `${t.border}33`,
    "surface.background":    `${t.base}D0`,
    "element.selected":      `${t.accent}4D`,

    "panel.background":      "#00000000",
    "tab_bar.background":    "#00000000",
    "tab.active_background": "#00000000",
    "tab.inactive_background": "#00000000",
    "toolbar.background":    "#00000000",

    "title_bar.background":          `${t.base}D7`,
    "title_bar.inactive_background": t.base,
    "status_bar.background":         `${t.base}D7`,

    "editor.background":            "#00000000",
    "editor.gutter.background":     "#00000000",
    "editor.active_line.background": "#00000000",

    "terminal.background": "#00000000",
  };
}
