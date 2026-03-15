import {pageBySlugQuery, postsQuery, projectsQuery} from '$lib/sanity/queries'
import type {Page, Post, Project} from '$lib/sanity/queries'
import {handleContactForm} from '$lib/server/contact'
import {error} from '@sveltejs/kit'
import type {Actions, PageServerLoad} from './$types'

export const load: PageServerLoad = async ({params, locals}) => {
  const {loadQuery} = locals.sanity
  const {data: page} = await loadQuery<Page | null>(pageBySlugQuery, {slug: params.slug})

  if (!page) {
    throw error(404, 'Page non trouvée')
  }

  const gridSources = new Set(
    (page.sections ?? [])
      .filter((s) => s._type === 'section.grid')
      .map((s) => (s as {source?: string}).source)
      .filter(Boolean),
  )

  const [posts, projects] = await Promise.all([
    gridSources.has('posts') ? loadQuery<Post[]>(postsQuery).then((r) => r.data) : Promise.resolve([]),
    gridSources.has('projects') ? loadQuery<Project[]>(projectsQuery).then((r) => r.data) : Promise.resolve([]),
  ])

  return {page, posts, projects}
}

export const actions: Actions = {
  contact: handleContactForm,
}
