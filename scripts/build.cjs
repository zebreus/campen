const fs = require("node:fs");
const path = require("node:path");

require("@marko/compiler/register");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "out");
const template = require(path.join(root, "src", "index.marko")).default;

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

function main() {
  fs.rmSync(outDir, { recursive: true, force: true });
  ensureDir(outDir);

  const html = template.renderSync({}).toString();
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");

  copyRecursive(path.join(root, "public", "assets"), path.join(outDir, "assets"));
  copyRecursive(path.join(root, "styles"), path.join(outDir, "styles"));
}

main();
