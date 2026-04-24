#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
PREFIX=${PREFIX:-"$HOME/.local"}
BIN_DIR="$PREFIX/bin"

mkdir -p "$BIN_DIR"
cp "$SCRIPT_DIR/dsrun" "$BIN_DIR/dsrun"
chmod +x "$BIN_DIR/dsrun"

printf 'installed: %s\n' "$BIN_DIR/dsrun"
case ":$PATH:" in
  *":$BIN_DIR:"*) ;;
  *)
    printf 'note: add %s to PATH, for example:\n' "$BIN_DIR"
    printf '  export PATH="$HOME/.local/bin:$PATH"\n'
    ;;
esac
