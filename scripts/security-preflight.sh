#!/usr/bin/env sh
set -eu
printf '%s\n' 'Preflight: no production secrets should exist in source.'
if grep -R -n -E '(sk_live_|BEGIN PRIVATE KEY|password[[:space:]]*=)' . --exclude-dir=node_modules --exclude='*.md'; then echo 'Potential secret pattern found'; exit 1; fi
printf '%s\n' 'Source secret-pattern preflight passed.'
