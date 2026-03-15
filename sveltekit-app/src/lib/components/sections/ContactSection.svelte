<script lang="ts">
	import { enhance } from "$app/forms";
	import { toast } from "svelte-sonner";
	import { Button } from "$lib/components/ui/button/index.js";
	import DynamicIcon from "$lib/components/DynamicIcon.svelte";
	import type { SectionContact } from "$lib/sanity/queries";
	import { resolveLink } from "$lib/utils/index.js";
	import SectionHeader from "./SectionHeader.svelte";

	interface Props {
		section: SectionContact;
	}

	let { section }: Props = $props();

	const bgClass = $derived(section.alternateBackground ? "bg-accent" : "");
	let submitting = $state(false);
</script>

<section id={section.anchor ?? undefined} class="px-20 py-24 {bgClass}">
	<div class="flex flex-col gap-16">
		<SectionHeader number={section.sectionNumber} label={section.sectionLabel} />

		<div class="flex gap-20">
			<!-- Left column: Contact info -->
			<div class="flex flex-1 flex-col gap-8">
				{#if section.title}
					<h2 class="whitespace-pre-line font-serif text-5xl italic leading-[1.1] text-foreground">
						{section.title}
					</h2>
				{/if}
				{#if section.description}
					<p class="text-base leading-[1.7] text-muted-foreground">{section.description}</p>
				{/if}

				{#if section.socialLinks?.length || section.location}
					<div class="flex flex-col gap-4">
						{#if section.socialLinks}
							{#each section.socialLinks as socialLink (socialLink.label)}
								{@const resolved = socialLink.socialLinkType === 'email' && socialLink.emailAddress
									? { href: `mailto:${socialLink.emailAddress}`, external: false }
									: resolveLink(socialLink.link)}
								<a
									href={resolved.href}
									target={resolved.external ? "_blank" : undefined}
									rel={resolved.external ? "noopener noreferrer" : undefined}
									class="flex w-fit items-center gap-3"
								>
									{#if socialLink.icon}
										<DynamicIcon name={socialLink.icon} size={20} class="text-foreground" />
									{/if}
									{#if socialLink.label}
										<span class="text-sm text-muted-foreground">{socialLink.label}</span>
									{/if}
								</a>
							{/each}
						{/if}

						{#if section.location}
							<div class="flex items-center gap-2.5">
								<DynamicIcon name="map-pin" size={16} class="text-muted-foreground" />
								<span class="text-sm text-muted-foreground">{section.location}</span>
							</div>
						{/if}
					</div>
				{/if}
			</div>

			<!-- Right column: Contact form -->
			<div class="flex-1">
				<div class="flex flex-col gap-6 rounded-xl border border-border bg-background p-8">
					<form
						method="POST"
						action="?/contact"
						use:enhance={() => {
							submitting = true;
							return async ({ result, update }) => {
								submitting = false;
								if (result.type === 'success') {
									const data = result.data as Record<string, any> | undefined;
									toast.success(data?.contact?.message ?? 'Message envoyé avec succès !');
									await update({ reset: true });
								} else if (result.type === 'failure') {
									const data = result.data as Record<string, any> | undefined;
									toast.error(data?.contact?.message ?? 'Erreur lors de l\'envoi.');
								} else {
									await update();
								}
							};
						}}
						class="flex flex-col gap-6"
					>
						<div>
							<label for="contact-name" class="mb-2 block text-sm font-medium text-foreground">
								Nom
							</label>
							<input
								id="contact-name"
								type="text"
								name="name"
								required
								placeholder="Votre nom"
								class="w-full rounded-md border border-border bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
							/>
						</div>

						<div>
							<label for="contact-email" class="mb-2 block text-sm font-medium text-foreground">
								Email
							</label>
							<input
								id="contact-email"
								type="email"
								name="email"
								required
								placeholder="Votre email"
								class="w-full rounded-md border border-border bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
							/>
						</div>

						<div>
							<label for="contact-message" class="mb-2 block text-sm font-medium text-foreground">
								Message
							</label>
							<textarea
								id="contact-message"
								name="message"
								required
								placeholder="Votre message"
								class="min-h-35 w-full resize-none rounded-md border border-border bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
							></textarea>
						</div>

						<Button type="submit" disabled={submitting} class="w-full bg-primary hover:bg-primary/90">
							<DynamicIcon name="send" size={16} />
							{submitting ? 'Envoi...' : 'Envoyer'}
						</Button>

					</form>
				</div>
			</div>
		</div>
	</div>
</section>
