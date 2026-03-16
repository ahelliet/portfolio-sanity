import {defineField, defineType, defineArrayMember} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export default defineType({
  name: 'section.contact',
  title: 'Contact',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({name: 'sectionNumber', title: 'Numéro', type: 'string'}),
    defineField({name: 'sectionLabel', title: 'Label', type: 'string'}),
    defineField({name: 'title', title: 'Titre', type: 'string'}),
    defineField({name: 'anchor', title: 'Ancre', type: 'string', description: 'ID pour le lien d\'ancrage (ex: contact)'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
    defineField({name: 'email', title: 'Email', type: 'string', validation: (r) => r.email()}),
    defineField({
      name: 'socialLinks',
      title: 'Liens sociaux',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'icon', title: 'Icône Lucide', type: 'string', description: 'Ex: github, linkedin, mail, map-pin'}),
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({
              name: 'socialLinkType',
              title: 'Type de lien',
              type: 'string',
              options: {
                list: [
                  {title: 'Lien (interne/externe)', value: 'link'},
                  {title: 'Email (mailto)', value: 'email'},
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'link',
            }),
            defineField({
              name: 'link',
              title: 'Lien',
              type: 'link',
              hidden: ({parent}) => parent?.socialLinkType === 'email',
            }),
            defineField({
              name: 'emailAddress',
              title: 'Adresse email',
              type: 'string',
              hidden: ({parent}) => parent?.socialLinkType !== 'email',
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'icon'},
          },
        }),
      ],
    }),
    defineField({name: 'location', title: 'Localisation', type: 'string', description: 'Ex: Gex, France · Remote-first · UTC+1'}),
defineField({
      name: 'alternateBackground',
      title: 'Fond alterné',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Contact', subtitle: 'Contact'}
    },
  },
})
