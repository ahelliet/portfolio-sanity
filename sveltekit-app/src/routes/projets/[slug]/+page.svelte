<script lang="ts">
  import {useQuery} from '@sanity/sveltekit'
  import {PortableText} from '@portabletext/svelte'
  import {urlFor} from '$lib/sanity/image'
  import {portableTextComponents} from '$lib/components/portable-text'
  import {page} from '$app/state'
  import type {PageProps} from './$types'

  const {data}: PageProps = $props()
  const query = $derived(useQuery(data))
  const project = $derived($query.data)

  const siteTitle = $derived(data.layout?.title ?? '')
  const seo = $derived(project?.seo)
  const pageTitle = $derived(seo?.title ? `${seo.title} | ${siteTitle}` : `${project?.title ?? ''} | ${siteTitle}`)
  const description = $derived(seo?.description || project?.description || '')
  const ogImage = $derived(project?.seoImageUrl || data.layout?.ogImageUrl || '')
  const coverUrl = $derived(project?.mainImage ? urlFor(project.mainImage).width(1280).height(560).url() : '')
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

{#if project}
  <article class="pt-24 pb-16">
    <!-- Header -->
    <header class="flex flex-col gap-5 px-20">
      <nav class="flex items-center gap-1.5 text-sm text-muted-foreground">
        <a href="/projets" class="hover:text-foreground">Projets</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </nav>
      <h1 class="font-serif text-5xl italic text-foreground">{project.title}</h1>
      {#if project.tags?.length}
        <div class="flex flex-wrap gap-2">
          {#each project.tags as tag}
            <span class="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">{tag}</span>
          {/each}
        </div>
      {/if}
      {#if project.description}
        <p class="text-[15px] leading-[1.7] text-muted-foreground">{project.description}</p>
      {/if}
    </header>

    <!-- Main Screenshot -->
    {#if project.mainImage}
      <div class="mt-10 px-20">
        <img src={urlFor(project.mainImage).width(1280).height(560).url()} alt={project.title} class="w-full rounded-lg object-cover" fetchpriority="high" loading="eager" />
      </div>
    {/if}

    <!-- Challenge -->
    {#if project.challengeBody}
      <section class="mt-16 bg-accent py-16">
        <div class="px-20">
          <span class="text-xs font-semibold uppercase tracking-[3px] text-primary">Le défi</span>
          {#if project.challengeTitle}
            <h2 class="mt-3 font-serif text-3xl italic text-foreground">{project.challengeTitle}</h2>
          {/if}
          <div class="mt-6">
            <PortableText components={portableTextComponents} value={project.challengeBody} />
          </div>
        </div>
      </section>
    {/if}

    <!-- Solution -->
    {#if project.solutionBody}
      <section class="py-16">
        <div class="px-20">
          <span class="text-xs font-semibold uppercase tracking-[3px] text-primary">La solution</span>
          {#if project.solutionTitle}
            <h2 class="mt-3 font-serif text-3xl italic text-foreground">{project.solutionTitle}</h2>
          {/if}
          <div class="mt-6">
            <PortableText components={portableTextComponents} value={project.solutionBody} />
          </div>
        </div>
      </section>
    {/if}

    <!-- Results -->
    {#if project.metrics?.length}
      <section class="bg-accent py-16">
        <div class="px-20">
          <span class="text-xs font-semibold uppercase tracking-[3px] text-primary">Les résultats</span>
          {#if project.resultsTitle}
            <h2 class="mt-3 font-serif text-3xl italic text-foreground">{project.resultsTitle}</h2>
          {/if}
          <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {#each project.metrics as metric}
              <div class="rounded-lg border border-border bg-background p-6">
                <p class="font-serif text-3xl italic text-primary">{metric.value}</p>
                <p class="mt-1 text-sm font-semibold text-foreground">{metric.label}</p>
                {#if metric.description}
                  <p class="mt-2 text-sm text-muted-foreground">{metric.description}</p>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </section>
    {/if}

    <!-- Stack -->
    {#if project.stack?.length}
      <section class="py-16">
        <div class="px-20">
          <span class="text-xs font-semibold uppercase tracking-[3px] text-primary">Stack technique</span>
          <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {#each project.stack as item}
              <div class="flex items-center gap-3 rounded-md border border-border bg-accent px-5 py-4">
                {#if item.icon}
                  <img src={urlFor(item.icon).width(40).height(40).url()} alt={item.name} class="size-10 object-contain" />
                {/if}
                <span class="text-sm text-foreground">{item.name}</span>
              </div>
            {/each}
          </div>
        </div>
      </section>
    {/if}
  </article>
{/if}
