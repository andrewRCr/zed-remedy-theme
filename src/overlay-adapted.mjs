/**
 * Adapted dark overlay.
 *
 * Lighter borders, panel dividers, and a subtly tinted title/status bar — a
 * Zed-specific adaptation of the dark variant for clearer panel separation.
 *
 * The dark blur/transparent variants reuse the lighter border seed but not
 * the chrome tint, since the prevailing convention across Zed blur themes
 * is a uniform translucent wash across all chrome surfaces.
 */

export const adaptedDarkBorder = "#574B39";
export const adaptedDarkPaneGroupBorder = "#4D4134";

export const adaptedDarkChromeOverlay = {
  "border":                adaptedDarkBorder,
  "border.variant":        adaptedDarkPaneGroupBorder,
  "border.disabled":       `${adaptedDarkPaneGroupBorder}66`,
  "pane_group.border":     adaptedDarkPaneGroupBorder,
  "title_bar.background":  "#463B38",
  "status_bar.background": "#463B38",
};
