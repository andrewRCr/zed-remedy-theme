# Remedy Color Palette Reference

Color values and their derivation from the upstream Remedy theme source.

## Base16 Eighties Palette

These are the raw input colors shared across all variants.

### Normal (muted)

| Name    | Hex       | Usage                     |
| ------- | --------- | ------------------------- |
| Black   | `#282A2E` | Terminal ANSI black       |
| Red     | `#A54242` | Errors, diagnostics       |
| Green   | `#8C9440` | Success, bright strings   |
| Yellow  | `#DE935F` | Primitives, numbers, tags |
| Blue    | `#5F819D` | Info, bright functions    |
| Magenta | `#85678F` | Bright keywords, renamed  |
| Cyan    | `#5E8D87` | Preprocessor, links       |
| White   | `#707880` | Escape sequences, hints   |
| Orange  | `#EB684B` | Signature accent color    |

### Bright (vibrant)

| Name    | Hex       | Usage                         |
| ------- | --------- | ----------------------------- |
| Black   | `#373B41` | —                             |
| Red     | `#CC6666` | Types, constants, deleted     |
| Green   | `#B5BD68` | Strings, created              |
| Yellow  | `#F0C674` | Classes, namespaces, conflict |
| Blue    | `#81A2BE` | Functions, modified           |
| Magenta | `#B294BB` | Keywords/storage              |
| Cyan    | `#8ABEB7` | Regex                         |
| White   | `#C5C8C6` | Bold/italic markdown          |

## Dark Variant

Bright palette colors are used for syntax; normal palette for status/diagnostics.

| Role            | Value     | Derivation                               |
| --------------- | --------- | ---------------------------------------- |
| Base (panel bg) | `#352B2A` | Remedy dark base                         |
| Editor bg       | `#3F3433` | `base.lighten(0.2).desaturate(0.1)`      |
| Foreground      | `#F7E0B4` | `Color('#F0C674').lighten(0.2)`          |
| Comments        | `#7C705A` | `foreground.darken(0.5).desaturate(0.8)` |
| Muted text      | `#BAA887` | `foreground.darken(0.2).desaturate(0.3)` |
| Line number     | `#6A5C41` | `base.mix(foreground, 0.3)`              |
| Disabled        | `#635A48` | `foreground.darken(0.6).desaturate(0.8)` |
| Border          | `#2A2222` | `base.darken(0.2)`                       |
| Hover bg        | `#52463F` | `base.mix(foreground, 0.15)`             |
| Shadow          | `#1A1615` | `base.darken(0.5)`                       |
| Readonly        | `#BAA887` | Semantic token (VS Code output)          |
| Button fg       | `#0B0908` | Near-black contrast text                 |

## Bright Variant

Normal palette colors are used for syntax; dark variant uses bright palette.

| Role            | Value     | Derivation                                                                          |
| --------------- | --------- | ----------------------------------------------------------------------------------- |
| Base (panel bg) | `#FCEED1` | Remedy bright base (warm cream)                                                     |
| Editor bg       | `#FEF8EB` | `base.lighten(0.06)`                                                                |
| Foreground      | `#563D0E` | `Color('#F0C674').darken(0.3).desaturate(0.1).darken(0.6)`                          |
| Comments        | `#AF9054` | `foreground.lighten(1.6).desaturate(0.5)`                                           |
| Muted text      | `#6B552A` | `base.mix(foreground, 0.3)`                                                         |
| Disabled        | `#AF9054` | Same as comments                                                                    |
| Border          | `#E4C88D` | `base.darken(0.2).desaturate(0.3)`                                                  |
| Hover bg        | `#CAB996` | `base.mix(foreground, 0.3)`                                                         |
| Shadow          | `#AF9054` | Same as comments                                                                    |
| Modified yellow | `#D79A22` | `Color('#F0C674').darken(0.3).desaturate(0.1)` — replaces bright.yellow for classes |
| Readonly        | `#836731` | Semantic token (VS Code output)                                                     |
| Button fg       | `#FCEED1` | Base color as contrast text                                                         |

## Syntax Mapping

Dark uses bright palette for syntax; bright uses normal palette (with exceptions).

| Semantic Role | Dark      | Bright    | Tree-sitter keys                     |
| ------------- | --------- | --------- | ------------------------------------ |
| Keywords      | `#B294BB` | `#85678F` | `keyword.*`                          |
| Functions     | `#81A2BE` | `#5F819D` | `function.*`                         |
| Strings       | `#B5BD68` | `#8C9440` | `string.*`                           |
| Classes       | `#F0C674` | `#D79A22` | `constructor`, `module`, `namespace` |
| Types         | `#CC6666` | `#CC6666` | `type.*`, `constant`, `property`     |
| Primitives    | `#DE935F` | `#DE935F` | `number`, `boolean`, `tag`           |
| Preprocessor  | `#5E8D87` | `#5E8D87` | `keyword.directive`, `label`         |
| Regex         | `#8ABEB7` | `#8ABEB7` | `string.regex`                       |
| Escapes       | `#707880` | `#707880` | `string.escape`                      |
| Bold/italic   | `#C5C8C6` | `#C5C8C6` | `emphasis`, `emphasis.strong`        |
| Strikethrough | `#7C705A` | `#AF9054` | `strikethrough`                      |

## Terminal ANSI Colors

Normal and bright ANSI colors are the raw palette values above.
Dim colors are computed by darkening normal colors by 30%:

| Color   | Normal    | Bright    | Dim       |
| ------- | --------- | --------- | --------- |
| Black   | `#282A2E` | `#535961` | `#1C1D20` |
| Red     | `#A54242` | `#CC6666` | `#742E2E` |
| Green   | `#8C9440` | `#B5BD68` | `#62682D` |
| Yellow  | `#DE935F` | `#F0C674` | `#B86226` |
| Blue    | `#5F819D` | `#81A2BE` | `#435A6E` |
| Magenta | `#85678F` | `#B294BB` | `#5D4864` |
| Cyan    | `#5E8D87` | `#8ABEB7` | `#42635F` |
| White   | `#707880` | `#EEEFEE` | `#4E545A` |

Note: Terminal bright black (`#535961`) and bright white (`#EEEFEE`) differ from
the raw palette values — these are the VS Code build output values.

## Blurred & Transparent Variants

The blurred and transparent variants use `background.appearance` set to `"blurred"` or
`"transparent"` respectively, with fully transparent (`#00000000`) internal surfaces
(editor, panel, terminal, tabs, toolbar, gutter) so the OS compositor effect shows through.
Only the window-level `background` and `surface.background` carry opacity
(~85% / `D7` and ~82% / `D0`), matching the approach used by Catppuccin Blur.

Elevated surfaces (popups, menus) remain fully opaque for readability.

## Adapted Dark Variant

`Remedy Dark (adapted)` keeps the upstream Remedy syntax palette and base UI
surfaces, but adjusts a small set of Zed chrome colors for clearer panel
separation in the opaque dark UI:

| Key                     | Default   | Adapted   | Rationale                             |
| ----------------------- | --------- | --------- | ------------------------------------- |
| `border`                | `#2A2222` | `#574B39` | Warmer, more visible panel dividers   |
| `border.variant`        | `#2A2222` | `#4D4134` | Subtler section dividers              |
| `pane_group.border`     | —         | `#4D4134` | Explicit Zed pane-group separation    |
| `title_bar.background`  | `#352B2A` | `#463B38` | Distinguishes top-level window chrome |
| `status_bar.background` | `#352B2A` | `#463B38` | Matches top-level chrome treatment    |

The dark blur and transparent variants inherit the lighter border seed
(`#574B39`) and the `pane_group.border` value, but not the title/status bar
chrome tint — the prevailing convention across Zed blur themes is a uniform
translucent wash, and a warmer chrome band reads as out of place against it.

## Deviations from Upstream

Intentional departures from the VS Code Remedy v5.28.0 build output, with rationale.

| What                           | Upstream  | Ours           | Why                                                                                                                                                                                                          |
| ------------------------------ | --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Dark `text.muted`              | `#6A5C41` | `#BAA887`      | Upstream value was too close to `hidden`/`ignored` (`#635A48`), making tracked files hard to distinguish from hidden ones in the file tree. Brightened to the `readonly` value for clear separation.         |
| `emphasis` / `emphasis.strong` | —         | `#C5C8C6`      | VS Code Remedy styles `markup.bold`/`markup.italic` via TextMate scopes that have no direct Zed equivalent. Mapped to `emphasis`/`emphasis.strong` tree-sitter captures using the same color (bright white). |
| `strikethrough`                | —         | comments color | Not present in VS Code Remedy (Zed-specific token). Uses the variant's comments color for a de-emphasized look.                                                                                              |
| Blurred / transparent variants | —         | see above      | Zed-only feature with no VS Code equivalent.                                                                                                                                                                 |
| Dark adapted variant           | —         | see above      | Optional Zed UI adaptation for clearer opaque panel separation while preserving the faithful default dark variant.                                                                                            |
