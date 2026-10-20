import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve, sep } from "node:path";

if (!existsSync("dist/index.html")) throw new Error("Run npm run build first.");
const output = resolve(".vercel/output");
mkdirSync(output, { recursive: true });
const staticOutput = resolve(output, "static");
if (!staticOutput.startsWith(output + sep)) throw new Error("Invalid static output path.");
rmSync(staticOutput, { recursive: true, force: true });
cpSync("dist", staticOutput, { recursive: true, force: true });
writeFileSync(
  resolve(output, "config.json"),
  JSON.stringify({ version: 3 }) + "\n"
);
console.log("Prepared static Vercel Build Output API v3.");
