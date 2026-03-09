import {projectQuery as query, type Project} from '$lib/sanity/queries'
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({locals, params}) => {
  const {loadQuery} = locals.sanity
  const {slug} = params
  const initial = await loadQuery<Project>(query, {slug})

  return {
    query,
    params: {slug},
    options: {initial},
  }
}
