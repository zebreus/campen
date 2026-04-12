{
  description = "DarmCamp static Marko site";

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
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.nodejs_20
            pkgs.python3
          ];
        };

        packages.default = pkgs.stdenvNoCC.mkDerivation {
          pname = "darmcamp";
          version = "0.1.0";
          src = ./.;
          nativeBuildInputs = [ pkgs.nodejs_20 ];
          buildPhase = ''
            export HOME=$(mktemp -d)
            npm ci
            npm run build
          '';
          installPhase = ''
            mkdir -p "$out"
            cp -r out/* "$out"/
          '';
        };
      }
    );
}
