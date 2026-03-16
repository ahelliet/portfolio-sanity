import {defineField, defineType, defineArrayMember} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
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
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
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
    select: {title: 'title', slug: 'slug.current'},
    prepare({title, slug}) {
      return {
        title: title || 'Page',
        subtitle: `/${slug || ''}`,
      }
    },
  },
})
