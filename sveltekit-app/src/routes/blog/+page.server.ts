import {postsQuery as query, type Post} from '$lib/sanity/queries'
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({locals}) => {
  const {loadQuery} = locals.sanity
  const initial = await loadQuery<Post[]>(query)

  return {
    query,
    options: {initial},
  }
}
