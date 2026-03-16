import {defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre SEO',
      description: 'Remplace le titre de la page si renseigné',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(160).warning('Idéalement moins de 160 caractères'),
    }),
    defineField({
      name: 'image',
      title: 'Image OG',
      description: 'Image pour les réseaux sociaux (1200x630 recommandé)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'noIndex',
      title: 'Masquer des moteurs de recherche',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
