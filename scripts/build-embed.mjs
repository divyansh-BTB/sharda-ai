/**
 * Bundles ask-content.json + ask-bar.css into a single self-contained
 * public/embed.js. Run via `npm run build:embed`.
 *
 * The phrase-rotation keyframe windows are computed here from the phrase count,
 * so adding or removing a phrase can never leave one that never appears.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const content = JSON.parse(
  readFileSync(join(root, "src/lib/ask-content.json"), "utf8"),
);

const n = content.placeholderPhrases.length;
const SLOT_SECONDS = 4;
const cycle = `${n * SLOT_SECONDS}s`;
const slot = 100 / n;
const pct = (v) => `${Math.round(v * 100) / 100}%`;

let css = readFileSync(join(root, "src/embed/ask-bar.css"), "utf8")
  .replace("__IN__", pct(slot * 0.15))
  .replace("__HOLD__", pct(slot * 0.85))
  .replace("__OUT__", pct(slot))
  .replace("var(--cycle)", cycle);

// Collapse whitespace but keep the CSS valid and readable enough to debug.
css = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s*\n\s*/g, "\n").trim();

const js = readFileSync(join(root, "src/embed/embed.src.js"), "utf8")
  .replace("__CONTENT__", JSON.stringify(content))
  .replace("__STYLES__", JSON.stringify(css))
;

const out = join(root, "public/embed.js");
writeFileSync(out, js, "utf8");

const kb = (Buffer.byteLength(js, "utf8") / 1024).toFixed(1);
console.log(`embed.js written: ${kb} KB`);
console.log(`  ${n} phrases, ${cycle} cycle, windows ${pct(slot * 0.15)} / ${pct(slot * 0.85)} / ${pct(slot)}`);
console.log(`  ${content.suggestedQuestions.length} chips`);
