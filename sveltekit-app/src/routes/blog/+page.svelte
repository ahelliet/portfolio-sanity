<script lang="ts">
  import {useQuery} from '@sanity/sveltekit'
  import {urlFor} from '$lib/sanity/image'
  import {formatDate} from '$lib/utils'
  import type {PageProps} from './$types'

  const {data}: PageProps = $props()
  const query = $derived(useQuery(data))
  const posts = $derived($query.data)
</script>

<section class="blog-hero">
  <h1 class="blog-hero__title">Blog & Snippets</h1>
  <p class="blog-hero__desc">Réflexions sur le développement web, snippets de code et retours d'expérience sur les technologies modernes.</p>
</section>

<section class="articles-grid">
  {#if posts?.length}
    {#each posts as post}
      <a href="/blog/{post.slug.current}" class="post-card">
        {#if post.mainImage}
          <img src={urlFor(post.mainImage).width(400).height(250).url()} alt={post.title} class="post-card__image" />
        {/if}
        <div class="post-card__content">
          <h2 class="post-card__title">{post.title}</h2>
          {#if post.excerpt}
            <p class="post-card__excerpt">{post.excerpt}</p>
          {/if}
          <div class="post-card__meta">
            <span>{formatDate(post._createdAt)}</span>
            {#if post.readingTime}
              <span>{post.readingTime} min de lecture</span>
            {/if}
          </div>
          {#if post.tags?.length}
            <div class="tags">
              {#each post.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          {/if}
        </div>
      </a>
    {/each}
  {:else}
    <p>Aucun article pour le moment.</p>
  {/if}
</section>
