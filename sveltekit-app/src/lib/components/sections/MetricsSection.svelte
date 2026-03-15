<script lang="ts">
	import type { SectionMetrics } from "$lib/sanity/queries";
	import SectionHeader from "./SectionHeader.svelte";

	interface Props {
		section: SectionMetrics;
	}

	let { section }: Props = $props();

	const bgClass = $derived(section.alternateBackground ? "bg-accent" : "");
</script>

<section class="px-20 py-20 {bgClass}">
	<div class="flex flex-col gap-12">
		<SectionHeader number={section.sectionNumber} label={section.sectionLabel} />

		{#if section.title}
			<h2 class="font-serif text-3xl italic">{section.title}</h2>
		{/if}

		{#if section.items?.length}
			<div class="grid grid-cols-1 gap-12 md:grid-cols-3">
				{#each section.items as metric}
					<div class="flex flex-col gap-2 border-t border-border pt-8">
						<span class="text-4xl font-bold text-primary">{metric.value}</span>
						<span class="font-medium">{metric.label}</span>
						{#if metric.description}
							<span class="text-sm text-muted-foreground">{metric.description}</span>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
