#!/usr/bin/env bash
# Weekly media backup script per Phase 10.
# Cloudinary already stores media redundantly, but this creates a periodic
# local export of the Cloudinary asset manifest for disaster-recovery
# purposes, via Cloudinary's Admin API.
# Cron: 0 3 * * 0 /path/to/backup-media.sh
set -euo pipefail

BACKUP_DIR="/var/backups/ideact/media"
DATE=$(date +%Y-%m-%d)
mkdir -p "$BACKUP_DIR"

if [ -z "${CLOUDINARY_CLOUD_NAME:-}" ] || [ -z "${CLOUDINARY_API_KEY:-}" ] || [ -z "${CLOUDINARY_API_SECRET:-}" ]; then
  echo "Cloudinary credentials are not set. Aborting media backup." >&2
  exit 1
fi

curl -s -u "$CLOUDINARY_API_KEY:$CLOUDINARY_API_SECRET" \
  "https://api.cloudinary.com/v1_1/$CLOUDINARY_CLOUD_NAME/resources/image?max_results=500" \
  -o "$BACKUP_DIR/manifest-$DATE.json"

echo "Media manifest saved: $BACKUP_DIR/manifest-$DATE.json"
