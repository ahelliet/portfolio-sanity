<script lang="ts">
  import {useQuery} from '@sanity/sveltekit'
  import {PortableText} from '@portabletext/svelte'
  import {urlFor} from '$lib/sanity/image'
  import Code from '../../../components/Code.svelte'
  import Mermaid from '../../../components/Mermaid.svelte'
  import type {PageProps} from './$types'

  const {data}: PageProps = $props()
  const query = $derived(useQuery(data))
  const project = $derived($query.data)

  const components = {
    types: {
      code: Code,
      mermaid: Mermaid,
    },
  }
</script>

{#if project}
  <article class="project-detail">
    <!-- Header -->
    <header class="project-detail__header">
      <h1 class="project-detail__title">{project.title}</h1>
      {#if project.tags?.length}
        <div class="tags">
          {#each project.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      {/if}
      {#if project.description}
        <p class="project-detail__desc">{project.description}</p>
      {/if}
    </header>

    <!-- Main Screenshot -->
    {#if project.mainImage}
      <div class="project-detail__screenshot">
        <img src={urlFor(project.mainImage).width(1280).height(560).url()} alt={project.title} />
      </div>
    {/if}

    <!-- Challenge -->
    {#if project.challengeBody}
      <section class="project-section project-section--accent">
        <span class="project-section__label">Le défi</span>
        {#if project.challengeTitle}
          <h2 class="project-section__title">{project.challengeTitle}</h2>
        {/if}
        <div class="project-section__body">
          <PortableText {components} value={project.challengeBody} />
        </div>
      </section>
    {/if}

    <!-- Solution -->
    {#if project.solutionBody}
      <section class="project-section">
        <span class="project-section__label">La solution</span>
        {#if project.solutionTitle}
          <h2 class="project-section__title">{project.solutionTitle}</h2>
        {/if}
        <div class="project-section__body">
          <PortableText {components} value={project.solutionBody} />
        </div>
      </section>
    {/if}

    <!-- Results -->
    {#if project.metrics?.length}
      <section class="project-section project-section--accent">
        <span class="project-section__label">Les résultats</span>
        {#if project.resultsTitle}
          <h2 class="project-section__title">{project.resultsTitle}</h2>
        {/if}
        <div class="metrics-grid">
          {#each project.metrics as metric}
            <div class="metric-card">
              <p class="metric-card__value">{metric.value}</p>
              <p class="metric-card__label">{metric.label}</p>
              {#if metric.description}
                <p class="metric-card__desc">{metric.description}</p>
              {/if}
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Stack -->
    {#if project.stack?.length}
      <section class="project-section">
        <span class="project-section__label">Stack technique</span>
        <div class="stack-grid">
          {#each project.stack as item}
            <div class="stack-item">
              {#if item.icon}
                <img src={urlFor(item.icon).width(40).height(40).url()} alt={item.name} class="stack-item__icon" />
              {/if}
              <span class="stack-item__name">{item.name}</span>
            </div>
          {/each}
        </div>
      </section>
    {/if}
  </article>
{/if}
