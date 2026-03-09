import {homePageQuery as query, type HomePage} from '$lib/sanity/queries'
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({locals}) => {
  const {loadQuery} = locals.sanity
  const initial = await loadQuery<HomePage>(query)

  return {
    query,
    options: {initial},
  }
}
