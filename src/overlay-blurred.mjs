/**
 * Blurred overlay — keys that change when going from opaque → blurred.
 *
 * Takes a tone's semantic tokens (from palette.mjs) and an intensity
 * ("normal" or "light") and returns the keys that differ from the opaque
 * base. The "light" intensity drops chrome alpha so more of the wallpaper
 * shows through, mirroring the convention used by Catppuccin Blur [Light].
 */

const ALPHA = {
  normal: { base: "D7", surface: "D0", overlay: "D7", activeTab: "60" },
  light:  { base: "99", surface: "8C", overlay: "99", activeTab: "40" },
};

export function blurredOverlay(t, intensity = "normal") {
  const a = ALPHA[intensity];
  return {
    "background.appearance": "blurred",
    "background":            `${t.base}${a.base}`,
    "border":                `${t.border}66`,
    "border.variant":        `${t.border}66`,
    "border.disabled":       `${t.border}33`,
    "surface.background":    `${t.base}${a.surface}`,
    "element.selected":      `${t.accent}4D`,

    "panel.background":          "#00000000",
    "panel.overlay_background":  `${t.base}${a.overlay}`,
    "panel.overlay_hover":       `${t.foreground}11`,
    "tab_bar.background":    "#00000000",
    "tab.active_background": `${t.surface}${a.activeTab}`,
    "tab.inactive_background": "#00000000",
    "toolbar.background":    "#00000000",

    "title_bar.background":          `${t.base}${a.base}`,
    "title_bar.inactive_background": t.base,
    "status_bar.background":         `${t.base}${a.base}`,

    "editor.background":            "#00000000",
    "editor.gutter.background":     "#00000000",
    "editor.active_line.background": "#00000000",

    "terminal.background": "#00000000",
  };
}
