import {layoutQuery, type LayoutData} from '$lib/sanity/queries'
import type {LayoutServerLoad} from './$types'

export const load: LayoutServerLoad = async (event) => {
  const {previewEnabled, loadQuery} = event.locals.sanity
  const {data: layout} = await loadQuery<LayoutData>(layoutQuery)

  event.locals.lang = layout?.language || 'fr'

  return {previewEnabled, layout}
}
