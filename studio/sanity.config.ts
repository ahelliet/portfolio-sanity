import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { frFRLocale } from '@sanity/locale-fr-fr'

import { schemaTypes } from './schemas'
import { codeInput } from '@sanity/code-input'
import { media } from 'sanity-plugin-media'
import { dashboardTool, projectInfoWidget, projectUsersWidget } from '@sanity/dashboard'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset = process.env.SANITY_STUDIO_DATASET!

export default defineConfig({
  name: 'portfolio-studio',
  title: 'Portfolio Studio',
  projectId,
  dataset,
  plugins: [
    dashboardTool({
      widgets: [
        projectInfoWidget(),
        projectUsersWidget(),
      ]
    }),
    structureTool(),
    presentationTool({
      previewUrl: {
        origin:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:5173'
            : process.env.SANITY_STUDIO_PREVIEW_URL!,
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
    media(),
    visionTool(),
    frFRLocale(),
    codeInput(),
  ],
  schema: {
    types: schemaTypes,
  },
})
