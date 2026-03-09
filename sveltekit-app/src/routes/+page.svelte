<script lang="ts">
  import {useQuery} from '@sanity/sveltekit'
  import {urlFor} from '$lib/sanity/image'
  import type {PageProps} from './$types'

  const {data}: PageProps = $props()
  const query = $derived(useQuery(data))
  const page = $derived($query.data)
</script>

{#if page}
  {@const {settings, posts, projects, testimonials, tools} = page}

  <!-- Hero -->
  <section class="hero">
    <h1 class="hero__title">{settings?.heroTitle ?? 'Portfolio'}</h1>
    {#if settings?.heroSubtitle}
      <p class="hero__subtitle">{settings.heroSubtitle}</p>
    {/if}
  </section>

  <!-- About -->
  {#if settings?.aboutTitle}
    <section class="section">
      <h2 class="section__title">{settings.aboutTitle}</h2>
    </section>
  {/if}

  <!-- Tools -->
  {#if tools?.length}
    <section class="section section--accent">
      <h2 class="section__title">{settings?.toolsTitle ?? 'Outils'}</h2>
      <div class="grid grid--tools">
        {#each tools as tool}
          <div class="tool-card">
            {#if tool.icon}
              <img src={urlFor(tool.icon).width(48).height(48).url()} alt={tool.name} class="tool-card__icon" />
            {/if}
            <h3 class="tool-card__name">{tool.name}</h3>
            {#if tool.description}
              <p class="tool-card__desc">{tool.description}</p>
            {/if}
          </div>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Projects -->
  {#if projects?.length}
    <section class="section">
      <div class="section__header">
        <h2 class="section__title">{settings?.projectsTitle ?? 'Projets'}</h2>
        <a href="/projects" class="section__link">Voir tous les projets →</a>
      </div>
      <div class="grid grid--projects">
        {#each projects as project}
          <a href="/projects/{project.slug.current}" class="project-card">
            {#if project.mainImage}
              <img src={urlFor(project.mainImage).width(600).height(400).url()} alt={project.title} class="project-card__image" />
            {/if}
            <div class="project-card__content">
              <h3 class="project-card__title">{project.title}</h3>
              {#if project.description}
                <p class="project-card__desc">{project.description}</p>
              {/if}
              {#if project.tags?.length}
                <div class="tags">
                  {#each project.tags as tag}
                    <span class="tag">{tag}</span>
                  {/each}
                </div>
              {/if}
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Blog -->
  {#if posts?.length}
    <section class="section section--accent">
      <div class="section__header">
        <h2 class="section__title">{settings?.blogTitle ?? 'Blog'}</h2>
        <a href="/blog" class="section__link">Voir tous les articles →</a>
      </div>
      <div class="grid grid--blog">
        {#each posts as post}
          <a href="/blog/{post.slug.current}" class="post-card">
            {#if post.mainImage}
              <img src={urlFor(post.mainImage).width(400).height(250).url()} alt={post.title} class="post-card__image" />
            {/if}
            <div class="post-card__content">
              <h3 class="post-card__title">{post.title}</h3>
              {#if post.excerpt}
                <p class="post-card__excerpt">{post.excerpt}</p>
              {/if}
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
      </div>
    </section>
  {/if}

  <!-- Testimonials -->
  {#if testimonials?.length}
    <section class="section">
      <h2 class="section__title">{settings?.testimonialsTitle ?? 'Témoignages'}</h2>
      <div class="grid grid--testimonials">
        {#each testimonials as testimonial}
          <div class="testimonial-card">
            <p class="testimonial-card__content">"{testimonial.content}"</p>
            <div class="testimonial-card__author">
              {#if testimonial.avatar}
                <img src={urlFor(testimonial.avatar).width(40).height(40).url()} alt={testimonial.name} class="testimonial-card__avatar" />
              {/if}
              <div>
                <p class="testimonial-card__name">{testimonial.name}</p>
                {#if testimonial.role}
                  <p class="testimonial-card__role">{testimonial.role}</p>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </section>
  {/if}

  <!-- CTA -->
  {#if settings?.ctaTitle}
    <section class="section section--cta">
      <h2 class="section__title">{settings.ctaTitle}</h2>
      {#if settings.ctaDescription}
        <p class="section__desc">{settings.ctaDescription}</p>
      {/if}
      {#if settings.contactEmail}
        <a href="mailto:{settings.contactEmail}" class="btn btn--primary">Me contacter →</a>
      {/if}
    </section>
  {/if}
{/if}
