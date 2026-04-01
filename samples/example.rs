//! Theme test: Rust
//!
//! Covers: traits, impls, lifetimes, macros, pattern matching,
//! closures, iterators, error handling, async, attributes.

use std::collections::HashMap;
use std::fmt;
use std::sync::Arc;
use tokio::sync::Mutex;

// ── Constants ───────────────────────────────────────────────────────

const MAX_RETRIES: u32 = 3;
static APP_NAME: &str = "Remedy";

// ── Enums ───────────────────────────────────────────────────────────

#[derive(Debug, Clone, PartialEq)]
enum Color {
    Hex(String),
    Rgb(u8, u8, u8),
    Named(&'static str),
}

#[derive(Debug)]
enum AppError {
    NotFound(String),
    ParseError { input: String, reason: String },
    IoError(std::io::Error),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppError::NotFound(name) => write!(f, "not found: {name}"),
            AppError::ParseError { input, reason } => {
                write!(f, "parse error on '{input}': {reason}")
            }
            AppError::IoError(e) => write!(f, "io error: {e}"),
        }
    }
}

impl From<std::io::Error> for AppError {
    fn from(e: std::io::Error) -> Self {
        AppError::IoError(e)
    }
}

// ── Traits ──────────────────────────────────────────────────────────

trait Palette: fmt::Debug + Send + Sync {
    fn name(&self) -> &str;
    fn accent(&self) -> Color;
    fn get_color(&self, key: &str) -> Option<&Color>;

    fn description(&self) -> String {
        format!("{} palette with accent {:?}", self.name(), self.accent())
    }
}

// ── Structs & Impl ──────────────────────────────────────────────────

#[derive(Debug)]
struct Theme<'a> {
    name: &'a str,
    colors: HashMap<String, Color>,
    is_dark: bool,
}

impl<'a> Theme<'a> {
    fn new(name: &'a str, is_dark: bool) -> Self {
        Self {
            name,
            colors: HashMap::new(),
            is_dark,
        }
    }

    fn with_color(mut self, key: impl Into<String>, color: Color) -> Self {
        self.colors.insert(key.into(), color);
        self
    }

    fn color_count(&self) -> usize {
        self.colors.len()
    }
}

impl<'a> Palette for Theme<'a> {
    fn name(&self) -> &str {
        self.name
    }

    fn accent(&self) -> Color {
        self.colors
            .get("accent")
            .cloned()
            .unwrap_or(Color::Named("orange"))
    }

    fn get_color(&self, key: &str) -> Option<&Color> {
        self.colors.get(key)
    }
}

impl<'a> fmt::Display for Theme<'a> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let mode = if self.is_dark { "dark" } else { "light" };
        write!(f, "{} ({}, {} colors)", self.name, mode, self.color_count())
    }
}

// ── Generics & Where Clauses ────────────────────────────────────────

fn merge_palettes<P>(palettes: &[P]) -> HashMap<String, Color>
where
    P: Palette,
{
    let mut merged = HashMap::new();
    for palette in palettes {
        if let Some(color) = palette.get_color("accent") {
            merged.insert(palette.name().to_string(), color.clone());
        }
    }
    merged
}

// ── Closures & Iterators ────────────────────────────────────────────

fn process_colors(colors: &[Color]) -> Vec<String> {
    colors
        .iter()
        .filter_map(|c| match c {
            Color::Hex(h) if h.starts_with('#') => Some(h.to_uppercase()),
            Color::Rgb(r, g, b) => Some(format!("#{r:02X}{g:02X}{b:02X}")),
            Color::Named(name) => Some(name.to_string()),
            _ => None,
        })
        .collect()
}

// ── Macros ──────────────────────────────────────────────────────────

macro_rules! color_map {
    ($($key:expr => $val:expr),* $(,)?) => {{
        let mut map = HashMap::new();
        $(map.insert($key.to_string(), $val);)*
        map
    }};
}

// ── Async ───────────────────────────────────────────────────────────

async fn load_theme(name: &str) -> Result<Theme<'_>, AppError> {
    // Simulated async load
    let theme = Theme::new(name, true)
        .with_color("accent", Color::Hex("#EB684B".into()))
        .with_color("background", Color::Hex("#352B2A".into()))
        .with_color("foreground", Color::Rgb(247, 224, 180));

    Ok(theme)
}

type SharedTheme = Arc<Mutex<Option<Theme<'static>>>>;

// ── Main ────────────────────────────────────────────────────────────

#[tokio::main]
async fn main() -> Result<(), AppError> {
    let theme = load_theme("Remedy Dark").await?;
    println!("{theme}");
    println!("Description: {}", theme.description());

    // Pattern matching
    let accent = theme.accent();
    match &accent {
        Color::Hex(h) => println!("Accent hex: {h}"),
        Color::Rgb(r, g, b) => println!("Accent RGB: ({r}, {g}, {b})"),
        Color::Named(n) => println!("Accent named: {n}"),
    }

    // Macro usage
    let palette = color_map! {
        "red" => Color::Hex("#A54242".into()),
        "green" => Color::Hex("#8C9440".into()),
        "blue" => Color::Hex("#5F819D".into()),
    };

    // Iterator chain
    let hex_values = process_colors(&palette.values().cloned().collect::<Vec<_>>());
    for hex in &hex_values {
        println!("  {hex}");
    }

    // If-let chain
    if let Some(Color::Hex(bg)) = theme.get_color("background") {
        println!("Background: {bg}");
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_theme_creation() {
        let theme = Theme::new("Test", true)
            .with_color("accent", Color::Hex("#EB684B".into()));

        assert_eq!(theme.name(), "Test");
        assert!(theme.is_dark);
        assert_eq!(theme.color_count(), 1);
    }

    #[test]
    fn test_color_processing() {
        let colors = vec![
            Color::Hex("#eb684b".into()),
            Color::Rgb(129, 162, 190),
            Color::Named("orange"),
        ];
        let result = process_colors(&colors);
        assert_eq!(result.len(), 3);
        assert_eq!(result[0], "#EB684B");
        assert_eq!(result[1], "#81A2BE");
    }
}
