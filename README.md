# NHD Georgia

> NHD Georgia is a tool to assist students on the journey to creating and presenting their National History Day project.

## Usage

``` bash
# Install dependencies
npm install

# Build for production
tns build <platform> --bundle

# Build, watch for changes and debug the application
tns debug <platform> --bundle

# Build, watch for changes and run the application
tns run <platform> --bundle
```

## Publishing to App Store

### iOS

Be sure to update the `Info.plist` located at `App_Resources/iOS`.  The fields to be updated are:

* `CFBundleVersion`
* `CFBundleShortVersionString`

You will need to generate an app-specific password.  This can be done here:

`https://appleid.apple.com > Security > App-Specific Passwords > Generate Password...`

```
# Build release version for iOS App Store (Generates IPA File)
tns build ios --release --provision be82990f-bd65-41f9-8c8f-c49a4d348078 --for-device

# Publish IPA file to the App Store
tns publish ios mpatricks@gmail.com '<password>' --appleApplicationSpecificPassword '<app-specific-password>' --ipa platforms/ios/build/Release-iphoneos/nhdgeorgianative.ipa

# Publish to App Store via XCode
XCode > Product > Archive
```

### Android

Be sure to update the `AndroidManifest.xml` located at `App_Resources/Android/src/main`.  The attributes that need to be updated are on the `<manifest />` tag:

* `android:versionCode`
* `android:versionName`

```
# Build release version for Google Play Store
tns build android --release --key-store-path nhd_ga_release.keystore --key-store-password <store-password> --bundle --key-store-alias <alias> --key-store-alias-password <alias-password>
```