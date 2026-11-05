import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const input = process.env.PORTRAIT_PATH || "/Users/mohammedadel/Desktop/1791493777831.jpeg";
await mkdir("public/images", { recursive: true });
await sharp(input).rotate().resize({ width: 400, withoutEnlargement: true }).webp({ quality: 90 }).toFile("public/images/mohammed-adel.webp");
console.log("Prepared the supplied portrait as a local WebP asset; the original is unchanged.");
