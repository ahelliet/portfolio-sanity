import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export default defineType({
  name: 'link',
  title: 'Lien',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkType',
      title: 'Type de lien',
      type: 'string',
      options: {
        list: [
          {title: 'Interne', value: 'internal'},
          {title: 'Externe', value: 'external'},
          {title: 'Média / Fichier', value: 'media'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internalLink',
      title: 'Page',
      type: 'reference',
      to: [{type: 'homePage'}, {type: 'page'}, {type: 'post'}, {type: 'project'}],
      hidden: ({parent}) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'anchor',
      title: 'Ancre',
      type: 'string',
      description: 'Saisir uniquement le nom, sans # ni / (ex: a-propos, contact)',
      hidden: ({parent}) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'URL externe',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Ouvrir dans un nouvel onglet',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.linkType === 'internal',
    }),
    defineField({
      name: 'mediaLink',
      title: 'Média',
      type: 'file',
      description: 'Sélectionner un média existant ou en télécharger un nouveau',
      hidden: ({parent}) => parent?.linkType !== 'media',
    }),
    defineField({
      name: 'downloadFilename',
      title: 'Nom du fichier au téléchargement',
      type: 'string',
      description: 'Laisser vide pour utiliser le nom original du fichier',
      hidden: ({parent}) => parent?.linkType !== 'media',
    }),
  ],
})
