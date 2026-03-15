import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'section.cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titre', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
    defineField({
      name: 'button',
      title: 'Bouton',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Label', type: 'string'}),
        defineField({name: 'link', title: 'Lien', type: 'link'}),
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
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'CTA', subtitle: 'Call to Action'}
    },
  },
})
