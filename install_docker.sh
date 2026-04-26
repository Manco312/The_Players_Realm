#!/bin/bash
set -euo pipefail

# ──────────────────────────────────────────
#  Instalación de Docker CE + Docker Compose
#  Compatible: Debian Buster / Ubuntu 20.04+
# ──────────────────────────────────────────

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

log()  { echo -e "${GREEN}[✔] $1${NC}"; }
warn() { echo -e "${YELLOW}[!] $1${NC}"; }

# 1. Dependencias
log "Instalando dependencias..."
sudo apt-get update -qq
sudo apt-get install -y -qq \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg2 \
  software-properties-common

# 2. Clave GPG oficial de Docker
log "Agregando clave GPG de Docker..."
curl -fsSL https://download.docker.com/linux/debian/gpg \
  | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 3. Repositorio estable
log "Agregando repositorio de Docker..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/debian $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 4. Instalar Docker CE
log "Instalando Docker CE..."
sudo apt-get update -qq
sudo apt-get install -y -qq docker-ce docker-ce-cli containerd.io

# 5. Docker sin sudo (opcional)
sudo usermod -aG docker "$USER"
warn "Cierra sesión y vuelve a entrar para usar Docker sin sudo"

# 6. Verificación
log "Versiones instaladas:"
docker -v
docker compose version