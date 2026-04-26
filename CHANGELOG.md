# Changelog

## 0.1.1

- Add `Remedy Dark (adapted)`, an opaque dark variant with clearer Zed panel
  dividers and a tinted title/status bar.
- Add `Remedy Bright (adapted)`, an opaque bright variant with a slightly
  warmer title/status band (no border treatment — bright borders are already
  visible against the cream base).
- Add `Remedy Dark (blur) [light]` and `Remedy Bright (blur) [light]`, lighter
  blur variants that drop chrome opacity from ~85% to ~60% for a more
  transparent feel, mirroring the convention used by Catppuccin Blur.
- Inherit the adapted lighter borders into `Remedy Dark (blur)` and
  `Remedy Dark (transparent)`, since the upstream port has no blur/transparent
  variants to stay faithful to.
- Add a subtle `surface` tint at `60` (~38%) on `tab.active_background` for
  all blur and transparent variants — active tab tinting is the convention
  across Zed blur themes; this is dialed in lighter than typical.
- Keep `Remedy Dark` and `Remedy Bright` faithful to the upstream Remedy UI
  colors.
- Document the adapted and `[light]` variants and their Zed-specific
  adjustments.

## 0.1.0

- Initial Zed extension release with dark and bright Remedy variants in opaque,
  blurred, and transparent styles.
