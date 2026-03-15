<script lang="ts">
	import type { SectionTools } from "$lib/sanity/queries";
	import DynamicIcon from "$lib/components/DynamicIcon.svelte";
	import SectionHeader from "./SectionHeader.svelte";

	interface Props {
		section: SectionTools;
	}

	let { section }: Props = $props();

	const bgClass = $derived(section.alternateBackground ? "bg-accent" : "");
	const itemBgClass = $derived(section.alternateBackground ? "bg-background" : "bg-accent");
</script>

<section id={section.anchor ?? undefined} class="px-20 py-24 {bgClass}">
	<div class="flex flex-col gap-16">
		<SectionHeader number={section.sectionNumber} label={section.sectionLabel} />

		{#if section.title}
			<h2 class="font-serif text-[40px] italic">{section.title}</h2>
		{/if}

		{#if section.categories?.length}
			<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
				{#each section.categories as category (category.name)}
					<div class="flex flex-col gap-4">
						{#if category.name}
							<h3 class="text-xs font-semibold uppercase tracking-[3px] text-muted-foreground">
								{category.name}
							</h3>
						{/if}
						{#if category.description}
							<p class="text-[13px] leading-[1.6] text-muted-foreground">
								{category.description}
							</p>
						{/if}
						{#if category.items?.length}
							<div class="flex flex-col gap-3">
								{#each category.items as tool (tool.name)}
									<div class="flex items-center gap-3 rounded-md border border-border {itemBgClass} px-5 py-4">
										{#if tool.icon}
											<DynamicIcon name={tool.icon} size={20} class="text-foreground" />
										{/if}
										<span class="text-sm text-foreground">{tool.name}</span>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
