import {projectsQuery as query, type Project} from '$lib/sanity/queries'
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({locals}) => {
  const {loadQuery} = locals.sanity
  const initial = await loadQuery<Project[]>(query)

  return {
    query,
    options: {initial},
  }
}
