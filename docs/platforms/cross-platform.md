# Cross-Platform Distribution

## Canonical runtime
The deployed Web/PWA application remains the authoritative production client and API contract. Native clients consume the same CulinaLinkTX routes, authentication boundaries and lifecycle rules.

## iOS / iPadOS
Source includes a SwiftUI shell, host-restricted WKWebView, native tab navigation and XcodeGen project specification. A store archive is blocked until an Apple Developer team, distribution signing, reviewed privacy manifest, required app artwork and on-device validation are present.

Apple App Review requires complete, functional submissions and expects utility beyond a repackaged website. Native-specific functions must therefore be validated before submission.

## Android
Source includes a Kotlin shell and Gradle/Maven repositories with HTTPS-only WebView loading. The project targets Android 16 / API 36 for the 2026 Google Play submission requirement. Release signing is environment-driven and no keystore/password is stored in source.

## Windows and Linux
Electron remains the desktop shell with context isolation, sandboxing and external-link isolation. Release signing and distribution channels are external gates.

## State vocabulary
`SOURCE_READY` → `BUILT` → `SIGNED` → `VALIDATED` → `SUBMITTED` → `APPROVED` → `PUBLISHED`.

Never collapse these states into one another.
