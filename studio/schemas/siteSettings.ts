import {defineField, defineType, defineArrayMember} from 'sanity'
import {ButtonStyleInput} from '../components/ButtonStyleInput'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'global', title: 'Global', default: true},
    {name: 'navigation', title: 'Navigation'},
    {name: 'social', title: 'Réseaux sociaux'},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    // ─── Global ───
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'global',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      group: 'global',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      description: 'Image par défaut pour les réseaux sociaux',
      group: 'global',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'global',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      initialValue: 'fr',
      group: 'global',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'global',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'social',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'platform', title: 'Platform', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
          preview: {
            select: {title: 'platform', subtitle: 'url'},
          },
        }),
      ],
    }),

    // ─── Navigation ───
    defineField({
      name: 'navLinks',
      title: 'Links',
      type: 'array',
      group: 'navigation',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({
              name: 'linkType',
              title: 'Type de lien',
              type: 'string',
              options: {
                list: [
                  {title: 'Interne', value: 'internal'},
                  {title: 'Ancre (#)', value: 'anchor'},
                  {title: 'Externe', value: 'external'},
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
              to: [{type: 'post'}, {type: 'project'}],
              hidden: ({parent}) => parent?.linkType !== 'internal',
            }),
            defineField({
              name: 'anchor',
              title: 'Ancre',
              type: 'string',
              description: 'Ex: #about, #contact',
              hidden: ({parent}) => parent?.linkType !== 'anchor',
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
              hidden: ({parent}) => parent?.linkType !== 'external',
            }),
            defineField({
              name: 'rightSide',
              title: 'Afficher à droite',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'style',
              title: 'Style',
              type: 'string',
              components: {input: ButtonStyleInput},
              initialValue: 'link',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              linkType: 'linkType',
              anchor: 'anchor',
              externalUrl: 'externalUrl',
              internalTitle: 'internalLink.title',
              rightSide: 'rightSide',
              style: 'style',
            },
            prepare({title, linkType, anchor, externalUrl, internalTitle, rightSide, style}) {
              const pos = rightSide ? 'Droite' : 'Gauche'
              const s = style && style !== 'link' ? ` (${style})` : ''
              const target =
                linkType === 'anchor' ? anchor :
                linkType === 'external' ? externalUrl :
                internalTitle || 'Page'
              return {title: `${title}${s}`, subtitle: `${pos} — ${linkType} → ${target || ''}`}
            },
          },
        }),
      ],
    }),

    // ─── Footer ───
    defineField({
      name: 'footerCopyright',
      title: 'Copyright Text',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerLinks',
      title: 'Links',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'href', title: 'URL', type: 'string'}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'href'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
