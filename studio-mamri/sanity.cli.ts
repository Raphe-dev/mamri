import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'u5ov5dbs',
    dataset: 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'g3u4hsrkddtjq6p1qcyx7f0b',
  },
  typegen: {
    enabled: true,
    path: '../app/**/*.{ts,vue}',
    schema: 'schema.json',
    generates: '../app/content/sanity.types.ts',
    overloadClientMethods: true,
  },
})
