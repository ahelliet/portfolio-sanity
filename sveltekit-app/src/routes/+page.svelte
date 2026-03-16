<script lang="ts">
	import SectionRenderer from "$lib/components/sections/SectionRenderer.svelte";
	import { page } from "$app/state";
	import type { PageProps } from "./$types";

	const { data }: PageProps = $props();

	const siteTitle = $derived(data.layout?.title ?? '');
	const seo = $derived(data.page?.seo);
	const pageTitle = $derived(seo?.title ? `${seo.title} | ${siteTitle}` : siteTitle);
	const description = $derived(seo?.description || data.layout?.description || '');
	const ogImage = $derived(seo?.ogImageUrl || data.layout?.ogImageUrl || '');
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={page.url.href} />
	<meta property="og:type" content="website" />
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

{#if data.page?.sections}
	<SectionRenderer
		sections={data.page.sections}
		posts={data.posts}
		projects={data.projects}
	/>
{:else}
	<div class="flex min-h-[50vh] items-center justify-center">
		<p class="text-muted-foreground">Aucune page d'accueil configurée.</p>
	</div>
{/if}
