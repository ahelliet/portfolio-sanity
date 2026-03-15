import {homepageQuery, postsQuery, projectsQuery} from '$lib/sanity/queries'
import type {Page, Post, Project} from '$lib/sanity/queries'
import {handleContactForm} from '$lib/server/contact'
import type {Actions, PageServerLoad} from './$types'

export const load: PageServerLoad = async ({locals}) => {
  const {loadQuery} = locals.sanity
  const [{data: page}, {data: posts}, {data: projects}] =
    await Promise.all([
      loadQuery<Page>(homepageQuery),
      loadQuery<Post[]>(postsQuery),
      loadQuery<Project[]>(projectsQuery),
    ])

  return {page, posts, projects}
}

export const actions: Actions = {
  contact: handleContactForm,
}
