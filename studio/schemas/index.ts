import author from './author'
import blockContent from './blockContent'
import homePage from './homePage'
import mermaid from './mermaid'
import post from './post'
import project from './project'
import siteSettings from './siteSettings'
import testimonial from './testimonial'
import tool from './tool'

export const schemaTypes = [
  // Documents
  post,
  project,
  author,
  testimonial,
  tool,
  // Singletons
  siteSettings,
  homePage,
  // Block types
  blockContent,
  mermaid,
]
