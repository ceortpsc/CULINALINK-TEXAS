#!/usr/bin/env sh
set -eu
npm run build
printf '%s\n' 'Web/PWA export built. Native machine-code compilation requires Xcode and Apple signing.'
