import {defineField, defineType, defineArrayMember} from 'sanity'
import {CommentIcon} from '@sanity/icons'

export default defineType({
  name: 'section.testimonials',
  title: 'Témoignages',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({name: 'sectionNumber', title: 'Numéro', type: 'string'}),
    defineField({name: 'sectionLabel', title: 'Label', type: 'string'}),
    defineField({name: 'title', title: 'Titre', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Témoignages',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Nom', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'role', title: 'Rôle', type: 'string'}),
            defineField({name: 'content', title: 'Contenu', type: 'text', rows: 4, validation: (r) => r.required()}),
            defineField({name: 'avatar', title: 'Avatar', type: 'image', options: {hotspot: true}}),
          ],
          preview: {
            select: {title: 'name', subtitle: 'role', media: 'avatar'},
          },
        }),
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
      return {title: title || 'Témoignages', subtitle: 'Témoignages'}
    },
  },
})
