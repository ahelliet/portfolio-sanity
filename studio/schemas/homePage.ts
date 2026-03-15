import {defineField, defineType, defineArrayMember} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Page d\'accueil',
  type: 'document',
  fields: [
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
    prepare() {
      return {title: 'Page d\'accueil'}
    },
  },
})
