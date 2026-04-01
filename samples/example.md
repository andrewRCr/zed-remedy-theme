# Remedy Theme

A **warm**, _comfortable_ color scheme with ~~outdated~~ **_orange accents_**.

## Features

- Cross-language color consistency
- Cohesive UI colors
- Optional **italic** support via "Tilted" variants

### Color Palette

| Role       | Hex       | Description         |
| ---------- | --------- | ------------------- |
| Accent     | `#EB684B` | Signature orange    |
| Keywords   | `#B294BB` | Bright magenta      |
| Functions  | `#81A2BE` | Bright blue         |
| Strings    | `#B5BD68` | Bright green        |

## Code Examples

Inline code: `const theme = "remedy"` and more text after.

```typescript
interface Theme {
  name: string;
  colors: Record<string, string>;
}

const remedy: Theme = {
  name: "Remedy Dark",
  colors: { accent: "#EB684B" },
};
```

```python
def greet(name: str) -> str:
    """Return a greeting."""
    return f"Hello, {name}!"
```

## Links & References

Visit the [original repo](https://github.com/robertrossmann/vscode-remedy) for more.

See also: [Base16 Eighties][base16]

[base16]: https://github.com/chriskempson/base16

## Blockquote

> Remedy is a dark & bright theme with orange accents
> with roots in Base16 - Eighties colour theme.
>
> — Robert Rossmann

## Task List

- [x] Dark variant
- [x] Bright variant
- [ ] Publish to marketplace
- [ ] Add screenshots

---

*Built with care by the community.*
