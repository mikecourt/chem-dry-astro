#!/bin/bash
# Recover missing blog images from Wayback Machine
# Usage: ./tools/recover-images.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
TODO_FILE="$SCRIPT_DIR/images-to-download.txt"
IMG_DIR="$REPO_DIR/public/images/blog"

mkdir -p "$IMG_DIR"

SUCCESS=0
FAILED=()

while IFS= read -r line; do
  [[ -z "$line" ]] && continue
  SOURCE=$(echo "$line" | awk '{print $1}')
  DEST=$(echo "$line" | awk '{print $3}')
  DEST_PATH="$REPO_DIR/$DEST"
  FILENAME=$(basename "$DEST_PATH")

  # Skip if already exists
  if [[ -f "$DEST_PATH" ]]; then
    echo "✓ SKIP (exists): $FILENAME"
    ((SUCCESS++)) || true
    continue
  fi

  echo -n "→ $FILENAME ... "

  # Try direct download first (works for YouTube thumbnails)
  if curl -sf --max-time 15 -o "$DEST_PATH" "$SOURCE" 2>/dev/null; then
    SIZE=$(wc -c < "$DEST_PATH")
    if [[ $SIZE -gt 1000 ]]; then
      echo "✓ direct ($SIZE bytes)"
      ((SUCCESS++)) || true
      continue
    fi
    rm -f "$DEST_PATH"
  fi

  # Try Wayback Machine CDX to find a snapshot
  ENCODED_URL=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$SOURCE', safe=':/'))")
  CDX_RESP=$(curl -sf --max-time 20 \
    "https://web.archive.org/cdx/search/cdx?url=${SOURCE}&output=json&limit=1&filter=statuscode:200&fl=timestamp,original&collapse=digest" \
    2>/dev/null || echo "")

  if [[ -z "$CDX_RESP" || "$CDX_RESP" == "[]" || "$CDX_RESP" == "null" ]]; then
    echo "✗ no Wayback snapshot"
    FAILED+=("$FILENAME")
    continue
  fi

  TIMESTAMP=$(echo "$CDX_RESP" | python3 -c "import json,sys; data=json.load(sys.stdin); print(data[1][0])" 2>/dev/null || echo "")
  ORIG_URL=$(echo "$CDX_RESP" | python3 -c "import json,sys; data=json.load(sys.stdin); print(data[1][1])" 2>/dev/null || echo "")

  if [[ -z "$TIMESTAMP" ]]; then
    echo "✗ bad CDX response"
    FAILED+=("$FILENAME")
    continue
  fi

  WAYBACK_URL="https://web.archive.org/web/${TIMESTAMP}if_/${ORIG_URL}"
  sleep 1  # Rate limiting

  if curl -sf --max-time 30 -o "$DEST_PATH" "$WAYBACK_URL" 2>/dev/null; then
    SIZE=$(wc -c < "$DEST_PATH")
    if [[ $SIZE -gt 1000 ]]; then
      echo "✓ Wayback ($SIZE bytes, ts=$TIMESTAMP)"
      ((SUCCESS++)) || true
      continue
    fi
    rm -f "$DEST_PATH"
    echo "✗ too small ($SIZE bytes)"
    FAILED+=("$FILENAME")
  else
    echo "✗ Wayback download failed"
    FAILED+=("$FILENAME")
  fi

done < "$TODO_FILE"

echo ""
echo "=== Summary ==="
echo "Recovered: $SUCCESS / $(wc -l < "$TODO_FILE" | tr -d ' ')"
if [[ ${#FAILED[@]} -gt 0 ]]; then
  echo "Failed (${#FAILED[@]}):"
  for f in "${FAILED[@]}"; do
    echo "  - $f"
  done
fi
