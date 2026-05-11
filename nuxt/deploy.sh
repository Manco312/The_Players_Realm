#!/bin/bash
set -euo pipefail

export NUXT_PUBLIC_API_BASE=http://34.28.203.6:3000

docker compose down
docker compose build --no-cache
docker compose up -d
