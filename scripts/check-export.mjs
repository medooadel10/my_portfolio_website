import assert from "node:assert/strict";
import { readFile, access, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { assets } from "./asset-manifest.mjs";

const slugs = ["elkanteen", "weevo", "ceb-lms", "ceb-workspace", "cognitech-workspace", "linesteel"];
const pages = ["index.html", ...slugs.map((slug) => `work/${slug}/index.html`), "404.html"];
for (const page of pages) {
  const html = await readFile(path.join("out", page), "utf8");
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${page}: expected one H1`);
  assert.match(html, /<title>[^<]+<\/title>/, `${page}: missing title`);
  assert.match(html, /name="description"/, `${page}: missing description`);
  assert.match(html, /lang="en"/, `${page}: missing document language`);
  for (const [, file] of html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)) {
    const relative = decodeURIComponent(file.slice(1));
    if (!relative) continue;
    await access(path.join("out", relative.endsWith("/") ? `${relative}index.html` : relative));
  }
  assert.ok(!html.includes("/Users/"), `${page}: local source path leaked`);
}
const home = await readFile("out/index.html", "utf8");
for (const slug of slugs) assert.ok(home.includes(`/work/${slug}/`), `Missing homepage case study: ${slug}`);
const sitemap = await readFile("out/sitemap.xml", "utf8");
for (const slug of slugs) assert.ok(sitemap.includes(`/work/${slug}/`), `Missing sitemap URL: ${slug}`);
assert.match(home, /application\/ld\+json/);
assert.match(home, /"@type":"Person"/);
assert.equal((await readFile("out/Mohammed-Adel-Flutter-CV.pdf")).subarray(0,4).toString(), "%PDF");
for (const name of ["portfolio", ...slugs]) await access(`out/images/social/${name}.png`);

let masksChecked = 0;
for (const asset of assets) {
  const wide = asset.id === "canteen-pos";
  const width = wide ? 1600 : 960;
  const { data, info } = await sharp(`out/images/projects/${asset.id}-${width}.webp`).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  for (const [x,y,w,h] of asset.masks) {
    const px = Math.floor((x+w/2)*info.width);
    const py = Math.floor((y+h/2)*info.height);
    const offset = (py*info.width+px)*info.channels;
    const expected = [205,209,216];
    assert.ok(expected.every((value,channel) => Math.abs(value-data[offset+channel]) <= 14), `Privacy mask missing: ${asset.id}`);
    masksChecked++;
  }
}
const imageFiles = await readdir("out/images/projects");
assert.ok(imageFiles.every((name) => name.endsWith(".webp") || name === "manifest.json"), "Unexpected unprocessed screenshot in export");
console.log(`PASS: ${pages.length} pages, six project links, sitemap, metadata, CV, social images, and ${masksChecked} baked-in privacy masks.`);
