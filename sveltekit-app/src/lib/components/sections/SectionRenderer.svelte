<script lang="ts">
	import type { Section, Post, Project } from "$lib/sanity/queries";
	import HeroSection from "./HeroSection.svelte";
	import PageHeaderSection from "./PageHeaderSection.svelte";
	import RichTextSection from "./RichTextSection.svelte";
	import GridSection from "./GridSection.svelte";
	import CtaSection from "./CtaSection.svelte";
	import MetricsSection from "./MetricsSection.svelte";
	import ImageSection from "./ImageSection.svelte";
	import ContactSection from "./ContactSection.svelte";
	import TestimonialsSection from "./TestimonialsSection.svelte";
	import ToolsSection from "./ToolsSection.svelte";
	import AboutSection from "./AboutSection.svelte";

	interface Props {
		sections: Section[];
		posts?: Post[];
		projects?: Project[];
	}

	let { sections, posts = [], projects = [] }: Props = $props();
</script>

{#each sections as section (section._key)}
	{#if section._type === "section.hero"}
		<HeroSection {section} />
	{:else if section._type === "section.pageHeader"}
		<PageHeaderSection {section} />
	{:else if section._type === "section.richText"}
		<RichTextSection {section} />
	{:else if section._type === "section.grid"}
		<GridSection {section} {posts} {projects} />
	{:else if section._type === "section.cta"}
		<CtaSection {section} />
	{:else if section._type === "section.metrics"}
		<MetricsSection {section} />
	{:else if section._type === "section.image"}
		<ImageSection {section} />
	{:else if section._type === "section.contact"}
		<ContactSection {section} />
	{:else if section._type === "section.testimonials"}
		<TestimonialsSection {section} />
	{:else if section._type === "section.tools"}
		<ToolsSection {section} />
	{:else if section._type === "section.about"}
		<AboutSection {section} />
	{/if}
{/each}
