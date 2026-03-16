import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'section.richText',
  title: 'Texte riche',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'sectionNumber', title: 'Numéro', type: 'string', description: 'Ex: 01, 02...'}),
    defineField({name: 'sectionLabel', title: 'Label', type: 'string', description: 'Ex: À propos, Le défi...'}),
    defineField({name: 'title', title: 'Titre', type: 'string'}),
    defineField({name: 'body', title: 'Contenu', type: 'blockContent'}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'imagePosition',
      title: 'Position de l\'image',
      type: 'string',
      options: {list: ['left', 'right'], layout: 'radio', direction: 'horizontal'},
      initialValue: 'left',
      hidden: ({parent}) => !parent?.image,
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
        title: title || label || 'Texte riche',
        subtitle: num ? `${num} — Texte riche` : 'Texte riche',
      }
    },
  },
})
