import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'section.grid',
  title: 'Grille',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionNumber',
      title: 'Numéro',
      type: 'string',
      hidden: ({parent}) => parent?.layout === 'grid',
    }),
    defineField({
      name: 'sectionLabel',
      title: 'Label',
      type: 'string',
      hidden: ({parent}) => parent?.layout === 'grid',
    }),
    defineField({name: 'title', title: 'Titre', type: 'string'}),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'layout',
      title: 'Disposition',
      type: 'string',
      options: {
        list: [
          {title: 'Mise en avant (homepage)', value: 'featured'},
          {title: 'Grille de cards', value: 'grid'},
        ],
        layout: 'radio',
      },
      initialValue: 'featured',
    }),
    defineField({
      name: 'showTagFilter',
      title: 'Afficher le filtre par tags',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.layout !== 'grid',
    }),
    defineField({
      name: 'source',
      title: 'Source des données',
      type: 'string',
      options: {
        list: [
          {title: 'Articles (posts)', value: 'posts'},
          {title: 'Projets', value: 'projects'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'limit',
      title: 'Nombre d\'éléments',
      type: 'number',
      description: 'Laisser vide pour tout afficher',
      hidden: ({parent}) => parent?.layout === 'grid',
    }),
    defineField({
      name: 'viewAllLabel',
      title: 'Lien "Voir tout" — Libellé',
      type: 'string',
      description: 'Ex: Voir tous les projets →',
      hidden: ({parent}) => parent?.layout === 'grid',
    }),
    defineField({
      name: 'viewAllLink',
      title: 'Lien "Voir tout" — Destination',
      type: 'link',
      hidden: ({parent}) => parent?.layout === 'grid' || !parent?.viewAllLabel,
    }),
    defineField({
      name: 'alternateBackground',
      title: 'Fond alterné',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'title', source: 'source'},
    prepare({title, source}) {
      return {
        title: title || 'Grille',
        subtitle: `Grille — ${source || 'non configuré'}`,
      }
    },
  },
})
