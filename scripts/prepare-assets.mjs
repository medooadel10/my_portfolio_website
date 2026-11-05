import sharp from "sharp";
import { readdir, mkdir, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { assets } from "./asset-manifest.mjs";

const sourceRoot = process.env.SCREENSHOTS_DIR || "/Users/mohammedadel/Work/App Screen Shots";
const cvSource = process.env.CV_PATH || "/Users/mohammedadel/Desktop/Mohamed Adel | Flutter.pdf";
const output = path.resolve("public/images/projects");
await mkdir(output, { recursive: true });
const report = [];
for (const asset of assets) {
  const directory = path.join(sourceRoot, asset.folder);
  const files = (await readdir(directory)).filter((name) => name.endsWith(".png")).sort();
  const filename = files[asset.index];
  if (!filename) throw new Error(`Missing source for ${asset.id}`);
  const input = path.join(directory, filename);
  const meta = await sharp(input).metadata();
  const { width, height } = meta;
  if (!width || !height) throw new Error(`Invalid dimensions: ${asset.id}`);
  const rects = asset.masks.map(([x,y,w,h]) => `<rect x="${Math.floor(x*width)}" y="${Math.floor(y*height)}" width="${Math.ceil(w*width)}" height="${Math.ceil(h*height)}" rx="${Math.round(width*.006)}" fill="#cdd1d8"/>`).join("");
  const clean = await sharp(input).composite(rects ? [{ input: Buffer.from(`<svg width="${width}" height="${height}">${rects}</svg>`) }] : []).png().toBuffer();
  const sizes = width > height ? [560, 1120, 1600] : [320, 640, 960];
  for (const size of sizes) {
    await sharp(clean).resize({ width: size, withoutEnlargement: true }).webp({ quality: 86, effort: 5 }).toFile(path.join(output, `${asset.id}-${size}.webp`));
  }
  report.push({ id: asset.id, width, height, masks: asset.masks.length, widths: sizes });
}
await copyFile(cvSource, path.resolve("public/Mohammed-Adel-Flutter-CV.pdf"));
await writeFile(path.join(output, "manifest.json"), JSON.stringify(report, null, 2)+"\n");
console.log(`Prepared ${report.length} screenshots with baked-in privacy masks and responsive WebP variants. Original files are unchanged.`);
