plugins { id("com.android.application"); id("org.jetbrains.kotlin.android") }
android {
    namespace = "com.culinalinktx.app"
    compileSdk = 36
    defaultConfig { applicationId = "com.culinalinktx.app"; minSdk = 26; targetSdk = 36; versionCode = 1; versionName = "10.0.0" }
    val storeFilePath = System.getenv("CULINALINK_ANDROID_KEYSTORE")
    val storePasswordValue = System.getenv("CULINALINK_ANDROID_STORE_PASSWORD")
    val keyAliasValue = System.getenv("CULINALINK_ANDROID_KEY_ALIAS")
    val keyPasswordValue = System.getenv("CULINALINK_ANDROID_KEY_PASSWORD")
    signingConfigs { if (!storeFilePath.isNullOrBlank() && !storePasswordValue.isNullOrBlank() && !keyAliasValue.isNullOrBlank() && !keyPasswordValue.isNullOrBlank()) create("release") { storeFile = file(storeFilePath); storePassword = storePasswordValue; keyAlias = keyAliasValue; keyPassword = keyPasswordValue } }
    buildTypes { release { isMinifyEnabled = true; isShrinkResources = true; signingConfig = signingConfigs.findByName("release"); proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro") } }
}
dependencies { implementation("androidx.core:core-ktx:1.17.0"); implementation("androidx.appcompat:appcompat:1.7.1"); implementation("com.google.android.material:material:1.13.0") }
