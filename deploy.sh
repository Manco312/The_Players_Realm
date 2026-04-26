#!/bin/bash
set -euo pipefail

export VITE_API_BASE_URL=http://34.61.240.128:3000
export CORS_ORIGIN=http://34.61.240.128,http://127.0.0.1

docker compose down
docker compose build --no-cache
docker compose up -d