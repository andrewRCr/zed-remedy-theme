/**
 * Adapted overlays — Zed-specific opaque chrome adaptations.
 *
 * Dark adapted: lighter borders, panel dividers, and a subtly tinted
 * title/status bar for clearer panel separation. Dark blur/transparent
 * inherit the lighter border seed but not the chrome tint, since the
 * convention across Zed blur themes is a uniform translucent wash.
 *
 * Bright adapted: chrome-tint only — bright's existing borders are already
 * plenty visible against the cream base, so only the title/status bar shift
 * to a slightly warmer/darker band. Does not propagate to blur/transparent.
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

export const adaptedBrightChromeOverlay = {
  "title_bar.background":  "#EBDEC3",
  "status_bar.background": "#EBDEC3",
};
