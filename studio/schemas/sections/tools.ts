import {defineField, defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'section.tools',
  title: 'Outils & Technologies',
  type: 'object',
  fields: [
    defineField({name: 'sectionNumber', title: 'Numéro', type: 'string'}),
    defineField({name: 'sectionLabel', title: 'Label', type: 'string'}),
    defineField({name: 'title', title: 'Titre', type: 'string'}),
    defineField({name: 'anchor', title: 'Ancre', type: 'string', description: 'ID pour le lien d\'ancrage (ex: outils)'}),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Nom de la catégorie', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
            defineField({
              name: 'items',
              title: 'Outils',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({name: 'name', title: 'Nom', type: 'string', validation: (r) => r.required()}),
                    defineField({name: 'icon', title: 'Icône Lucide', type: 'string', description: 'Nom de l\'icône Lucide (ex: code, server, rocket)'}),
                  ],
                  preview: {
                    select: {title: 'name', subtitle: 'icon'},
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {title: 'name'},
          },
        }),
      ],
    }),
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
      return {title: title || 'Outils', subtitle: 'Outils & Technologies'}
    },
  },
})
