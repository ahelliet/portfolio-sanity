<script lang="ts">
	import { urlFor } from "$lib/sanity/image";
	import type { SectionTestimonials } from "$lib/sanity/queries";
	import SectionHeader from "./SectionHeader.svelte";

	interface Props {
		section: SectionTestimonials;
	}

	let { section }: Props = $props();

	const bgClass = $derived(section.alternateBackground ? "bg-accent" : "");

	function getInitials(name: string): string {
		const parts = name.trim().split(/\s+/);
		const first = parts[0]?.[0] ?? "";
		const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
		return (first + last).toUpperCase();
	}
</script>

<section class="px-20 py-24 {bgClass}">
	<div class="flex flex-col gap-16">
		<SectionHeader number={section.sectionNumber} label={section.sectionLabel} />

		{#if section.title}
			<h2 class="font-serif text-[40px] italic">{section.title}</h2>
		{/if}

		{#if section.items?.length}
			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				{#each section.items as t (t.name)}
					<div class="flex flex-col justify-between gap-6 rounded-lg border border-border bg-accent p-8">
						<p class="text-[15px] leading-[1.7] text-foreground">"{t.content}"</p>
						<div class="flex items-center gap-3">
							{#if t.avatar}
								<img
									src={urlFor(t.avatar).width(40).height(40).url()}
									alt={t.name}
									class="h-10 w-10 rounded-full object-cover"
								/>
							{:else}
								<div
									class="flex h-10 w-10 items-center justify-center rounded-full bg-primary"
								>
									<span class="text-sm font-semibold text-primary-foreground"
										>{getInitials(t.name)}</span
									>
								</div>
							{/if}
							<div>
								<p class="text-sm font-semibold text-foreground">{t.name}</p>
								{#if t.role}
									<p class="text-[13px] text-muted-foreground">{t.role}</p>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
