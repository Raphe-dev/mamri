import {frFRLocale} from '@sanity/locale-fr-fr'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {newDocumentOptions, structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Maison régionale de l’industrie',

  projectId: 'u5ov5dbs',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    frFRLocale({title: 'Français'}),
    visionTool({defaultApiVersion: '2025-02-19'}),
  ],

  schema: {
    types: schemaTypes,
  },
  document: {newDocumentOptions},
  tools: (prev, {currentUser}) => {
    const isAdmin = currentUser?.roles?.some((r) => r.name === 'administrator')
    return isAdmin ? prev : prev.filter((t) => t.name !== 'vision')
  },
})
