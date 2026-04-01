# Remedy Theme for Zed

A port of the [Remedy](https://github.com/robertrossmann/vscode-remedy) color scheme for the [Zed](https://zed.dev) editor.

Remedy is a warm, comfortable color scheme with orange as its signature accent color, rooted in the Base16 Eighties palette. It emphasizes cross-language color consistency and a cohesive UI.

## Variants

| Variant | Description |
|---|---|
| **Remedy Dark** | Dark background, no italics |
| **Remedy Dark Tilted** | Dark background, italicized keywords, strings, and comments |
| **Remedy Bright** | Light background, no italics |
| **Remedy Bright Tilted** | Light background, italicized keywords, strings, and comments |

The "Tilted" variants are designed to complement fonts with distinct italic faces, such as Operator Mono.

## Installation

### From the Zed Extension Marketplace

1. Open Zed
2. Open the Extensions panel (or use the command palette)
3. Search for "Remedy"
4. Click Install

### Manual / Dev Installation

1. Clone this repository
2. In Zed, open the command palette and select "Install Dev Extension"
3. Point it to the cloned directory

## Attribution

This is an unofficial port of **Remedy** by [Robert Rossmann](https://github.com/robertrossmann). All color palette choices and design decisions originate from the [original project](https://github.com/robertrossmann/vscode-remedy), which is licensed under the BSD 3-Clause License.

This port adapts the theme for Zed's theme format, translating TextMate scopes to Tree-sitter capture names and mapping VS Code UI color keys to Zed's style properties. Color values are sourced from the Remedy v5.28.0 VS Code extension build output.
