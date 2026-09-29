#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
command -v xcodebuild >/dev/null || { echo 'BLOCKED: Xcode/xcodebuild is required.'; exit 2; }
command -v xcodegen >/dev/null || { echo 'BLOCKED: xcodegen is required.'; exit 2; }
: "${APPLE_TEAM_ID:?BLOCKED: APPLE_TEAM_ID must be supplied through the release environment.}"
[ -f native/ios/Resources/PrivacyInfo.xcprivacy ] || { echo 'BLOCKED: reviewed PrivacyInfo.xcprivacy is required.'; exit 2; }
[ -f native/ios/Resources/AppIcon-1024.png ] || { echo 'BLOCKED: native 1024px App Store icon is required.'; exit 2; }
cd native/ios
xcodegen generate
xcodebuild -project CulinaLinkTX.xcodeproj -scheme CulinaLinkTX -configuration Release -destination 'generic/platform=iOS' CODE_SIGN_STYLE=Automatic DEVELOPMENT_TEAM="$APPLE_TEAM_ID" archive -archivePath build/CulinaLinkTX.xcarchive
echo 'ARCHIVE_CREATED. Submission/approval/publication are separate external states.'
