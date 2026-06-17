#!/usr/bin/env bash
# Flattens frontend/dist/pages/*.html into the site root so the deployed
# URLs don't show /pages/, while the repo keeps that folder for organization.
set -euo pipefail

SRC="frontend/dist"
OUT="_site"

rm -rf "$OUT"
mkdir -p "$OUT"

cp -r "$SRC/assets" "$OUT/assets"

for f in "$SRC"/pages/*.html; do
  name=$(basename "$f")
  sed -e 's|\.\./assets/|assets/|g' "$f" > "$OUT/$name"
done

echo "Built site at $OUT:"
find "$OUT" -maxdepth 1 -type f -name "*.html" | sort
