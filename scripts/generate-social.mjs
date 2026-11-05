import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await mkdir("public/images/social", { recursive: true });
const escape = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
const items = [
  ["portfolio", ["Flutter apps,", "from architecture", "to release."], "SELECTED WORK · FLUTTER · ANDROID & IOS", "ceb-lms-dashboard", "#edf1e8"],
  ["elkanteen", ["ElKanteen", "A connected", "school canteen."], "EDUCATION · PAYMENTS", "canteen-student", "#fff0d9"],
  ["weevo", ["Weevo", "Delivering", "better apps."], "LOGISTICS · DELIVERY", "weevo-home", "#e8efff"],
  ["ceb-lms", ["CEB LMS", "Learning,", "connected."], "EDUCATION · LEARNING", "ceb-lms-dashboard", "#eee7f8"],
  ["ceb-workspace", ["CEB Workspace", "The working day,", "made simpler."], "ENTERPRISE · HR", "ceb-work-dashboard", "#e8eee9"],
  ["cognitech-workspace", ["Cognitech", "Enterprise,", "on mobile."], "ENTERPRISE · OPERATIONS", "cognitech-home", "#e5f1f6"],
  ["linesteel", ["LineSteel", "From request", "to job done."], "SERVICES · MAINTENANCE", "linesteel-client", "#e2efeb"],
];
for (const [slug, lines, category, screenshot, color] of items) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#fafbf8"/><rect x="740" y="0" width="460" height="630" fill="${color}"/><circle cx="970" cy="310" r="237" fill="none" stroke="#b8c8b5"/><rect x="65" y="50" width="48" height="48" rx="12" fill="#203d34"/><text x="74" y="80" fill="white" font-family="Arial,sans-serif" font-size="23">ma.</text><text x="131" y="82" font-family="Arial,sans-serif" font-size="22" fill="#242a27">mohammed adel.</text><text x="65" y="170" font-family="Arial,sans-serif" font-size="13" letter-spacing="2" fill="#286254">${escape(category)}</text>${lines.map((line, index) => `<text x="60" y="${257+index*84}" font-family="Arial,sans-serif" font-weight="600" font-size="${line.length > 16 ? 58 : 67}" letter-spacing="-3" fill="${index === 2 ? "#286254" : "#242a27"}">${escape(line)}</text>`).join("")}<text x="65" y="558" font-family="Arial,sans-serif" font-size="18" fill="#626b64">Flutter Developer &amp; Mobile Software Engineer</text></svg>`;
  const screen = await sharp(`public/images/projects/${screenshot}-640.webp`).resize({ width: 230 }).toBuffer();
  const screenshotMeta = await sharp(screen).metadata();
  const frame = await sharp({ create: { width: 244, height: screenshotMeta.height+14, channels: 4, background: "#292c2a" } }).composite([{ input: screen, left: 7, top: 7 }]).png().toBuffer();
  await sharp(Buffer.from(svg)).composite([{ input: frame, left: 855, top: 64 }]).png().toFile(`public/images/social/${slug}.png`);
}
await sharp("public/icon.svg").resize(180,180).png().toFile("public/apple-icon.png");
console.log("Generated seven social preview images and the Apple touch icon.");
