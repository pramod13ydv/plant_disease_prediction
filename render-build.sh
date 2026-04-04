#!/usr/bin/env bash
# Exit on error
set -o errexit

# Frontend: Install dependencies & Build
echo "Building Frontend..."
npm install
npm run build

# Backend: Install dependencies
echo "Installing Backend dependencies..."
pip install -r requirements.txt
