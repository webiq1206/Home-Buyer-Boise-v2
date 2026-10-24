#!/bin/bash
set -e
npm run build
# Submit sitemap URLs to IndexNow for search engine indexing.
# Non-fatal: the key file is not reachable until this deploy is live.
if command -v node &>/dev/null; then
  node scripts/submit-indexnow.mjs || echo "IndexNow submission skipped (non-fatal)"
fi
