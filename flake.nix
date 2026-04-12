{
  description = "DarmCamp static HTML site";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };

        # Hot-reloading dev server: serves src/ directly — HTML, CSS, fonts, and media
        # all live under one root, so no path juggling is needed.
        devScript = pkgs.writeShellScriptBin "dev" ''
          exec ${pkgs.nodePackages.live-server}/bin/live-server src --port=8000
        '';
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.deno
            devScript
          ];
        };

        apps.dev = {
          type = "app";
          program = "${devScript}/bin/dev";
        };

        packages.default = pkgs.stdenvNoCC.mkDerivation {
          pname = "darmcamp";
          version = "0.1.0";
          src = ./.;
          nativeBuildInputs = [ pkgs.deno ];
          buildPhase = ''
            export HOME=$(mktemp -d)
            export DENO_DIR=$(mktemp -d)
            deno run --allow-read --allow-write scripts/build.ts
          '';
          installPhase = ''
            mkdir -p "$out"
            cp -r out/* "$out"/
          '';
        };
      }
    );
}
