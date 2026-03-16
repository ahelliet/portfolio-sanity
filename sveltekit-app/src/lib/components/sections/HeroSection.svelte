<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import DynamicIcon from "$lib/components/DynamicIcon.svelte";
	import type { SectionHero } from "$lib/sanity/queries";
	import { resolveLink } from "$lib/utils/index.js";

	interface Props {
		section: SectionHero;
	}

	let { section }: Props = $props();
</script>

<section class="relative h-[700px] overflow-hidden bg-background">
	<!-- Radial glow effect -->
	<div
		class="pointer-events-none absolute left-1/2 top-[-50px] -translate-x-1/3 h-[500px] w-[500px] rounded-full"
		style="background: radial-gradient(circle, color-mix(in srgb, var(--primary) 10%, transparent) 0%, transparent 70%)"
	></div>

	<div class="flex h-full items-center gap-[60px] px-20 pt-[100px] pb-0">
		<!-- Left column -->
		<div class="flex flex-1 flex-col gap-8">
			{#if section.badge}
				<!-- Status badge -->
				<div class="flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 w-fit">
					<div class="size-2 rounded-full bg-primary"></div>
					<span class="text-xs font-medium text-muted-foreground">{section.badge}</span>
				</div>
			{/if}

			{#if section.title}
				<div class="flex flex-col gap-5">
					<h1 class="font-serif text-[64px] italic leading-none text-foreground">
						{section.title}
					</h1>
					{#if section.tagline}
						<p class="whitespace-pre-line text-lg font-light tracking-wide leading-relaxed text-primary">{section.tagline}</p>
					{/if}
				</div>
			{/if}
			{#if section.subtitle}
				<p class="max-w-125 text-base leading-[1.7] text-muted-foreground">
					{section.subtitle}
				</p>
			{/if}
			{#if section.ctas?.length}
				<div class="flex items-center gap-4">
					{#each section.ctas as cta}
						{@const resolved = resolveLink(cta.link)}
						<Button
							variant={cta.variant ?? "default"}
							size="lg"
							href={resolved.href}
							target={resolved.external ? "_blank" : undefined}
							rel={resolved.external ? "noopener noreferrer" : undefined}
						>
							{#if cta.icon}
								<DynamicIcon name={cta.icon} size={20} />
							{/if}
							{cta.label}
						</Button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Right column: Terminal -->
		<div class="w-[520px] shrink-0 overflow-hidden rounded-xl bg-[#111118] shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
			<!-- Terminal header -->
			<div class="flex items-center justify-between bg-[#0c0c12] px-4 py-3">
				<div class="flex gap-2">
					<div class="size-3 rounded-full bg-[#ff5f57]"></div>
					<div class="size-3 rounded-full bg-[#febc2e]"></div>
					<div class="size-3 rounded-full bg-[#28c840]"></div>
				</div>
				<span class="font-mono text-xs text-[#6c7086]">+page.svelte</span>
			</div>

			<!-- Tabs bar -->
			<div class="flex bg-[#0e0e15]">
				<div class="border-b-2 border-primary bg-[#111118] px-4 py-2.5 font-mono text-[11px] text-[#cdd6f4]">
					+page.svelte
				</div>
				<div class="px-4 py-2.5 font-mono text-[11px] text-[#6c7086]">
					+layout.svelte
				</div>
				<div class="px-4 py-2.5 font-mono text-[11px] text-[#6c7086]">
					schema.ts
				</div>
			</div>

			<!-- Code body -->
			<div class="p-5 font-mono text-xs leading-[2]">
				<div>
					<span class="text-[#89b4fa]">&lt;script</span>
					<span class="text-[#a6e3a1]"> lang="ts"</span><span class="text-[#89b4fa]">&gt;</span>
				</div>
				<div class="text-[#6c7086]">
					&nbsp;&nbsp;import &#123; fly &#125; from 'svelte/transition';
				</div>
				<div class="text-[#6c7086]">
					&nbsp;&nbsp;import type &#123; Developer &#125; from '$lib';
				</div>
				<div>&nbsp;</div>
				<div>
					<span class="text-[#cdd6f4]">&nbsp;&nbsp;const me</span><span class="text-[#89b4fa]">: Developer</span>
					<span class="text-[#cdd6f4]"> = &#123;</span>
				</div>
				<div>
					<span class="text-[#cdd6f4]">&nbsp;&nbsp;&nbsp;&nbsp;name: </span><span class="text-[#a6e3a1]">'Anthony Helliet'</span><span class="text-[#cdd6f4]">,</span>
				</div>
				<div>
					<span class="text-[#cdd6f4]">&nbsp;&nbsp;&nbsp;&nbsp;passion: </span><span class="text-[#a6e3a1]">'building things'</span><span class="text-[#cdd6f4]">,</span>
				</div>
				<div>
					<span class="text-[#cdd6f4]">&nbsp;&nbsp;&nbsp;&nbsp;stack: </span><span class="text-[#f9e2af]">['Svelte', 'Python', 'Typescript']</span><span class="text-[#cdd6f4]">,</span>
				</div>
				<div>
					<span class="text-[#cdd6f4]">&nbsp;&nbsp;&nbsp;&nbsp;available: </span><span class="text-[#89b4fa]">true</span><span class="text-[#cdd6f4]">,</span>
				</div>
				<div>
					<span class="text-[#cdd6f4]">&nbsp;&nbsp;&#125;;</span>
				</div>
				<div>
					<span class="text-[#89b4fa]">&lt;/script&gt;</span>
				</div>
				<div>&nbsp;</div>
				<div>
					<span class="text-[#cba6f7]">&#123;#if me.available&#125;</span>
				</div>
				<div>
					<span class="text-primary">&nbsp;&nbsp;&lt;HireMe developer=&#123;me&#125; /&gt;</span>
				</div>
				<div>
					<span class="text-[#cba6f7]">&#123;/if&#125;</span>
				</div>
			</div>
		</div>
	</div>
</section>
