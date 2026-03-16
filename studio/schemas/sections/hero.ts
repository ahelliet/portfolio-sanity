import {defineField, defineType, defineArrayMember} from 'sanity'
import {StarIcon} from '@sanity/icons'

export default defineType({
  name: 'section.hero',
  title: 'Hero',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({name: 'badge', title: 'Badge', type: 'string', description: 'Texte du badge de statut (ex: "Disponible en freelance · Remote mondial")'}),
    defineField({name: 'title', title: 'Titre', type: 'string'}),
    defineField({name: 'tagline', title: 'Tagline', type: 'text', rows: 2, description: 'Sous-titre coloré affiché sous le titre (retours à la ligne respectés)'}),
    defineField({name: 'subtitle', title: 'Description', type: 'text', rows: 3}),
    defineField({
      name: 'ctas',
      title: 'Boutons',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'link', title: 'Lien', type: 'link'}),
            defineField({name: 'icon', title: 'Icône', type: 'lucide-icon'}),
            defineField({
              name: 'variant',
              title: 'Style',
              type: 'string',
              options: {
                list: [
                  {title: 'Primary', value: 'default'},
                  {title: 'Outline', value: 'outline'},
                  {title: 'Secondary', value: 'secondary'},
                  {title: 'Ghost', value: 'ghost'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'default',
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'variant'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Hero', subtitle: 'Hero'}
    },
  },
})
