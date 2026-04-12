const fs = require("node:fs");
const path = require("node:path");

require("@marko/compiler/register");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "out");
const template = require(path.join(root, "src", "index.marko")).default;
const cssPlaceholder = "__INLINE_GLOBALS_CSS__";
const stylesPath = path.join(root, "styles", "globals.css");
const cssInlineAssets = {
  "/assets/InterVariable.woff2": path.join(root, "public", "assets", "InterVariable.woff2"),
  "/assets/hero-bg.jpg": path.join(root, "public", "assets", "hero-bg.jpg"),
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyRecursive(source, target) {
  if (!fs.existsSync(source)) {
    return;
  }

  ensureDir(path.dirname(target));
  fs.cpSync(source, target, { recursive: true });
}

function mimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".mp3") {
    return "audio/mpeg";
  }
  if (ext === ".woff2") {
    return "font/woff2";
  }
  if (ext === ".jpg" || ext === ".jpeg") {
    return "image/jpeg";
  }
  throw new Error(`Unsupported inline asset type: ${ext}`);
}

function toDataUrl(filePath) {
  const mime = mimeType(filePath);
  const bytes = fs.readFileSync(filePath);
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

function inlineAssetUrls(content, replacements) {
  let output = content;
  for (const [assetUrl, dataUrl] of Object.entries(replacements)) {
    output = output.split(assetUrl).join(dataUrl);
  }
  return output;
}

function main() {
  fs.rmSync(outDir, { recursive: true, force: true });
  ensureDir(outDir);

  const inlinedCssDataUrls = Object.fromEntries(
    Object.entries(cssInlineAssets).map(([assetUrl, filePath]) => [assetUrl, toDataUrl(filePath)]),
  );

  const sourceCss = fs.readFileSync(stylesPath, "utf8");
  const processedCss = inlineAssetUrls(sourceCss, inlinedCssDataUrls);

  const html = template.renderSync({}).toString().split(cssPlaceholder).join(processedCss);
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");

  copyRecursive(path.join(root, "public", "assets"), path.join(outDir, "assets"));
  copyRecursive(path.join(root, "styles"), path.join(outDir, "styles"));

  const outCssPath = path.join(outDir, "styles", "globals.css");
  fs.writeFileSync(outCssPath, processedCss, "utf8");
}

main();
