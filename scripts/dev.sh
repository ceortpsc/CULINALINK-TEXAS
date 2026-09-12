#!/usr/bin/env sh
set -eu
npm install
npm run typecheck
npm run dev:mobile
