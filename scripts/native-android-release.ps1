$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
Set-Location (Join-Path $Root 'native\android')
if (-not $env:ANDROID_HOME) { throw 'BLOCKED: ANDROID_HOME is required.' }
if (-not $env:CULINALINK_ANDROID_KEYSTORE) { throw 'BLOCKED: CULINALINK_ANDROID_KEYSTORE is required.' }
if (-not $env:CULINALINK_ANDROID_STORE_PASSWORD) { throw 'BLOCKED: store password is required through the release environment.' }
if (-not $env:CULINALINK_ANDROID_KEY_ALIAS) { throw 'BLOCKED: key alias is required.' }
if (-not $env:CULINALINK_ANDROID_KEY_PASSWORD) { throw 'BLOCKED: key password is required through the release environment.' }
$Gradle = if (Test-Path '.\gradlew.bat') { '.\gradlew.bat' } elseif (Get-Command gradle -ErrorAction SilentlyContinue) { 'gradle' } else { throw 'BLOCKED: Gradle or generated wrapper is required.' }
& $Gradle lint test bundleRelease
if ($LASTEXITCODE -ne 0) { throw 'Android validation/build failed.' }
Write-Host 'BUNDLE_CREATED. Play submission/review/publication remain separate external states.'
