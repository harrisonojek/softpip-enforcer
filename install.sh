#!/usr/bin/env bash
set -euo pipefail

# SoftPip The Enforcer — Autonomous Risk Governor Setup Script
# Target directory: /opt/softpip-enforcer or current directory

echo "=========================================================="
echo " SoftPip The Enforcer — Installation & Quickstart (v0.1.0)"
echo " 'It has no edge over the market. It has an edge over you.'"
echo "=========================================================="

INSTALL_DIR="${1:-/opt/softpip-enforcer}"

if [ ! -d "$INSTALL_DIR" ]; then
  echo "Target directory $INSTALL_DIR does not exist. Creating..."
  sudo mkdir -p "$INSTALL_DIR"
  sudo chown "$USER":"$(id -gn)" "$INSTALL_DIR"
fi

echo "Setting up in $INSTALL_DIR..."
cd "$INSTALL_DIR"

if [ ! -f "config.yaml" ] && [ -f "config.example.yaml" ]; then
  echo "Copying config.example.yaml to config.yaml..."
  cp config.example.yaml config.yaml
fi

if [ ! -f ".env" ] && [ -f ".env.example" ]; then
  echo "Copying .env.example to .env..."
  cp .env.example .env
  chmod 600 .env
fi

if command -v docker >/dev/null 2>&1; then
  echo "Docker detected. Building Docker image 'softpip-enforcer'..."
  docker build -t softpip-enforcer .
  echo ""
  echo "Installation Complete!"
  echo "To launch in dry-run mode via Docker:"
  echo "  docker run --rm softpip-enforcer python main.py --dry-run --config config.example.yaml"
  echo ""
  echo "To launch via Docker Compose:"
  echo "  docker compose up -d"
else
  echo "Docker not found. Falling back to local Python setup..."
  python3 -m venv .venv
  source .venv/bin/activate
  pip install --upgrade pip
  pip install -r requirements.txt
  echo ""
  echo "Running 60-second Dry-Run Self-Test..."
  python main.py --dry-run --config config.example.yaml
  echo ""
  echo "Installation Complete!"
  echo "To run live trading (requires 200 clean demo trades in journal):"
  echo "  source .venv/bin/activate"
  echo "  python main.py --live --config config.yaml"
fi
