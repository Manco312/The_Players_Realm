#!/bin/bash
set -euo pipefail

export VITE_API_BASE_URL=http://34.30.103.224:3000
export CORS_ORIGIN=http://34.30.103.224,http://127.0.0.1

docker compose up -d --build