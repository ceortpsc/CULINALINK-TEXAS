# iOS Privacy Manifest Release Gate

Do not generate or ship PrivacyInfo.xcprivacy from assumptions. Before an App Store archive is built, inventory every native API and third-party SDK in the final Xcode dependency graph and declare only data categories and required-reason APIs actually used.

Release requires `native/ios/Resources/PrivacyInfo.xcprivacy`, completed privacy/legal review, and App Store privacy disclosures matching the actual binary.
