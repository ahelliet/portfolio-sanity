import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'section.about',
  title: 'À propos',
  type: 'object',
  fields: [
    defineField({name: 'sectionNumber', title: 'Numéro', type: 'string', description: 'Ex: 01, 02...'}),
    defineField({name: 'sectionLabel', title: 'Label', type: 'string', description: 'Ex: À propos'}),
    defineField({name: 'title', title: 'Titre', type: 'string'}),
    defineField({name: 'anchor', title: 'Ancre', type: 'string', description: 'ID pour le lien d\'ancrage (ex: a-propos)'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 6}),
    defineField({name: 'image', title: 'Photo', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'stats',
      title: 'Statistiques',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'value', title: 'Valeur', type: 'string'}),
            defineField({name: 'label', title: 'Label', type: 'string'}),
          ],
          preview: {
            select: {title: 'value', subtitle: 'label'},
          },
        },
      ],
    }),
    defineField({
      name: 'alternateBackground',
      title: 'Fond alterné',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'title', label: 'sectionLabel', num: 'sectionNumber'},
    prepare({title, label, num}) {
      return {
        title: title || label || 'À propos',
        subtitle: num ? `${num} — À propos` : 'À propos',
      }
    },
  },
})
