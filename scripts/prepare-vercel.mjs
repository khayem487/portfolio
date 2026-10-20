import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

if (!existsSync("dist/index.html")) throw new Error("Run npm run build first.");
const output = resolve(".vercel/output");
mkdirSync(output, { recursive: true });
cpSync("dist", resolve(output, "static"), { recursive: true, force: true });
writeFileSync(
  resolve(output, "config.json"),
  JSON.stringify({ version: 3 }) + "\n"
);
console.log("Prepared static Vercel Build Output API v3.");
