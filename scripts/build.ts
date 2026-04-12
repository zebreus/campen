/// <reference lib="deno.ns" />

const srcDir = new URL("../src/", import.meta.url);
const outDir = new URL("../out/", import.meta.url);
const templatePath = new URL("../src/index.html", import.meta.url);
const stylesPath = new URL("../src/globals.css", import.meta.url);
const cssLinkTag = `<link rel="stylesheet" href="/globals.css">`;
const cssInlineAssets = {
  "/InterVariable.woff2": new URL(
    "../src/InterVariable.woff2",
    import.meta.url,
  ),
  "/hero-bg.jpg": new URL("../src/hero-bg.jpg", import.meta.url),
} as const;
// Files handled by the build step — not copied verbatim to out/
const skipInBuild = new Set([
  "index.html",
  "globals.css",
  "InterVariable.woff2",
  "hero-bg.jpg",
]);

async function ensureDir(dir: string | URL) {
  await Deno.mkdir(dir, { recursive: true });
}

async function copyRecursive(source: URL, target: URL) {
  try {
    await Deno.stat(source);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return;
    }
    throw error;
  }

  await ensureDir(target);

  for await (const entry of Deno.readDir(source)) {
    const sourceEntry = new URL(
      entry.name + (entry.isDirectory ? "/" : ""),
      source,
    );
    const targetEntry = new URL(
      entry.name + (entry.isDirectory ? "/" : ""),
      target,
    );

    if (entry.isDirectory) {
      await copyRecursive(sourceEntry, targetEntry);
      continue;
    }

    await ensureDir(new URL("./", targetEntry));
    if (!skipInBuild.has(entry.name)) {
      await Deno.copyFile(sourceEntry, targetEntry);
    }
  }
}

function mimeType(filePath: string) {
  const lower = filePath.toLowerCase();
  if (lower.endsWith(".mp3")) {
    return "audio/mpeg";
  }
  if (lower.endsWith(".woff2")) {
    return "font/woff2";
  }
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) {
    return "image/jpeg";
  }
  throw new Error(`Unsupported inline asset type: ${filePath}`);
}

async function toDataUrl(filePath: URL) {
  const mime = mimeType(filePath.pathname);
  const bytes = await Deno.readFile(filePath);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return `data:${mime};base64,${btoa(binary)}`;
}

function inlineAssetUrls(
  content: string,
  replacements: Record<string, string>,
) {
  let output = content;
  for (const [assetUrl, dataUrl] of Object.entries(replacements)) {
    output = output.split(assetUrl).join(dataUrl);
  }
  return output;
}

async function main() {
  await Deno.remove(outDir, { recursive: true }).catch((error: unknown) => {
    if (!(error instanceof Deno.errors.NotFound)) {
      throw error;
    }
  });
  await ensureDir(outDir);

  const inlinedCssDataUrls = Object.fromEntries(
    await Promise.all(
      Object.entries(cssInlineAssets).map(async ([assetUrl, filePath]) => [
        assetUrl,
        await toDataUrl(filePath),
      ]),
    ),
  );

  const sourceCss = await Deno.readTextFile(stylesPath);
  const processedCss = inlineAssetUrls(sourceCss, inlinedCssDataUrls);
  const html = (await Deno.readTextFile(templatePath))
    .split(cssLinkTag)
    .join(`<style>${processedCss}</style>`);

  await Deno.writeTextFile(new URL("index.html", outDir), html);
  await copyRecursive(srcDir, outDir);
}

await main();
