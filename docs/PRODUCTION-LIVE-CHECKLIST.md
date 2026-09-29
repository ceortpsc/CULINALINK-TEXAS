# CulinaLinkTX Production Live Checklist

## 1. Source control
- [x] Production baseline branch created (`production-v13-sync`).
- [x] Next.js project configuration pushed.
- [x] Core UI and route architecture pushed.
- [x] Core API/workflow source pushed.
- [x] Production evidence files added.
- [ ] Merge to `main` only after branch validation and review are complete.
- [ ] Binary asset parity must be checked separately from text-source parity.

## 2. Build and configuration
- [x] AppDeploy production snapshot built and deployed.
- [x] Production snapshot status is READY.
- [x] No surfaced frontend/backend/network errors in latest QA status.
- [ ] GitHub/local build parity is separate because AppDeploy injects platform SDK modules.
- [ ] Secrets must remain in platform secret storage, never source control.

## 3. Functional validation
- [x] Homepage engagement and CTAs deployed.
- [x] Discovery and booking-request surfaces deployed.
- [x] Provider/seeker onboarding workflows deployed.
- [x] Verified Professional program deployed.
- [x] Support + Andreaa surfaces deployed.
- [x] Runtime/release governance centers deployed.
- [x] DoorDash adapter source deployed with production gates.
- [x] Rapid payout workflow source deployed with provider gates.
- [ ] Full downstream commerce/payment/order lifecycle remains partial until provider configuration is complete.

## 4. Testing
- [x] Five-workflow QA specification maintained in `tests/tests.txt`.
- [x] Mobile and desktop QA renders generated.
- [x] Runtime error surfaces clean at latest check.
- [ ] AppDeploy reports `e2e_tests: null`; full E2E execution is NOT verified.
- [ ] Manual keyboard/screen-reader review must be recorded before WCAG 2.2 AA is declared verified.
- [ ] Production load/performance examination must be recorded before performance SLOs are declared verified.

## 5. Security
- [x] Server-side authentication boundaries on protected APIs.
- [x] External secrets excluded from browser source.
- [x] Verification/upload state kept distinct from authoritative verification.
- [x] Financial/external operations use explicit gates.
- [x] Source validation includes secret-pattern checks.
- [ ] Independent dependency/vulnerability scan evidence required for final GA sign-off.
- [ ] Privileged MFA/RBAC expansion remains a production-hardening workstream.

## 6. Data and migrations
- [x] Explicit migration/reference files maintained.
- [x] Runtime data states preserve truthful lifecycle labels.
- [ ] Production PostgreSQL application of reference migration files must be independently confirmed before labeling them applied.
- [ ] Backup + restore testing evidence required before backup readiness is declared verified.

## 7. Workers and automations
- [x] Credential-expiration/verification sweep is active and last status is success.
- [x] Runtime worker architecture is coded.
- [ ] Other runtime worker schedules must not be called active without independent scheduler confirmation.

## 8. External production gates
- [ ] Production payment processor.
- [ ] Production payout/issuing provider.
- [ ] DoorDash production entitlement and credentials for real dispatch.
- [ ] Apple Developer signing/App Store review.
- [ ] Google Play signing/review.
- [ ] Any government permit/license/registration applicable to actual operations must be verified externally.

## Release classification
Current evidence supports: **DEPLOYED_LIVE_CANDIDATE / READY runtime**.

Do not promote to **STABLE/GA** solely because the web deployment is READY. External gates and release examinations remain separate controls.
