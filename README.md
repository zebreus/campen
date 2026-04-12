# campen

Static DARMCAMP website built with Marko and exported as plain HTML/CSS/JS.

## Development

1. Install dependencies:

```bash
npm ci
```

2. Build static output:

```bash
npm run build
```

3. Serve the generated site:

```bash
npm run dev
```

The generated site is written to `out/`.

## Nix Flake

Use the provided `flake.nix` for reproducible tooling:

```bash
nix develop
```

Then run build/check commands as usual.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml`:

1. runs `npm ci`
2. runs `npm run build`
3. uploads `out/` as the Pages artifact
