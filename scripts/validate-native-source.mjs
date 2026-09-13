import fs from 'node:fs';

const required = [
  'native/ios/project.yml',
  'native/ios/Sources/CulinaLinkTXApp.swift',
  'native/ios/Sources/CulinaWebView.swift',
  'native/android/app/build.gradle.kts',
  'native/android/app/src/main/AndroidManifest.xml',
  'native/android/app/src/main/java/com/culinalinktx/app/MainActivity.kt',
  'docs/privacy/PRIVACY-POLICY.md',
  'docs/security/SECURITY-POLICY.md',
  'docs/runbooks/NATIVE-RELEASE.md',
  'evidence/native-data-governance-v19.json'
];
const missing = required.filter(path => !fs.existsSync(path));
if (missing.length) { console.error('Missing native/governance files:', missing); process.exit(1); }
const android = fs.readFileSync('native/android/app/build.gradle.kts', 'utf8');
if (!android.includes('targetSdk = 36')) { console.error('Android target SDK 36 gate missing.'); process.exit(1); }
const evidence = JSON.parse(fs.readFileSync('evidence/native-data-governance-v19.json', 'utf8'));
if (evidence.candidate_live_deployment !== 'BLOCKED_BY_APPDEPLOY_LIFETIME_LIMIT') { console.error('Candidate deployment truth mismatch.'); process.exit(1); }
console.log('Native/data-governance source validation passed.');
