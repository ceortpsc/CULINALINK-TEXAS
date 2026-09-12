# CulinaLinkTX Mobile Packaging

The deployed PWA is the current operational client. This directory defines the native-wrapper handoff for Android and iOS.

## Android / Google Play
Use the production web build with Capacitor, register `com.culinalinktx.app`, configure Android signing, privacy/data-safety declarations, screenshots and store listing, then submit through the authorized Google Play developer account. Do not label the Android build published until Play confirms release.

## iOS / Apple Developer
Use the same application contract with Capacitor/Xcode, register the bundle identifier, configure signing, entitlements, privacy manifest, icons, screenshots and App Store Connect metadata, then submit through the authorized Apple Developer account. Do not label the iOS build published until App Store Connect confirms release.
