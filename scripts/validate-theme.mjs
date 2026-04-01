/**
 * Validates themes/remedy.json against the Zed theme schema.
 *
 * Usage: node scripts/validate-theme.mjs
 */

import Ajv from "ajv";
import { readFileSync } from "fs";

const schema = JSON.parse(readFileSync("scripts/zed-theme-schema.json", "utf8"));
const theme = JSON.parse(readFileSync("themes/remedy.json", "utf8"));

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);
const valid = validate(theme);

if (valid) {
  console.log("Theme is valid against Zed schema.");

  // Additional checks beyond schema
  const warnings = [];
  for (const t of theme.themes) {
    const styleKeys = Object.keys(t.style).filter(k => k !== "syntax" && k !== "players");
    const syntaxKeys = t.style.syntax ? Object.keys(t.style.syntax) : [];
    console.log(`  ${t.name}: ${styleKeys.length} style keys, ${syntaxKeys.length} syntax entries, ${t.style.players?.length || 0} players`);

    // Check for unknown top-level style keys (not in schema)
    const schemaStyleKeys = Object.keys(schema.definitions.ThemeStyleContent.properties);
    for (const key of styleKeys) {
      if (!schemaStyleKeys.includes(key)) {
        warnings.push(`  ${t.name}: unknown style key "${key}" (not in schema — may still work)`);
      }
    }
  }

  if (warnings.length > 0) {
    console.log(`\n${warnings.length} warning(s):`);
    warnings.forEach(w => console.log(w));
  }
} else {
  console.error("Validation errors:");
  for (const err of validate.errors) {
    console.error(`  ${err.instancePath || "/"}: ${err.message}`);
    if (err.params) console.error(`    params: ${JSON.stringify(err.params)}`);
  }
  process.exit(1);
}
