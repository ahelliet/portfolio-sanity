import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'section.image',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'alt', title: 'Texte alternatif', type: 'string'}),
    defineField({
      name: 'fullWidth',
      title: 'Pleine largeur',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'alt', media: 'image'},
    prepare({title, media}) {
      return {title: title || 'Image', subtitle: 'Image', media}
    },
  },
})
