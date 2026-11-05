import http from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { createGzip } from "node:zlib";

const root = path.resolve("out");
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 3000);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".pdf": "application/pdf", ".ico": "image/x-icon" };
await stat(path.join(root, "index.html")).catch(() => { throw new Error("No static export found. Run npm run build first."); });
const server = http.createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405, { Allow: "GET, HEAD" }).end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(request.url, `http://${host}:${port}`).pathname);
    let file = path.resolve(root, `.${pathname}`);
    if (!file.startsWith(`${root}${path.sep}`) && file !== root) { response.writeHead(403).end(); return; }
    let status = 200;
    try { if ((await stat(file)).isDirectory()) file = path.join(file, "index.html"); await stat(file); }
    catch { file = path.join(root, "404.html"); status = 404; }
    const compress = /\bgzip\b/.test(request.headers["accept-encoding"] || "") && [".html", ".css", ".js", ".json", ".txt", ".xml", ".svg"].includes(path.extname(file));
    response.writeHead(status, { "Content-Type": types[path.extname(file)] || "application/octet-stream", "X-Content-Type-Options": "nosniff", "Cache-Control": pathname.startsWith("/_next/static/") ? "public, max-age=31536000, immutable" : "no-cache", "Vary": "Accept-Encoding", ...(compress ? { "Content-Encoding": "gzip" } : {}) });
    if (request.method === "HEAD") { response.end(); return; }
    const stream = createReadStream(file).on("error", () => response.destroy());
    if (compress) stream.pipe(createGzip()).on("error", () => response.destroy()).pipe(response);
    else stream.pipe(response);
  } catch { response.writeHead(400).end("Bad request"); }
});
server.listen(port, host, () => console.log(`Portfolio preview: http://${host}:${port}`));
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.close(() => process.exit(0)));
