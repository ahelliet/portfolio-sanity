<script lang="ts">
	import { urlFor } from "$lib/sanity/image";
	import type { SectionGrid, Post, Project } from "$lib/sanity/queries";
	import { formatDate, resolveLink } from "$lib/utils/index.js";
	import SectionHeader from "./SectionHeader.svelte";
	import * as Pagination from "$lib/components/ui/pagination/index.js";

	interface Props {
		section: SectionGrid;
		posts?: Post[];
		projects?: Project[];
	}

	let { section, posts = [], projects = [] }: Props = $props();

	const allTags = $derived.by(() => {
		const data = section.source === "posts" ? posts : section.source === "projects" ? projects : [];
		const tags = new Set<string>();
		for (const item of data) {
			for (const tag of item.tags ?? []) tags.add(tag);
		}
		return [...tags];
	});

	let activeTag = $state<string | null>(null);
	let currentPage = $state(1);
	const perPage = 6;

	const items = $derived.by(() => {
		const data = section.source === "posts" ? posts : section.source === "projects" ? projects : [];
		const filtered = activeTag ? data.filter((item) => item.tags?.includes(activeTag!)) : data;
		if (section.limit && section.limit > 0) return filtered.slice(0, section.limit);
		return filtered;
	});

	const paginatedItems = $derived.by(() => {
		if (!isGrid) return items;
		const start = (currentPage - 1) * perPage;
		return items.slice(start, start + perPage);
	});

	function setTag(tag: string | null) {
		activeTag = tag;
		currentPage = 1;
	}

	const isGrid = $derived(section.layout === "grid");
	const bgClass = $derived(section.alternateBackground ? "bg-accent" : "");
</script>

<section class="px-20 py-24 {bgClass}">
	<div class="flex flex-col gap-16">
		{#if isGrid}
			<!-- Grid layout: page header style title -->
			<div class="flex flex-col gap-6">
				{#if section.title}
					<h1 class="font-serif text-5xl italic text-foreground">{section.title}</h1>
				{/if}
				{#if section.description}
					<p class="text-base leading-[1.6] text-muted-foreground">{section.description}</p>
				{/if}
				{#if section.showTagFilter && allTags.length}
					<div class="flex flex-wrap items-center gap-2">
						<button
							class="rounded-md px-4 py-2 text-sm font-medium transition-colors {activeTag === null ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground hover:bg-accent'}"
							onclick={() => setTag(null)}
						>
							Tous
						</button>
						{#each allTags as tag (tag)}
							<button
								class="rounded-md px-4 py-2 text-sm font-medium transition-colors {activeTag === tag ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground hover:bg-accent'}"
								onclick={() => setTag(activeTag === tag ? null : tag)}
							>
								{tag}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		{:else}
			<!-- Featured layout: section header with optional "view all" link -->
			<div class="flex items-center justify-between">
				<div class="flex flex-col gap-4">
					<SectionHeader number={section.sectionNumber} label={section.sectionLabel} />
					{#if section.title}
						<h2 class="font-serif text-[40px] italic">{section.title}</h2>
					{/if}
				</div>
				{#if section.viewAllLabel}
					{@const resolved = resolveLink(section.viewAllLink)}
					<a
						href={resolved.href}
						target={resolved.external ? "_blank" : undefined}
						rel={resolved.external ? "noopener noreferrer" : undefined}
						class="text-sm text-primary"
					>
						{section.viewAllLabel}
					</a>
				{/if}
			</div>
		{/if}

		{#if section.source === "posts"}
			{#if isGrid}
				<!-- Blog grid: 2-column cards with images -->
				<div class="grid grid-cols-2 gap-8">
					{#each paginatedItems as post (post.slug?.current)}
						{@const p = post as Post}
						<a href="/blog/{p.slug.current}" class="group overflow-hidden rounded-lg border border-border bg-background">
							{#if p.mainImage}
								<img
									src={urlFor(p.mainImage).width(640).height(400).url()}
									alt={p.title}
									class="h-50 w-full object-cover"
								/>
							{/if}
							<div class="flex flex-col gap-5 p-6">
								{#if p._createdAt}
									<span class="text-[13px] text-muted-foreground">{formatDate(p._createdAt)}</span>
								{/if}
								{#if p.title}
									<h3 class="font-serif text-[22px] italic leading-[1.3] text-foreground">{p.title}</h3>
								{/if}
								{#if p.excerpt}
									<p class="text-sm leading-[1.6] text-muted-foreground">{p.excerpt}</p>
								{/if}
								{#if p.tags?.length}
									<div class="flex flex-wrap gap-1.5">
										{#each p.tags as tag (tag)}
											<span class="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">{tag}</span>
										{/each}
									</div>
								{/if}
								<span class="text-sm font-medium text-primary">Lire →</span>
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<!-- Blog featured: simple list -->
				<div class="flex flex-col gap-4">
					{#each items as post (post.slug?.current)}
						{@const p = post as Post}
						<a
							href="/blog/{p.slug.current}"
							class="group flex flex-col gap-4 rounded-lg border border-border bg-background p-6"
						>
							{#if p._createdAt}
								<span class="text-xs text-muted-foreground">{formatDate(p._createdAt)}</span>
							{/if}
							{#if p.title}
								<h3 class="font-serif text-[22px] italic text-foreground">{p.title}</h3>
							{/if}
							{#if p.excerpt}
								<p class="text-sm leading-[1.6] text-muted-foreground">{p.excerpt}</p>
							{/if}
							{#if p.tags?.length}
								<div class="flex flex-wrap gap-2">
									{#each p.tags as tag (tag)}
										<span class="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">{tag}</span>
									{/each}
								</div>
							{/if}
							<span class="text-[13px] font-medium text-primary">Lire l'article →</span>
						</a>
					{/each}
				</div>
			{/if}
		{:else if section.source === "projects"}
			{#if isGrid}
				<!-- Projects grid: 2-column cards with screenshots -->
				<div class="grid grid-cols-2 gap-8">
					{#each paginatedItems as project (project.slug?.current)}
						{@const p = project as Project}
						<a href="/projets/{p.slug.current}" class="group overflow-hidden rounded-lg border border-border bg-background">
							{#if p.mainImage}
								<img
									src={urlFor(p.mainImage).width(640).height(520).url()}
									alt={p.title}
									class="h-65 w-full object-cover"
								/>
							{/if}
							<div class="flex flex-col gap-5 p-6">
								{#if p.title}
									<h3 class="font-serif text-2xl italic leading-[1.3] text-foreground">{p.title}</h3>
								{/if}
								{#if p.description}
									<p class="text-sm leading-[1.6] text-muted-foreground">{p.description}</p>
								{/if}
								{#if p.tags?.length}
									<div class="flex flex-wrap gap-1.5">
										{#each p.tags as tag (tag)}
											<span class="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">{tag}</span>
										{/each}
									</div>
								{/if}
								{#if p.metrics?.length}
									<div class="flex gap-6">
										{#each p.metrics as metric (metric.label)}
											<span class="text-[13px] font-semibold text-primary">{metric.value} {metric.label}</span>
										{/each}
									</div>
								{/if}
							</div>
						</a>
					{/each}
				</div>
			{:else}
				<!-- Projects featured: alternating left/right -->
				<div class="flex flex-col gap-12">
					{#each items as project, index (project.slug?.current)}
						{@const p = project as Project}
						<a
							href="/projets/{p.slug.current}"
							class="group flex gap-12"
							style:flex-direction={index % 2 === 1 ? 'row-reverse' : 'row'}
						>
							{#if p.mainImage}
								<img
									src={urlFor(p.mainImage).width(600).height(400).url()}
									alt={p.title}
									class="h-100 flex-1 rounded-lg object-cover"
								/>
							{/if}
							<div class="flex w-120 shrink-0 flex-col gap-5">
								{#if p.badge}
									<span class="self-start rounded-full border border-border px-3 py-0.5 text-xs text-foreground">
										{p.badge}
									</span>
								{/if}
								{#if p.title}
									<h3 class="font-serif text-[32px] italic text-foreground">{p.title}</h3>
								{/if}
								{#if p.description}
									<p class="text-[15px] leading-[1.7] text-muted-foreground">{p.description}</p>
								{/if}
								{#if p.tags?.length}
									<div class="flex flex-wrap gap-2">
										{#each p.tags as tag (tag)}
											<span class="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">{tag}</span>
										{/each}
									</div>
								{/if}
								{#if p.metrics?.length}
									<div class="flex gap-6">
										{#each p.metrics as metric (metric.label)}
											<div class="flex flex-col gap-0.5">
												<span class="font-serif text-[28px] italic text-primary">{metric.value}</span>
												<span class="text-xs text-muted-foreground">{metric.label}</span>
											</div>
										{/each}
									</div>
								{/if}
								<div class="flex items-center gap-4">
									<span class="text-sm font-medium text-primary">Démo live &rarr;</span>
									<span class="text-sm text-muted-foreground">Code source</span>
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		{/if}

		{#if isGrid && items.length > perPage}
			<Pagination.Root count={items.length} {perPage} bind:page={currentPage} siblingCount={1}>
				{#snippet children({ pages })}
					<Pagination.Content>
						<Pagination.Item>
							<Pagination.Previous />
						</Pagination.Item>
						{#each pages as page (page.key)}
							{#if page.type === "ellipsis"}
								<Pagination.Item>
									<Pagination.Ellipsis />
								</Pagination.Item>
							{:else}
								<Pagination.Item>
									<Pagination.Link {page} isActive={currentPage === page.value} />
								</Pagination.Item>
							{/if}
						{/each}
						<Pagination.Item>
							<Pagination.Next />
						</Pagination.Item>
					</Pagination.Content>
				{/snippet}
			</Pagination.Root>
		{/if}
	</div>
</section>
