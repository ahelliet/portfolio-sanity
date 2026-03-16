<script lang="ts">
  import {useQuery} from '@sanity/sveltekit'
  import {PortableText} from '@portabletext/svelte'
  import {formatDate} from '$lib/utils/index'
  import {urlFor} from '$lib/sanity/image'
  import {portableTextComponents} from '$lib/components/portable-text'
  import {page} from '$app/state'
  import type {PageProps} from './$types'

  const {data}: PageProps = $props()
  const query = $derived(useQuery(data))
  const post = $derived($query.data)
  const author = $derived(data.layout)

  const siteTitle = $derived(data.layout?.title ?? '')
  const seo = $derived(post?.seo)
  const pageTitle = $derived(seo?.title ? `${seo.title} | ${siteTitle}` : `${post?.title ?? ''} | ${siteTitle}`)
  const description = $derived(seo?.description || post?.excerpt || '')
  const ogImage = $derived(post?.seoImageUrl || data.layout?.ogImageUrl || '')
  const coverUrl = $derived(post?.mainImage ? urlFor(post.mainImage).width(1280).height(480).url() : '')
</script>

<svelte:head>
  {#if coverUrl}<link rel="preload" as="image" href={coverUrl} />{/if}
  <title>{pageTitle}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={page.url.href} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={page.url.href} />
  {#if ogImage}<meta property="og:image" content={ogImage} />{/if}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={description} />
  {#if ogImage}<meta name="twitter:image" content={ogImage} />{/if}
  {#if seo?.noIndex}<meta name="robots" content="noindex" />{/if}
</svelte:head>

{#if post}
  <article class="px-20 pt-24 pb-16">
    <header class="flex flex-col gap-5">
      <nav class="flex items-center gap-1.5 text-sm text-muted-foreground">
        <a href="/blog" class="hover:text-foreground">Blog</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </nav>
      <h1 class="font-serif text-4xl italic text-foreground">{post.title}</h1>
      <div class="flex items-center gap-3 text-sm text-muted-foreground">
        {#if author?.authorName}
          <div class="flex items-center gap-2">
            {#if author.authorAvatar}
              <img src={urlFor(author.authorAvatar).width(32).height(32).url()} alt={author.authorName} class="size-8 rounded-full object-cover" />
            {/if}
            <span>{author.authorName}</span>
          </div>
          <span class="text-border">·</span>
        {/if}
        <span>{formatDate(post._createdAt)}</span>
        {#if post.readingTime}
          <span class="text-border">·</span>
          <span>{post.readingTime} min de lecture</span>
        {/if}
      </div>
      {#if post.tags?.length}
        <div class="flex flex-wrap gap-2">
          {#each post.tags as tag}
            <span class="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">{tag}</span>
          {/each}
        </div>
      {/if}
    </header>

    {#if post.mainImage}
      <img
        class="mt-8 w-full rounded-lg object-cover"
        src={urlFor(post.mainImage).width(1280).height(480).url()}
        alt="Cover image for {post.title}"
        fetchpriority="high"
        loading="eager"
      />
    {/if}

    {#if post.body}
      <div class="mt-10">
        <PortableText components={portableTextComponents} value={post.body} />
      </div>
    {/if}

    {#if author?.authorBio}
      <div class="mt-12 flex items-center gap-4 rounded-lg border border-border bg-accent p-6">
        {#if author.authorAvatar}
          <img src={urlFor(author.authorAvatar).width(64).height(64).url()} alt={author.authorName} class="size-16 rounded-full object-cover" />
        {/if}
        <div>
          <p class="font-semibold text-foreground">{author.authorName}</p>
          <p class="text-sm text-muted-foreground">{author.authorBio}</p>
        </div>
      </div>
    {/if}

    {#if post.relatedPosts?.length}
      <section class="mt-16">
        <h2 class="mb-6 font-serif text-2xl italic text-foreground">Continuez la lecture</h2>
        <div class="grid gap-6 sm:grid-cols-2">
          {#each post.relatedPosts as related}
            <a href="/blog/{related.slug.current}" class="group overflow-hidden rounded-lg border border-border">
              {#if related.mainImage}
                <img src={urlFor(related.mainImage).width(400).height(250).url()} alt={related.title} class="h-40 w-full object-cover" />
              {/if}
              <div class="flex flex-col gap-2 p-4">
                <h3 class="font-serif text-lg italic text-foreground group-hover:text-primary">{related.title}</h3>
                {#if related.excerpt}
                  <p class="line-clamp-2 text-sm text-muted-foreground">{related.excerpt}</p>
                {/if}
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/if}
  </article>
{/if}
