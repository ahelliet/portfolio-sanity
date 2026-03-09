<script lang="ts">
  import {useQuery} from '@sanity/sveltekit'
  import {urlFor} from '$lib/sanity/image'
  import type {PageProps} from './$types'

  const {data}: PageProps = $props()
  const query = $derived(useQuery(data))
  const projects = $derived($query.data)
</script>

<section class="projects-hero">
  <h1 class="projects-hero__title">Tous les projets</h1>
  <p class="projects-hero__desc">Une sélection de projets où design, performance et code propre se rencontrent.</p>
</section>

<section class="projects-grid">
  {#if projects?.length}
    {#each projects as project}
      <a href="/projects/{project.slug.current}" class="project-card">
        {#if project.mainImage}
          <img src={urlFor(project.mainImage).width(600).height(400).url()} alt={project.title} class="project-card__image" />
        {/if}
        <div class="project-card__content">
          <div class="project-card__meta">
            {#if project.year}
              <span class="project-card__year">{project.year}</span>
            {/if}
            {#if project.tags?.length}
              <div class="tags">
                {#each project.tags as tag}
                  <span class="tag">{tag}</span>
                {/each}
              </div>
            {/if}
          </div>
          <h2 class="project-card__title">{project.title}</h2>
          {#if project.description}
            <p class="project-card__desc">{project.description}</p>
          {/if}
        </div>
      </a>
    {/each}
  {:else}
    <p>Aucun projet pour le moment.</p>
  {/if}
</section>
