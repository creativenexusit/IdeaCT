#!/usr/bin/env bash
# Daily MongoDB backup script per Phase 10.
# Intended to run via cron: 0 2 * * * /path/to/backup-mongodb.sh
set -euo pipefail

BACKUP_DIR="/var/backups/ideact/mongodb"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
RETENTION_DAYS=14

mkdir -p "$BACKUP_DIR"

# Requires DATABASE_URL to be set in the environment (e.g. via /etc/environment
# or systemd EnvironmentFile) — same variable the app itself uses.
if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is not set. Aborting backup." >&2
  exit 1
fi

mongodump --uri="$DATABASE_URL" --gzip --archive="$BACKUP_DIR/ideact-$DATE.gz"

# Prune backups older than the retention window.
find "$BACKUP_DIR" -name "ideact-*.gz" -mtime "+$RETENTION_DAYS" -delete

echo "Backup complete: $BACKUP_DIR/ideact-$DATE.gz"
