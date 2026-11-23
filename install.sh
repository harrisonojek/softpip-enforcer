#!/usr/bin/env bash
set -euo pipefail

# SoftPip The Enforcer — One-command VPS Installer
# Target directory: /opt/softpip-enforcer

echo "=== SoftPip The Enforcer: VPS Setup ==="

# 1. Verify Docker is present
if ! command -v docker >/dev/null 2>&1; then
  echo "Error: Docker is not installed or not in PATH." >&2
  echo "Please install Docker before running this script (e.g. curl -fsSL https://get.docker.com | sh)." >&2
  exit 1
fi

INSTALL_DIR="/opt/softpip-enforcer"
REPO_URL="https://github.com/harrisonojek/softpip-enforcer.git"

# 2. Clone the repo to /opt/softpip-enforcer
if [ -d "$INSTALL_DIR" ]; then
  echo "Directory $INSTALL_DIR exists. Pulling latest main branch..."
  git -C "$INSTALL_DIR" pull --ff-only origin main || true
else
  echo "Cloning $REPO_URL to $INSTALL_DIR..."
  git clone "$REPO_URL" "$INSTALL_DIR"
fi

cd "$INSTALL_DIR"

# 3. Copy config.example.yaml to config.yaml if absent
if [ ! -f "config.yaml" ]; then
  if [ -f "config.example.yaml" ]; then
    echo "Creating config.yaml from config.example.yaml..."
    cp "config.example.yaml" "config.yaml"
  else
    echo "Warning: config.example.yaml not found in $INSTALL_DIR." >&2
  fi
else
  echo "Existing config.yaml found; preserving current configuration."
fi

# 4. Build Docker image
echo "Building Docker container image 'softpip-enforcer'..."
docker build -t softpip-enforcer .

# 5. Print next steps
cat <<'EOF'

=== Installation Complete ===

Next steps:
1. Edit your configuration file:
   nano /opt/softpip-enforcer/config.yaml

2. Add your Deriv API token (Read & Trade scopes) and Telegram bot credentials.

3. Start the enforcer container:
   docker run -d --name enforcer --restart unless-stopped -v /opt/softpip-enforcer/config.yaml:/app/config.yaml softpip-enforcer

4. Verify container logs:
   docker logs -f enforcer

EOF
