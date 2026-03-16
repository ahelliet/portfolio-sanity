import {defineField, defineType, defineArrayMember} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export default defineType({
  name: 'homePage',
  title: 'Page d\'accueil',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'content', title: 'Contenu', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({type: 'section.hero'}),
        defineArrayMember({type: 'section.pageHeader'}),
        defineArrayMember({type: 'section.richText'}),
        defineArrayMember({type: 'section.grid'}),
        defineArrayMember({type: 'section.cta'}),
        defineArrayMember({type: 'section.metrics'}),
        defineArrayMember({type: 'section.image'}),
        defineArrayMember({type: 'section.contact'}),
        defineArrayMember({type: 'section.testimonials'}),
        defineArrayMember({type: 'section.tools'}),
        defineArrayMember({type: 'section.about'}),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Page d\'accueil'}
    },
  },
})
