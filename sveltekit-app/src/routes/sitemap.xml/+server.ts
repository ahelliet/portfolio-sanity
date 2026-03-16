import {serverClient} from '$lib/sanity/client.server'
import groq from 'groq'
import type {RequestHandler} from './$types'

interface SitemapEntry {
  href: string
  _updatedAt: string
}

const sitemapQuery = groq`*[
  _type in ["page", "post", "project", "homePage"]
  && (defined(slug.current) || _type == "homePage")
  && !(seo.noIndex == true)
] {
  "href": select(
    _type == "homePage" => "/",
    _type == "page" => "/" + slug.current,
    _type == "post" => "/blog/" + slug.current,
    _type == "project" => "/projets/" + slug.current
  ),
  _updatedAt
}`

export const GET: RequestHandler = async ({url}) => {
  const baseUrl = url.origin
  const entries = await serverClient.fetch<SitemapEntry[]>(sitemapQuery)

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${baseUrl}${entry.href}</loc>
    <lastmod>${new Date(entry._updatedAt).toISOString()}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600',
    },
  })
}
