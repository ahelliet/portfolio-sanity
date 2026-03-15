<script lang="ts">
	import { urlFor } from "$lib/sanity/image";
	import type { SectionAbout } from "$lib/sanity/queries";
	import SectionHeader from "./SectionHeader.svelte";

	interface Props {
		section: SectionAbout;
	}

	let { section }: Props = $props();

	const bgClass = $derived(section.alternateBackground ? "bg-accent" : "");
</script>

<section id={section.anchor ?? undefined} class="px-20 py-24 {bgClass}">
	<div class="flex flex-col gap-16">
		<SectionHeader number={section.sectionNumber} label={section.sectionLabel} />

		<div class="flex gap-20">
			{#if section.image}
				<div class="w-95 shrink-0 overflow-hidden rounded-lg">
					<img
						src={urlFor(section.image).width(760).height(960).url()}
						alt={section.title ?? ""}
						class="h-[480px] w-full object-cover"
					/>
				</div>
			{/if}

			<div class="flex flex-1 flex-col gap-8">
				{#if section.title}
					<h2 class="whitespace-pre-line font-serif text-[40px] italic leading-[1.2] text-foreground">
						{section.title}
					</h2>
				{/if}

				{#if section.description}
					<p class="whitespace-pre-line text-base leading-[1.7] text-muted-foreground">
						{section.description}
					</p>
				{/if}

				{#if section.stats?.length}
					<div class="flex gap-12">
						{#each section.stats as stat (stat.label)}
							<div class="flex flex-col gap-1">
								<span class="font-serif text-4xl italic text-primary">{stat.value}</span>
								<span class="text-[13px] text-muted-foreground">{stat.label}</span>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
