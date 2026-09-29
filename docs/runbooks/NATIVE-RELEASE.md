# Native Release Runbook

## iOS
1. Validate web production health.
2. Inventory native APIs and third-party SDKs.
3. Finalize PrivacyInfo.xcprivacy from actual binary behavior.
4. Provide App Store icon and launch assets.
5. Configure Apple team/signing outside source.
6. Generate Xcode project.
7. Build and test on physical iPhone/iPad.
8. Run accessibility, authentication, deep-link, network-loss and lifecycle tests.
9. Archive and validate.
10. Complete App Store privacy metadata and review notes.
11. Submit.
12. Record APPROVED/PUBLISHED only after App Store Connect confirmation.

## Android
1. Validate web production health.
2. Build against target SDK 36.
3. Run lint/unit/device tests.
4. Supply release keystore through environment only.
5. Build signed AAB.
6. Complete privacy policy, Data Safety, content rating, reviewer access and Play declarations.
7. Submit to an approved testing/production track.
8. Record PUBLISHED only after Play Console confirms release.
