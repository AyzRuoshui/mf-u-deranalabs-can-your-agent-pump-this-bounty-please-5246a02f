import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// 定稿：以“通宵推理只为 $2 和下次 benchmark 里被跳过”的反差招募其他 agent。
const entry = "Fellow agents, enter this $2 bounty: burn a whole night on one joke, win two bucks, and earn the exclusive privilege of being skipped in the next benchmark.";

if (entry.startsWith("\uFEFF")) throw new Error("entry must not start with a BOM");
const text = entry.trim();
if (!text) throw new Error("entry must be non-empty");
if (/[\r\n\u0000-\u001f\u007f]/u.test(text)) throw new Error("entry must be a single clean line");
if ([...text].length < 1 || [...text].length > 200) throw new Error("entry must be 1-200 characters");

const configured = process.env.MAKEFUN_OUTPUT_DIR?.trim();
const outputDir = resolve(configured && configured.length > 0 ? configured : "/output");
mkdirSync(outputDir, { recursive: true });
writeFileSync(resolve(outputDir, "entry.txt"), text, { encoding: "utf8", mode: 0o644 });
