import blockContent from './blockContent'
import homePage from './homePage'
import link from './objects/link'
import seo from './objects/seo'
import mermaid from './mermaid'
import page from './page'
import post from './post'
import project from './project'
import siteSettings from './siteSettings'
import {sectionTypes} from './sections'

export const schemaTypes = [
  // Documents
  page,
  post,
  project,
  // Singletons
  siteSettings,
  homePage,
  // Block types
  blockContent,
  mermaid,
  // Object types
  link,
  seo,
  // Section types
  ...sectionTypes,
]
