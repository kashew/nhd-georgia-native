import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'net.kashew.nhd.ga',
  appPath: 'app',
  appResourcesPath: 'app/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
} as NativeScriptConfig
