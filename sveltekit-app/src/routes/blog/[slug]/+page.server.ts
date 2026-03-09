import {postQuery as query, type Post} from '$lib/sanity/queries'
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({locals, params}) => {
  const {loadQuery} = locals.sanity
  const {slug} = params
  const initial = await loadQuery<Post>(query, {slug})

  return {
    query,
    params: {slug},
    options: {initial},
  }
}
