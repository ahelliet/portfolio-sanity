import {fail} from '@sveltejs/kit'
import type {RequestEvent} from '@sveltejs/kit'

export async function handleContactForm({request}: RequestEvent) {
  const data = await request.formData()
  const name = data.get('name')?.toString().trim()
  const email = data.get('email')?.toString().trim()
  const message = data.get('message')?.toString().trim()

  if (!name || !email || !message) {
    return fail(400, {contact: {success: false, message: 'Tous les champs sont requis.'}})
  }

  // TODO: intégrer l'envoi (email, webhook, API externe, etc.)
  // TODO: ajouter un rate limiting / throttling (ex: max 3 soumissions par IP par minute)
  // TODO: ajouter une protection anti-spam bot (ex: honeypot field, reCAPTCHA, Turnstile)
  // TODO: valider le format de l'email côté serveur (regex ou librairie comme zod)
  // TODO: sanitiser les entrées pour éviter les injections (HTML, headers email)
  // TODO: limiter la longueur des champs (name, message) pour éviter les payloads abusifs
  // TODO: vérifier l'en-tête Origin/Referer pour prévenir les soumissions CSRF cross-site
  console.log('[Contact]', {name, email, message})

  return {contact: {success: true, message: 'Message envoyé avec succès !'}}
}
