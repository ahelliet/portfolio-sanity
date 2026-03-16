import type {ResolvedPathname} from '$app/types'
import type {SanityLocals} from '@sanity/sveltekit'

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Locals extends SanityLocals {
      lang?: string
    }
  }
}

declare module '$app/paths' {
  export function resolve(path: '/preview/disable', options?: {redirect?: string}): ResolvedPathname
}

export {}
