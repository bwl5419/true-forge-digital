import { build } from "esbuild";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";

const outdir = "dist";

await rm(outdir, { recursive: true, force: true });
await mkdir(`${outdir}/assets`, { recursive: true });

await build({
  entryPoints: ["src/main.jsx"],
  bundle: true,
  format: "esm",
  jsx: "automatic",
  loader: { ".json": "json" },
  outfile: `${outdir}/assets/app.js`,
  minify: true,
  sourcemap: false
});

let html = await readFile("index.html", "utf8");
html = html.replace(
  '<script type="module" src="/src/main.jsx"></script>',
  '<link rel="stylesheet" href="/assets/app.css" />\n    <script type="module" src="/assets/app.js"></script>'
);

await writeFile(`${outdir}/index.html`, html);
console.log("Built dist/index.html");
