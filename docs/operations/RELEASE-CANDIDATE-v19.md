# CulinaLinkTX Native/Data Governance Release Candidate v19

## Source state
- Branch: `native-data-governance-v19`
- Parent: `production-v13-sync`
- Web runtime preceding candidate: AppDeploy v18 / snapshot `1789267764649`
- Candidate live deployment: BLOCKED_BY_APPDEPLOY_LIFETIME_LIMIT
- AppDeploy usage: 125/125 lifetime deploy requests

## Candidate scope
- iOS SwiftUI source shell and release gate script
- Android Kotlin/API-36 source shell and PowerShell release script
- Privacy/data-governance APIs and UI source
- Verified-only reference seeding control
- Bounded self-healing worker source
- Privacy/security/legal/runbooks and export templates

## Truth states
Source-controlled does not mean built, signed, submitted, approved, published or deployed. Candidate E2E, device testing and store review have not executed because the live deployment step was blocked before build by the platform account limit.
