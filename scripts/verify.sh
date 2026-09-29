#!/usr/bin/env sh
set -eu
npm run typecheck
npm run build
printf '%s\n' 'CulinaLink runtime build verified.'
